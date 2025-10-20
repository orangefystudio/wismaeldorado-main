import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Upload, 
  Image as ImageIcon,
  Globe,
  Phone,
  Mail,
  MapPin,
  Building2,
  Settings as SettingsIcon,
  Plus,
  X,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

const SettingsManagement = () => {
  const [settings, setSettings] = useState<Tables<'settings'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    site_title: '',
    site_description: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    logo_url: '',
    hero_image_url: '',
    about_description: '',
    facilities: [] as string[]
  });

  const availableFacilities = [
    'AC di Semua Kamar',
    'Kamar Mandi Pribadi',
    'Wi-Fi Gratis',
    'TV Kabel',
    'Area Parkir',
    'Dapur Bersama',
    'Resepsionis 24 Jam',
    'Taman Outdoor'
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data);
        setFormData({
          site_title: data.site_title || '',
          site_description: data.site_description || '',
          contact_phone: data.contact_phone || '',
          contact_email: data.contact_email || '',
          contact_address: data.contact_address || '',
          logo_url: data.logo_url || '',
          hero_image_url: data.hero_image_url || '',
          about_description: data.about_description || '',
          facilities: data.facilities || []
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Gagal memuat pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (settings) {
        const { error } = await supabase
          .from('settings')
          .update(updateData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('settings')
          .insert([updateData]);

        if (error) throw error;
      }

      toast.success('Pengaturan berhasil disimpan');
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  const toggleFacility = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const addCustomFacility = (facility: string) => {
    if (facility.trim() && !formData.facilities.includes(facility.trim())) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, facility.trim()]
      }));
    }
  };

  const removeFacility = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f !== facility)
    }));
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
          <h2 className="text-2xl font-heading font-semibold tracking-tight">Pengaturan Website</h2>
          <p className="text-muted-foreground font-body">Kelola informasi dan tampilan website</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="font-body">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Informasi Umum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site_title">Judul Website</Label>
                <Input
                  id="site_title"
                  value={formData.site_title}
                  onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                  placeholder="Wisma Eldorado"
                />
              </div>
              <div>
                <Label htmlFor="site_description">Deskripsi Website</Label>
                <Textarea
                  id="site_description"
                  value={formData.site_description}
                  onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                  placeholder="Deskripsi singkat tentang Wisma Eldorado..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="about_description">Tentang Kami</Label>
                <Textarea
                  id="about_description"
                  value={formData.about_description}
                  onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                  placeholder="Deskripsi lengkap tentang Wisma Eldorado..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Logo & Gambar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo_url">URL Logo</Label>
                <div className="flex space-x-2">
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  {formData.logo_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.logo_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="hero_image_url">URL Gambar Hero</Label>
                <div className="flex space-x-2">
                  <Input
                    id="hero_image_url"
                    value={formData.hero_image_url}
                    onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
                    placeholder="https://example.com/hero.jpg"
                  />
                  {formData.hero_image_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.hero_image_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_phone">Nomor Telepon</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  placeholder="info@wismaeldorado.com"
                />
              </div>
              <div>
                <Label htmlFor="contact_address">Alamat</Label>
                <Textarea
                  id="contact_address"
                  value={formData.contact_address}
                  onChange={(e) => setFormData({ ...formData, contact_address: e.target.value })}
                  placeholder="Jl. Raya Waingapu No. 8, Pusat Kota, Sumba Timur, NTT, Indonesia"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2" />
                Konten Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site_title">Judul Halaman Utama</Label>
                <Input
                  id="site_title"
                  value={formData.site_title}
                  onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                  placeholder="Wisma Eldorado"
                />
              </div>
              <div>
                <Label htmlFor="site_description">Tagline</Label>
                <Input
                  id="site_description"
                  value={formData.site_description}
                  onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                  placeholder="Stay Comfortably in the Heart of Waingapu"
                />
              </div>
              <div>
                <Label htmlFor="about_description">Deskripsi Tentang Kami</Label>
                <Textarea
                  id="about_description"
                  value={formData.about_description}
                  onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                  placeholder="Wisma Eldorado adalah penginapan modern dan nyaman..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facilities Settings */}
        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Fasilitas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Fasilitas Tersedia</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {availableFacilities.map((facility) => (
                    <div
                      key={facility}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.facilities.includes(facility)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleFacility(facility)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.facilities.includes(facility)}
                        onChange={() => toggleFacility(facility)}
                        className="rounded"
                      />
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Fasilitas Kustom</Label>
                <div className="space-y-2">
                  {formData.facilities
                    .filter(f => !availableFacilities.includes(f))
                    .map((facility) => (
                      <div key={facility} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">{facility}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFacility(facility)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tambah fasilitas kustom..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addCustomFacility(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addCustomFacility(input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
