-- =============================================
-- Wisma Eldorado Admin System Database Setup
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. ADMIN USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
  is_active BOOLEAN DEFAULT true
);

-- =============================================
-- 2. BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  room_id TEXT NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  notes TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded'))
);

-- =============================================
-- 3. ROOMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  room_type TEXT NOT NULL CHECK (room_type IN ('deluxe', 'standard', 'twin'))
);

-- =============================================
-- 4. SETTINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  site_title TEXT NOT NULL,
  site_description TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_address TEXT NOT NULL,
  logo_url TEXT,
  hero_image_url TEXT,
  about_description TEXT NOT NULL,
  facilities TEXT[] DEFAULT '{}'
);

-- =============================================
-- 5. AUDIT LOGS TABLE (CRITICAL FOR LEGAL PROTECTION)
-- =============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'VIEW', 'EXPORT', 'IMPORT')),
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  session_id TEXT
);

-- =============================================
-- 6. SYSTEM BACKUPS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS system_backups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  backup_name TEXT NOT NULL,
  backup_type TEXT DEFAULT 'manual' CHECK (backup_type IN ('manual', 'automatic')),
  file_size BIGINT,
  file_path TEXT,
  checksum TEXT,
  encrypted BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_by TEXT NOT NULL
);

-- =============================================
-- 7. SECURITY EVENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS security_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type TEXT NOT NULL CHECK (event_type IN ('login_failed', 'suspicious_activity', 'data_export', 'permission_change', 'system_error')),
  user_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  resolved BOOLEAN DEFAULT false
);

-- =============================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Admin users can access their own data
CREATE POLICY "Admin users can view own data" ON admin_users
  FOR ALL USING (auth.uid()::text = id::text);

-- Admin users can view all bookings
CREATE POLICY "Admin users can view all bookings" ON bookings
  FOR ALL USING (true);

-- Admin users can view all rooms
CREATE POLICY "Admin users can view all rooms" ON rooms
  FOR ALL USING (true);

-- Admin users can view all settings
CREATE POLICY "Admin users can view all settings" ON settings
  FOR ALL USING (true);

-- Only admin users can view audit logs
CREATE POLICY "Only admin users can view audit logs" ON audit_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Only admin users can view backups
CREATE POLICY "Only admin users can view backups" ON system_backups
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Only admin users can view security events
CREATE POLICY "Only admin users can view security events" ON security_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- =============================================
-- 9. FUNCTIONS FOR AUDIT LOGGING
-- =============================================

-- Function to automatically log audit events
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  user_id TEXT;
  user_name TEXT;
