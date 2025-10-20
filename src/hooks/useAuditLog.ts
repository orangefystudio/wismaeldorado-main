import { supabase } from '@/integrations/supabase/client';

interface AuditLogData {
  user_id: string;
  user_name: string;
  action: string;
  table_name: string;
  record_id: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
}

export const useAuditLog = () => {
  const logAction = async (data: AuditLogData) => {
    try {
      // Get client IP and user agent
      const ip_address = await getClientIP();
      const user_agent = navigator.userAgent;
      const session_id = generateSessionId();

      const auditData = {
        ...data,
        ip_address,
        user_agent,
        session_id,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('audit_logs')
        .insert([auditData]);

      if (error) {
        console.error('Error logging audit action:', error);
      }
    } catch (error) {
      console.error('Error in audit logging:', error);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return 'unknown';
    }
  };

  const generateSessionId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return {
    logAction,
    getClientIP,
    generateSessionId
  };
};
