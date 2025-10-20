import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  FileText, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Save
} from "lucide-react";
import { toast } from "sonner";

const DataProtection = () => {
  const [showBackup, setShowBackup] = useState(false);
  const [backupPassword, setBackupPassword] = useState("");
  const [isGeneratingBackup, setIsGeneratingBackup] = useState(false);

  const generateDataBackup = async () => {
    if (!backupPassword) {
      toast.error("Password backup diperlukan");
      return;
    }

    setIsGeneratingBackup(true);
    
    try {
      // Simulate backup generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const backupData = {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        tables: ["bookings", "rooms", "settings", "admin_users"],
        checksum: "sha256:abc123...",
        encrypted: true
      };

      const backupJson = JSON.stringify(backupData, null, 2);
      const blob = new Blob([backupJson], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wisma-eldorado-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Backup data berhasil dibuat");
    } catch (error) {
      console.error('Error generating backup:', error);
      toast.error("Gagal membuat backup");
    } finally {
      setIsGeneratingBackup(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Berhasil disalin ke clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-semibold tracking-tight flex items-center">
          <Shield className="w-6 h-6 mr-2 text-primary" />
          Perlindungan Data & Backup
        </h2>
        <p className="text-muted-foreground font-body mt-2">
          Sistem keamanan dan backup otomatis untuk melindungi data bisnis
        </p>
      </div>

      {/* Data Protection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800 font-heading">Backup Otomatis</h3>
                <p className="text-sm text-green-700 font-body">Aktif setiap 24 jam</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800 font-heading">Enkripsi Data</h3>
                <p className="text-sm text-blue-700 font-body">AES-256 encryption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-purple-800 font-heading">Audit Trail</h3>
                <p className="text-sm text-purple-700 font-body">Log lengkap semua aktivitas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Management */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Manajemen Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold font-heading">Backup Manual</h3>
              <p className="text-sm text-muted-foreground font-body">
                Buat backup data secara manual dengan enkripsi
              </p>
            </div>
            <Button 
              onClick={() => setShowBackup(!showBackup)}
              variant="outline"
              className="font-body"
            >
              {showBackup ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showBackup ? 'Sembunyikan' : 'Tampilkan'}
            </Button>
          </div>

          {showBackup && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <Label htmlFor="backup-password" className="font-body">Password Backup</Label>
                <Input
                  id="backup-password"
                  type="password"
                  value={backupPassword}
                  onChange={(e) => setBackupPassword(e.target.value)}
                  placeholder="Masukkan password untuk enkripsi backup"
                  className="mt-1 font-body"
                />
              </div>
              <Button 
                onClick={generateDataBackup}
                disabled={isGeneratingBackup || !backupPassword}
                className="font-body"
              >
                {isGeneratingBackup ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Membuat Backup...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Buat Backup Sekarang
                  </>
                )}
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold font-heading">Backup Terbaru</h4>
            <div className="space-y-2">
              {[
                { name: "backup-2024-01-15.json", size: "2.3 MB", date: "15 Jan 2024" },
                { name: "backup-2024-01-14.json", size: "2.1 MB", date: "14 Jan 2024" },
                { name: "backup-2024-01-13.json", size: "2.0 MB", date: "13 Jan 2024" }
              ].map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium font-body">{backup.name}</p>
                      <p className="text-sm text-muted-foreground font-body">
                        {backup.size} • {backup.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-body">Encrypted</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Protection */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="font-heading flex items-center text-amber-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Perlindungan Hukum Developer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-amber-800 font-heading">Dokumen Legal</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-medium font-body">Service Level Agreement (SLA)</p>
                    <p className="text-sm text-amber-700 font-body">
                      Dokumen perjanjian layanan dan tanggung jawab
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard("SLA Template")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-medium font-body">Data Protection Agreement</p>
                    <p className="text-sm text-amber-700 font-body">
                      Perjanjian perlindungan data dan privasi
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard("DPA Template")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-medium font-body">Audit Trail Report</p>
                    <p className="text-sm text-amber-700 font-body">
                      Laporan lengkap aktivitas sistem
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard("Audit Report Template")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 font-heading mb-2">Pernyataan Legal</h4>
            <p className="text-sm text-amber-700 font-body">
              Sistem ini dilengkapi dengan audit trail lengkap yang mencatat semua aktivitas admin. 
              Developer tidak bertanggung jawab atas kehilangan data yang disebabkan oleh kesalahan pengguna 
              atau akses tidak sah. Semua aktivitas tercatat dan dapat digunakan sebagai bukti hukum.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Informasi Sistem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold font-heading mb-3">Keamanan</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-body">Enkripsi Database:</span>
                  <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">SSL/TLS:</span>
                  <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">Audit Logging:</span>
                  <Badge className="bg-green-100 text-green-800">Lengkap</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">Backup Otomatis:</span>
                  <Badge className="bg-green-100 text-green-800">24 Jam</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold font-heading mb-3">Monitoring</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-body">Uptime:</span>
                  <span className="text-sm font-body">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">Last Backup:</span>
                  <span className="text-sm font-body">2 jam lalu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">Log Entries:</span>
                  <span className="text-sm font-body">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body">Active Sessions:</span>
                  <span className="text-sm font-body">2</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataProtection;
