import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  Eye, 
  Download, 
  Search,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuditLogEntry {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  action: string;
  table_name: string;
  record_id: string;
  old_values: any;
  new_values: any;
  ip_address: string;
  user_agent: string;
  session_id: string;
}

const AuditLog = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("7");

  useEffect(() => {
    fetchAuditLogs();
  }, [actionFilter, dateFilter]);

  const fetchAuditLogs = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateFilter));

      let query = supabase
        .from('audit_logs')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Gagal memuat log audit');
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    const actionConfig = {
      CREATE: { label: 'Buat', className: 'bg-green-100 text-green-800' },
      UPDATE: { label: 'Ubah', className: 'bg-blue-100 text-blue-800' },
      DELETE: { label: 'Hapus', className: 'bg-red-100 text-red-800' },
      LOGIN: { label: 'Login', className: 'bg-purple-100 text-purple-800' },
      LOGOUT: { label: 'Logout', className: 'bg-gray-100 text-gray-800' },
      VIEW: { label: 'Lihat', className: 'bg-yellow-100 text-yellow-800' },
    };

    const config = actionConfig[action as keyof typeof actionConfig] || actionConfig.VIEW;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const exportAuditLogs = async () => {
    try {
      const csvContent = [
        ['Tanggal', 'User', 'Aksi', 'Tabel', 'Record ID', 'IP Address', 'User Agent'].join(','),
        ...auditLogs.map(log => [
          new Date(log.created_at).toLocaleString('id-ID'),
          log.user_name,
          log.action,
          log.table_name,
          log.record_id,
          log.ip_address,
          `"${log.user_agent}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Log audit berhasil diekspor');
    } catch (error) {
      console.error('Error exporting audit logs:', error);
      toast.error('Gagal mengekspor log audit');
    }
  };

  const filteredLogs = auditLogs.filter(log =>
    log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.table_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-semibold tracking-tight flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Log Audit & Keamanan
          </h2>
          <p className="text-muted-foreground font-body">Catatan lengkap semua aktivitas admin</p>
        </div>
        <Button onClick={exportAuditLogs} className="font-body">
          <Download className="w-4 h-4 mr-2" />
          Ekspor Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari berdasarkan user, aksi, atau tabel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-body"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Semua Aksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aksi</SelectItem>
                  <SelectItem value="CREATE">Buat Data</SelectItem>
                  <SelectItem value="UPDATE">Ubah Data</SelectItem>
                  <SelectItem value="DELETE">Hapus Data</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGOUT">Logout</SelectItem>
                  <SelectItem value="VIEW">Lihat Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-32">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hari</SelectItem>
                  <SelectItem value="7">7 Hari</SelectItem>
                  <SelectItem value="30">30 Hari</SelectItem>
                  <SelectItem value="90">90 Hari</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Log Aktivitas ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium font-body">Tanggal</th>
                  <th className="text-left p-3 font-medium font-body">User</th>
                  <th className="text-left p-3 font-medium font-body">Aksi</th>
                  <th className="text-left p-3 font-medium font-body">Tabel</th>
                  <th className="text-left p-3 font-medium font-body">IP Address</th>
                  <th className="text-left p-3 font-medium font-body">Detail</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="text-sm font-body">
                        <p>{new Date(log.created_at).toLocaleDateString('id-ID')}</p>
                        <p className="text-muted-foreground">
                          {new Date(log.created_at).toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium font-body">{log.user_name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-sm">{log.table_name}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-mono">{log.ip_address}</span>
                    </td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Show detailed log information
                          console.log('Log details:', log);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-800 font-heading mb-2">
                Pemberitahuan Keamanan
              </h3>
              <p className="text-sm text-amber-700 font-body">
                Semua aktivitas admin dicatat secara otomatis untuk keamanan dan audit. 
                Log ini tidak dapat dihapus dan akan digunakan sebagai bukti hukum jika diperlukan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;
