import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Edit,
  Trash2,
  Eye,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Tables<'bookings'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Tables<'bookings'> | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Gagal memuat data pemesanan');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Status pemesanan berhasil diperbarui');
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Gagal memperbarui status pemesanan');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Dikonfirmasi', className: 'bg-blue-100 text-blue-800' },
      checked_in: { label: 'Check-in', className: 'bg-green-100 text-green-800' },
      checked_out: { label: 'Check-out', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest_phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          <h2 className="text-2xl font-heading font-semibold tracking-tight">Manajemen Pemesanan</h2>
          <p className="text-muted-foreground font-body">Kelola semua pemesanan kamar</p>
        </div>
        <Button onClick={fetchBookings} className="font-body">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="font-body">Cari Pemesanan</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nama, email, atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-body"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="status" className="font-body">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1 font-body">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                  <SelectItem value="checked_in">Check-in</SelectItem>
                  <SelectItem value="checked_out">Check-out</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pemesanan ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Tamu</th>
                  <th className="text-left p-3 font-medium">Kamar</th>
                  <th className="text-left p-3 font-medium">Check-in/out</th>
                  <th className="text-left p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.guest_name}</p>
                        <p className="text-sm text-muted-foreground">{booking.guest_email}</p>
                        <p className="text-sm text-muted-foreground">{booking.guest_phone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">Room {booking.room_id}</span>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <p>In: {new Date(booking.check_in).toLocaleDateString('id-ID')}</p>
                        <p>Out: {new Date(booking.check_out).toLocaleDateString('id-ID')}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">Rp {booking.total_price.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'checked_in')}
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                        )}
                        {booking.status === 'checked_in' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'checked_out')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setShowModal(false)}
          onUpdate={fetchBookings}
        />
      )}
    </div>
  );
};

// Booking Detail Modal Component
const BookingDetailModal = ({ 
  booking, 
  onClose, 
  onUpdate 
}: { 
  booking: Tables<'bookings'>; 
  onClose: () => void; 
  onUpdate: () => void;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (error) throw error;
      
      toast.success('Status berhasil diperbarui');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Gagal memperbarui status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detail Pemesanan</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Informasi Tamu
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Nama:</span> {booking.guest_name}</p>
                <p><span className="font-medium">Email:</span> {booking.guest_email}</p>
                <p><span className="font-medium">Telepon:</span> {booking.guest_phone}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Detail Pemesanan
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Check-in:</span> {new Date(booking.check_in).toLocaleDateString('id-ID')}</p>
                <p><span className="font-medium">Check-out:</span> {new Date(booking.check_out).toLocaleDateString('id-ID')}</p>
                <p><span className="font-medium">Kamar:</span> Room {booking.room_id}</p>
                <p><span className="font-medium">Total:</span> Rp {booking.total_price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h3 className="font-semibold mb-2">Catatan</h3>
              <p className="text-muted-foreground">{booking.notes}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {booking.status === 'pending' && (
              <Button onClick={() => updateStatus('confirmed')} disabled={isUpdating}>
                Konfirmasi Pemesanan
              </Button>
            )}
            {booking.status === 'confirmed' && (
              <Button onClick={() => updateStatus('checked_in')} disabled={isUpdating}>
                Check-in
              </Button>
            )}
            {booking.status === 'checked_in' && (
              <Button onClick={() => updateStatus('checked_out')} disabled={isUpdating}>
                Check-out
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManagement;
