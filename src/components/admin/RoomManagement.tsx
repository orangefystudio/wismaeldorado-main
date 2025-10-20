import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  Bed,
  Users,
  DollarSign,
  Wifi,
  Tv,
  Car,
  Coffee,
  Clock,
  Leaf,
  Droplet,
  AirVent,
  Bath,
  Eye,
  Save,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Tables<'rooms'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Tables<'rooms'> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_night: 0,
    max_guests: 1,
    room_type: 'standard' as 'deluxe' | 'standard' | 'twin',
    amenities: [] as string[],
    images: [] as string[],
    is_available: true
  });

  const availableAmenities = [
    { id: 'ac', label: 'AC', icon: AirVent },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'bathroom', label: 'Kamar Mandi', icon: Bath },
    { id: 'hot_water', label: 'Air Panas', icon: Droplet },
    { id: 'parking', label: 'Parkir', icon: Car },
    { id: 'kitchen', label: 'Dapur', icon: Coffee },
    { id: 'garden', label: 'Taman', icon: Leaf },
  ];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Gagal memuat data kamar');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingRoom) {
        const { error } = await supabase
          .from('rooms')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingRoom.id);

        if (error) throw error;
        toast.success('Kamar berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('rooms')
          .insert([formData]);

        if (error) throw error;
        toast.success('Kamar berhasil ditambahkan');
      }

      fetchRooms();
      resetForm();
    } catch (error) {
      console.error('Error saving room:', error);
      toast.error('Gagal menyimpan kamar');
    }
  };

  const handleEdit = (room: Tables<'rooms'>) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      price_per_night: room.price_per_night,
      max_guests: room.max_guests,
      room_type: room.room_type,
      amenities: room.amenities,
      images: room.images,
      is_available: room.is_available
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kamar ini?')) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Kamar berhasil dihapus');
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Gagal menghapus kamar');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price_per_night: 0,
      max_guests: 1,
      room_type: 'standard',
      amenities: [],
      images: [],
      is_available: true
    });
    setEditingRoom(null);
    setShowModal(false);
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const getRoomTypeBadge = (type: string) => {
    const typeConfig = {
      deluxe: { label: 'Deluxe', className: 'bg-purple-100 text-purple-800' },
      standard: { label: 'Standard', className: 'bg-blue-100 text-blue-800' },
      twin: { label: 'Twin', className: 'bg-green-100 text-green-800' },
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.standard;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold tracking-tight">Manajemen Kamar</h2>
          <p className="text-muted-foreground font-body">Kelola kamar dan fasilitas</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="font-body">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kamar
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {room.images.length > 0 ? (
                <img 
                  src={room.images[0]} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                {getRoomTypeBadge(room.room_type)}
              </div>
              <div className="absolute top-2 left-2">
                <Badge className={room.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {room.is_available ? 'Tersedia' : 'Tidak Tersedia'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {room.max_guests} tamu
                  </div>
                  <div className="flex items-center font-semibold text-primary">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Rp {room.price_per_night.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {room.amenities.slice(0, 3).map((amenity) => {
                    const amenityConfig = availableAmenities.find(a => a.id === amenity);
                    if (!amenityConfig) return null;
                    const Icon = amenityConfig.icon;
                    return (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        <Icon className="w-3 h-3 mr-1" />
                        {amenityConfig.label}
                      </Badge>
                    );
                  })}
                  {room.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{room.amenities.length - 3} lainnya
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(room)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(room.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Room Form Modal */}
      {showModal && (
        <RoomFormModal
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={resetForm}
          availableAmenities={availableAmenities}
          toggleAmenity={toggleAmenity}
          editingRoom={editingRoom}
        />
      )}
    </div>
  );
};

// Room Form Modal Component
const RoomFormModal = ({
  formData,
  setFormData,
  onSubmit,
  onClose,
  availableAmenities,
  toggleAmenity,
  editingRoom
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  availableAmenities: any[];
  toggleAmenity: (id: string) => void;
  editingRoom: Tables<'rooms'> | null;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingRoom ? 'Edit Kamar' : 'Tambah Kamar Baru'}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Kamar</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Deluxe Room"
                  required
                />
              </div>
              <div>
                <Label htmlFor="room_type">Tipe Kamar</Label>
                <Select
                  value={formData.room_type}
                  onValueChange={(value) => setFormData({ ...formData, room_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe kamar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="twin">Twin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi kamar..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Harga per Malam (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price_per_night}
                  onChange={(e) => setFormData({ ...formData, price_per_night: parseInt(e.target.value) || 0 })}
                  placeholder="250000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="max_guests">Maksimal Tamu</Label>
                <Input
                  id="max_guests"
                  type="number"
                  value={formData.max_guests}
                  onChange={(e) => setFormData({ ...formData, max_guests: parseInt(e.target.value) || 1 })}
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Fasilitas</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {availableAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={amenity.id}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.amenities.includes(amenity.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleAmenity(amenity.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
              />
              <Label htmlFor="is_available">Kamar Tersedia</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingRoom ? 'Perbarui' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomManagement;
