import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Users,
  Bed,
  Clock,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

const FinancialReports = () => {
  const [bookings, setBookings] = useState<Tables<'bookings'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30"); // days
  const [viewType, setViewType] = useState("overview");

  useEffect(() => {
    fetchBookings();
  }, [period]);

  const fetchBookings = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period));

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Gagal memuat data laporan');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalRevenue = bookings
      .filter(b => b.payment_status === 'paid')
      .reduce((sum, booking) => sum + booking.total_price, 0);

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const checkedInBookings = bookings.filter(b => b.status === 'checked_in').length;
    const completedBookings = bookings.filter(b => b.status === 'checked_out').length;

    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    return {
      totalRevenue,
      totalBookings,
      confirmedBookings,
      checkedInBookings,
      completedBookings,
      averageBookingValue
    };
  };

  const getRevenueByDay = () => {
    const revenueByDay: { [key: string]: number } = {};
    
    bookings
      .filter(b => b.payment_status === 'paid')
      .forEach(booking => {
        const date = new Date(booking.created_at).toLocaleDateString('id-ID', { 
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        revenueByDay[date] = (revenueByDay[date] || 0) + booking.total_price;
      });

    return Object.entries(revenueByDay).map(([date, revenue]) => ({
      date,
      revenue
    }));
  };

  const getRevenueByStatus = () => {
    const statusRevenue = {
      pending: 0,
      confirmed: 0,
      checked_in: 0,
      checked_out: 0,
      cancelled: 0
    };

    bookings.forEach(booking => {
      statusRevenue[booking.status as keyof typeof statusRevenue] += booking.total_price;
    });

    return Object.entries(statusRevenue).map(([status, revenue]) => ({
      status,
      revenue,
      label: {
        pending: 'Pending',
        confirmed: 'Dikonfirmasi',
        checked_in: 'Check-in',
        checked_out: 'Selesai',
        cancelled: 'Dibatalkan'
      }[status as keyof typeof statusRevenue]
    }));
  };

  const stats = calculateStats();
  const revenueByDay = getRevenueByDay();
  const revenueByStatus = getRevenueByStatus();

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
          <h2 className="text-2xl font-heading font-semibold tracking-tight">Laporan Keuangan</h2>
          <p className="text-muted-foreground font-body">Analisis pendapatan dan performa bisnis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Hari</SelectItem>
              <SelectItem value="30">30 Hari</SelectItem>
              <SelectItem value="90">90 Hari</SelectItem>
              <SelectItem value="365">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchBookings} className="font-body">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pendapatan</p>
                <p className="text-2xl font-bold">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% dari periode sebelumnya
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pemesanan</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.confirmedBookings} dikonfirmasi
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rata-rata per Pemesanan</p>
                <p className="text-2xl font-bold">Rp {Math.round(stats.averageBookingValue).toLocaleString('id-ID')}</p>
                <p className="text-xs text-muted-foreground">
                  Nilai per transaksi
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tamu Check-in</p>
                <p className="text-2xl font-bold">{stats.checkedInBookings}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.completedBookings} selesai
                </p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Day */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Pendapatan Harian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueByDay.length > 0 ? (
                revenueByDay.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ 
                            width: `${(item.revenue / Math.max(...revenueByDay.map(r => r.revenue))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-20 text-right">
                        Rp {item.revenue.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Tidak ada data pendapatan untuk periode ini
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Pendapatan per Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueByStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'checked_out' ? 'bg-green-500' :
                      item.status === 'checked_in' ? 'bg-blue-500' :
                      item.status === 'confirmed' ? 'bg-yellow-500' :
                      item.status === 'pending' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">
                    Rp {item.revenue.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Pemesanan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Tamu</th>
                  <th className="text-left p-3 font-medium">Tanggal</th>
                  <th className="text-left p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.guest_name}</p>
                        <p className="text-sm text-muted-foreground">{booking.guest_email}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">
                        {new Date(booking.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">
                        Rp {booking.total_price.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge className={
                        booking.status === 'checked_out' ? 'bg-green-100 text-green-800' :
                        booking.status === 'checked_in' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {booking.status === 'checked_out' ? 'Selesai' :
                         booking.status === 'checked_in' ? 'Check-in' :
                         booking.status === 'confirmed' ? 'Dikonfirmasi' :
                         booking.status === 'pending' ? 'Pending' :
                         'Dibatalkan'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={
                        booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {booking.payment_status === 'paid' ? 'Lunas' :
                         booking.payment_status === 'pending' ? 'Pending' :
                         'Refund'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReports;
