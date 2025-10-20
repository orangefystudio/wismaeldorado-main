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
  Shield,
  Home
} from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-primary flex-shrink-0" />
            <span className="font-heading font-semibold text-lg tracking-tight">Wisma Eldorado</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* All Menu Items - Scrollable */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start font-body ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Admin Info & Logout - Separated */}
        <div className="flex-shrink-0 border-t border-border p-4 space-y-3">
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-sm font-medium font-body">{adminUser.name}</p>
            <p className="text-xs text-muted-foreground">{adminUser.email}</p>
            <p className="text-xs text-primary capitalize font-body mt-1">{adminUser.role}</p>
          </div>
          <Button
            variant="outline"
            className="w-full font-body"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-semibold tracking-tight">
              {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const stats = [
    { title: "Total Pemesanan", value: "24", icon: Calendar, change: "+12%", changeType: "positive" },
    { title: "Kamar Tersedia", value: "4/6", icon: Bed, change: "2 kosong", changeType: "neutral" },
    { title: "Pendapatan Bulan Ini", value: "Rp 6.2M", icon: DollarSign, change: "+8%", changeType: "positive" },
    { title: "Tamu Check-in Hari Ini", value: "3", icon: Users, change: "2 pending", changeType: "neutral" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-body">{stat.title}</p>
                    <p className="text-2xl font-bold font-heading">{stat.value}</p>
                    <p className={`text-xs font-body ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center font-heading">
              <Clock className="w-5 h-5 mr-2" />
              Pemesanan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium font-body">John Doe</p>
                  <p className="text-sm text-muted-foreground font-body">Deluxe Room - 2 malam</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-body">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium font-body">Jane Smith</p>
                  <p className="text-sm text-muted-foreground font-body">Standard Room - 1 malam</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-body">
                  Confirmed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center font-heading">
              <TrendingUp className="w-5 h-5 mr-2" />
              Pendapatan 7 Hari Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, index) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-body">{day}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium font-body">Rp {Math.floor(Math.random() * 2000000) + 500000}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
