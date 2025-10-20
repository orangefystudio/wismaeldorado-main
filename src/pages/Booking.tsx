import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Booking = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [roomType, setRoomType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const pricePerNight = 250000;
    return nights * pricePerNight;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !roomType) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error("Tanggal check-out harus setelah tanggal check-in");
      return;
    }

    // Here we'll add backend integration later
    toast.success("Pemesanan berhasil! Kami akan segera menghubungi Anda.");
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", notes: "" });
    setCheckIn(undefined);
    setCheckOut(undefined);
    setRoomType("");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Pesan Kamar
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up">
            Lengkapi formulir di bawah ini untuk memesan kamar Anda
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Tanggal Check-In *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal mt-2",
                                !checkIn && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkIn ? format(checkIn, "PPP") : "Pilih tanggal"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label>Tanggal Check-Out *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal mt-2",
                                !checkOut && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOut ? format(checkOut, "PPP") : "Pilih tanggal"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkOut}
                              onSelect={setCheckOut}
                              disabled={(date) => !checkIn || date <= checkIn}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="roomType">Tipe Kamar *</Label>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih tipe kamar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deluxe">Deluxe Room</SelectItem>
                          <SelectItem value="standard">Standard Room</SelectItem>
                          <SelectItem value="twin">Twin Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notes">Catatan Tambahan</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={4}
                        className="mt-2"
                        placeholder="Permintaan khusus atau catatan lainnya..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Pesan Sekarang
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Summary */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-bold mb-6">
                      Ringkasan Pesanan
                    </h3>

                    <div className="space-y-4 mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Tipe Kamar</span>
                        <span className="font-semibold">
                          {roomType
                            ? roomType.charAt(0).toUpperCase() + roomType.slice(1)
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Check-In</span>
                        <span className="font-semibold">
                          {checkIn ? format(checkIn, "dd MMM yyyy") : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Check-Out</span>
                        <span className="font-semibold">
                          {checkOut ? format(checkOut, "dd MMM yyyy") : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Jumlah Malam</span>
                        <span className="font-semibold">
                          {calculateNights() || "-"} malam
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Harga per malam</span>
                        <span>Rp250.000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Subtotal</span>
                        <span>
                          {calculateTotal()
                            ? `Rp${calculateTotal().toLocaleString("id-ID")}`
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-heading font-semibold">
                          Total
                        </span>
                        <span className="text-2xl font-heading font-bold text-primary">
                          {calculateTotal()
                            ? `Rp${calculateTotal().toLocaleString("id-ID")}`
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground/70">
                        💳 Pembayaran dapat dilakukan saat check-in atau transfer
                        terlebih dahulu
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
