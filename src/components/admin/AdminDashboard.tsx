import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Calendar, 
  Bed, 
  Settings, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import { WismaLogo } from "@/components/ui/wisma-logo";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import BookingManagement from "./BookingManagement";
import RoomManagement from "./RoomManagement";
import SettingsManagement from "./SettingsManagement";
import FinancialReports from "./FinancialReports";
import AuditLog from "./AuditLog";
import DataProtection from "./DataProtection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, adminUser, signOut } = useAdminAuth();

  if (!user || !adminUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logout berhasil");
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Pemesanan", icon: Calendar },
    { id: "rooms", label: "Kamar", icon: Bed },
    { id: "reports", label: "Laporan", icon: BarChart3 },
    { id: "audit", label: "Audit Log", icon: Shield },
    { id: "protection", label: "Keamanan", icon: Shield },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "bookings":
        return <BookingManagement />;
      case "rooms":
        return <RoomManagement />;
      case "reports":
        return <FinancialReports />;
      case "audit":
        return <AuditLog />;
      case "protection":
        return <DataProtection />;
      case "settings":
        return <SettingsManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-card shadow-elegant transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center space-x-3">
            <WismaLogo size={40} className="flex-shrink-0 drop-shadow-md" />
            <div>
              <span className="font-heading font-bold text-lg tracking-tight block text-primary">Wisma Eldorado</span>
              <span className="font-body text-xs text-muted-foreground">Admin Portal</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-primary/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start font-body text-sm transition-all duration-200 ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5 hover:translate-x-1"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-gradient-to-t from-card to-transparent">
          <div className="p-4 bg-secondary/40 rounded-xl mb-3 border border-border/30">
            <p className="text-sm font-semibold font-heading text-foreground">{adminUser.name}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{adminUser.email}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium capitalize">
              {adminUser.role}
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full font-body border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden hover:bg-primary/10"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </Button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight text-primary">
                    {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
                  </h1>
                  <p className="text-sm text-muted-foreground font-body mt-0.5">
                    {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const stats = [
    { title: "Total Pemesanan", value: "24", icon: Calendar, change: "+12%", changeType: "positive", color: "primary" },
    { title: "Kamar Tersedia", value: "4/6", icon: Bed, change: "2 kosong", changeType: "neutral", color: "accent" },
    { title: "Pendapatan Bulan Ini", value: "Rp 6.2M", icon: DollarSign, change: "+8%", changeType: "positive", color: "primary" },
    { title: "Tamu Check-in Hari Ini", value: "3", icon: Users, change: "2 pending", changeType: "neutral", color: "accent" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 lg:p-8 text-primary-foreground shadow-elegant">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-2">Selamat Datang! 👋</h2>
            <p className="text-primary-foreground/90 font-body">
              Kelola properti Anda dengan mudah dan efisien
            </p>
          </div>
          <div className="hidden md:block">
            <WismaLogo size={64} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold font-heading text-foreground">{stat.value}</p>
                    <div className={`inline-flex items-center text-xs font-semibold font-body px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' 
                        ? 'bg-green-100 text-green-700' 
                        : stat.changeType === 'negative' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-soft">
          <CardHeader className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center font-heading text-lg">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              Pemesanan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-xl border border-border/30 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-heading text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground font-body">Deluxe Room • 2 malam</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full font-body">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-xl border border-border/30 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-heading text-foreground">Jane Smith</p>
                    <p className="text-sm text-muted-foreground font-body">Standard Room • 1 malam</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full font-body">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-xl border border-border/30 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-heading text-foreground">Bob Wilson</p>
                    <p className="text-sm text-muted-foreground font-body">Twin Room • 3 malam</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full font-body">
                  Checked In
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardHeader className="border-b border-border/30 bg-gradient-to-r from-accent/5 to-transparent">
            <CardTitle className="flex items-center font-heading text-lg">
              <div className="p-2 bg-accent/10 rounded-lg mr-3">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              Pendapatan 7 Hari Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day, index) => {
                const value = Math.random() * 100;
                const amount = Math.floor(Math.random() * 2000000) + 500000;
                return (
                  <div key={day} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-body font-medium">{day}</span>
                      <span className="text-foreground font-semibold font-heading">
                        Rp {amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
