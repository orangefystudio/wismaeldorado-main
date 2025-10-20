import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}

interface AdminAuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const demoModeEnabled = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.PROD;
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL || 'demo@wismaeldorado.com';
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || 'demo123';

  useEffect(() => {
    if (demoModeEnabled) {
      // Restore demo session from localStorage if exists
      const stored = localStorage.getItem('demo_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed.user as User);
          setAdminUser(parsed.adminUser as AdminUser);
        } catch {
          localStorage.removeItem('demo_admin_session');
        }
      }
      setLoading(false);
      return;
    }

    // Get initial session (Supabase)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes (Supabase)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchAdminUser(session.user.id);
      } else {
        setAdminUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminUser = async (userId: string) => {
    if (demoModeEnabled) {
      // In demo mode, admin user is mocked
      const mockAdmin: AdminUser = {
        id: 'demo-admin-id',
        email: demoEmail,
        name: 'Demo Admin',
        role: 'admin',
      };
      setAdminUser(mockAdmin);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
        .single();

      if (error) {
        // Attempt auto-seed for demo if enabled and record not found
        console.error('Error fetching admin user:', error);
        const enableDemoAutoSeed = import.meta.env.VITE_ENABLE_DEMO_ADMIN_AUTOSEED === 'true';
        if (enableDemoAutoSeed) {
          try {
            const { data: currentUser } = await supabase.auth.getUser();
            const current = currentUser?.user;
            if (current && current.id === userId) {
              const email = current.email ?? 'demo@wismaeldorado.com';
              const nameFromEmail = email.split('@')[0] || 'Demo Admin';
              // Upsert admin user with the same auth.uid()
              const { error: upsertError } = await supabase
                .from('admin_users')
                .upsert({
                  id: current.id,
                  email,
                  name: nameFromEmail,
                  role: 'admin',
                  is_active: true,
                });
              if (!upsertError) {
                const { data: seeded } = await supabase
                  .from('admin_users')
                  .select('*')
                  .eq('id', userId)
                  .eq('is_active', true)
                  .single();
                setAdminUser(seeded ?? null);
                return;
              }
            }
          } catch (seedError) {
            console.error('Error auto-seeding admin user:', seedError);
          }
        }
        setAdminUser(null);
      } else {
        setAdminUser(data);
      }
    } catch (error) {
      console.error('Error fetching admin user:', error);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Demo mode enabled:', demoModeEnabled);
    console.log('Demo email:', demoEmail);
    console.log('Demo password:', demoPassword);
    console.log('Input email:', email);
    console.log('Input password:', password);
    console.log('VITE_DEMO_EMAIL env:', import.meta.env.VITE_DEMO_EMAIL);
    console.log('VITE_DEMO_PASSWORD env:', import.meta.env.VITE_DEMO_PASSWORD);
    
    if (demoModeEnabled) {
      // Simple demo credential check (can be any non-empty, or match env if provided)
      const valid = (import.meta.env.VITE_DEMO_EMAIL && import.meta.env.VITE_DEMO_PASSWORD)
        ? (email === demoEmail && password === demoPassword)
        : (Boolean(email) && Boolean(password));
      console.log('Validation result:', valid);
      if (!valid) {
        return { error: new Error('Invalid demo credentials') };
      }
      const mockUser = {
        id: 'demo-admin-id',
        email,
      } as unknown as User;
      const mockAdmin: AdminUser = {
        id: 'demo-admin-id',
        email,
        name: 'Demo Admin',
        role: 'admin',
      };
      setUser(mockUser);
      setAdminUser(mockAdmin);
      localStorage.setItem('demo_admin_session', JSON.stringify({ user: mockUser, adminUser: mockAdmin }));
      return { error: null } as { error: any };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (demoModeEnabled) {
      localStorage.removeItem('demo_admin_session');
      setUser(null);
      setAdminUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const value = {
    user,
    adminUser,
    loading,
    signIn,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