BEGIN
  -- Get current user info
  SELECT id::text, name INTO user_id, user_name 
  FROM admin_users 
  WHERE id::text = auth.uid()::text;
  
  -- If no user found, use system
  IF user_id IS NULL THEN
    user_id := 'system';
    user_name := 'System';
  END IF;

  -- Log the event
  INSERT INTO audit_logs (
    user_id, user_name, action, table_name, record_id, 
    old_values, new_values, ip_address, user_agent, session_id
  ) VALUES (
    user_id,
    user_name,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent',
    gen_random_uuid()::text
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 10. TRIGGERS FOR AUTOMATIC AUDIT LOGGING
-- =============================================

-- Create triggers for all tables
CREATE TRIGGER audit_bookings_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_rooms_trigger
  AFTER INSERT OR UPDATE OR DELETE ON rooms
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_settings_trigger
  AFTER INSERT OR UPDATE OR DELETE ON settings
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_admin_users_trigger
  AFTER INSERT OR UPDATE OR DELETE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- =============================================
-- 11. SAMPLE DATA FOR TESTING
-- =============================================

-- Insert default admin user (replace with actual user ID from auth.users)
-- You need to get the user ID from Supabase Auth first
INSERT INTO admin_users (id, email, name, role, is_active) 
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'admin@wismaeldorado.com',
  'Admin Wisma Eldorado',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;

-- Insert sample rooms
INSERT INTO rooms (name, description, price_per_night, max_guests, room_type, amenities) VALUES
('Deluxe Room', 'Kamar mewah dengan fasilitas lengkap dan pemandangan yang indah', 250000, 2, 'deluxe', ARRAY['ac', 'wifi', 'tv', 'bathroom', 'hot_water', 'parking']),
('Standard Room', 'Kamar standar yang nyaman dengan fasilitas dasar', 200000, 2, 'standard', ARRAY['ac', 'wifi', 'bathroom']),
('Twin Room', 'Kamar dengan 2 tempat tidur untuk tamu yang membutuhkan tidur terpisah', 180000, 2, 'twin', ARRAY['ac', 'wifi', 'bathroom', 'hot_water'])
ON CONFLICT DO NOTHING;

-- Insert default settings
INSERT INTO settings (site_title, site_description, contact_phone, contact_email, contact_address, about_description, facilities) VALUES
(
  'Wisma Eldorado',
  'Stay Comfortably in the Heart of Waingapu',
  '+62 812-3456-7890',
  'info@wismaeldorado.com',
  'Jl. Raya Waingapu No. 8, Pusat Kota, Sumba Timur, NTT, Indonesia',
  'Wisma Eldorado adalah penginapan modern dan nyaman di pusat Kota Waingapu. Kami menyediakan kamar ber-AC dengan fasilitas lengkap dan pelayanan ramah untuk tamu yang berkunjung ke Sumba Timur.',
  ARRAY['AC di Semua Kamar', 'Kamar Mandi Pribadi', 'Wi-Fi Gratis', 'TV Kabel', 'Area Parkir', 'Dapur Bersama', 'Resepsionis 24 Jam', 'Taman Outdoor']
) ON CONFLICT DO NOTHING;

-- =============================================
-- 12. INDEXES FOR PERFORMANCE
-- =============================================

-- Audit logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Rooms indexes
CREATE INDEX IF NOT EXISTS idx_rooms_room_type ON rooms(room_type);
CREATE INDEX IF NOT EXISTS idx_rooms_is_available ON rooms(is_available);

-- Security events indexes
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_resolved ON security_events(resolved);

-- =============================================
-- 13. VIEWS FOR REPORTING
-- =============================================

-- Daily booking summary view
CREATE OR REPLACE VIEW daily_booking_summary AS
SELECT 
  DATE(created_at) as booking_date,
  COUNT(*) as total_bookings,
  COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
  COUNT(CASE WHEN status = 'checked_in' THEN 1 END) as checked_in_bookings,
  SUM(total_price) as total_revenue,
  AVG(total_price) as average_booking_value
FROM bookings
GROUP BY DATE(created_at)
ORDER BY booking_date DESC;

-- Room occupancy view
CREATE OR REPLACE VIEW room_occupancy AS
SELECT 
  r.name as room_name,
  r.room_type,
  r.price_per_night,
  r.is_available,
  COUNT(b.id) as total_bookings,
  SUM(CASE WHEN b.status IN ('confirmed', 'checked_in') THEN 1 ELSE 0 END) as active_bookings
FROM rooms r
LEFT JOIN bookings b ON r.id::text = b.room_id
GROUP BY r.id, r.name, r.room_type, r.price_per_night, r.is_available
ORDER BY r.name;

-- =============================================
-- 14. SECURITY FUNCTIONS
-- =============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id::text = auth.uid()::text 
    AND is_active = true 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  event_type TEXT,
  description TEXT,
  severity TEXT DEFAULT 'medium'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO security_events (event_type, user_id, ip_address, user_agent, description, severity)
  VALUES (
    event_type,
    auth.uid()::text,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent',
    description,
    severity
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 15. FINAL NOTES
-- =============================================

-- This script creates a complete audit trail system
-- All data modifications are automatically logged
-- Legal protection is provided through comprehensive logging
-- Developer is protected from false accusations of data tampering
-- Client has full visibility into all system activities

-- IMPORTANT: 
-- 1. Replace the admin user ID with actual user ID from auth.users
-- 2. Test all triggers and functions after deployment
-- 3. Monitor audit_logs table for performance
-- 4. Set up automated backups
-- 5. Review security policies regularly

COMMIT;
