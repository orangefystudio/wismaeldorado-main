import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AirVent, Bath, Wifi, Tv, ParkingCircle, Droplet, Bed } from "lucide-react";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomTwin from "@/assets/room-twin.jpg";

const Rooms = () => {
  const rooms = [
    {
      name: "Deluxe Room 1",
      type: "Deluxe",
      image: roomDeluxe,
      price: "250.000",
      description: "Kamar luas dengan tempat tidur queen size dan pemandangan kota",
    },
    {
      name: "Deluxe Room 2",
      type: "Deluxe",
      image: roomDeluxe,
      price: "250.000",
      description: "Kamar premium dengan desain modern dan fasilitas lengkap",
    },
    {
      name: "Standard Room 1",
      type: "Standard",
      image: roomStandard,
      price: "250.000",
      description: "Kamar nyaman dengan tempat tidur queen size",
    },
    {
      name: "Standard Room 2",
      type: "Standard",
      image: roomStandard,
      price: "250.000",
      description: "Kamar cozy dengan semua fasilitas dasar",
    },
    {
      name: "Twin Room 1",
      type: "Twin",
      image: roomTwin,
      price: "250.000",
      description: "Kamar dengan dua tempat tidur single, cocok untuk teman atau keluarga",
    },
    {
      name: "Twin Room 2",
      type: "Twin",
      image: roomTwin,
      price: "250.000",
      description: "Ruangan luas dengan dua tempat tidur terpisah",
    },
  ];

  const features = [
    { icon: AirVent, label: "AC" },
    { icon: Bath, label: "Kamar Mandi Pribadi" },
    { icon: Wifi, label: "Wi-Fi Gratis" },
    { icon: Tv, label: "TV Kabel" },
    { icon: Droplet, label: "Air Panas" },
    { icon: ParkingCircle, label: "Parkir" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Kamar Kami
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up">
            Pilih kamar yang sesuai dengan kebutuhan Anda. Semua kamar kami dilengkapi
            dengan AC dan fasilitas modern untuk kenyamanan maksimal.
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <Card
                key={room.name}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt="Tipe Kamar"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {room.type}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-heading font-semibold">Tipe Kamar</h3>
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground/70 mb-4">{room.description}</p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-border">
                    {features.map((feature) => (
                      <div key={feature.label} className="flex flex-col items-center">
                        <feature.icon className="w-5 h-5 text-primary mb-1" />
                        <span className="text-xs text-foreground/60 text-center">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price and Booking */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-heading font-bold text-primary">
                        Rp.-
                      </span>
                      <span className="text-foreground/60 block text-sm">per malam</span>
                    </div>
                    <Button asChild className="bg-accent hover:bg-accent/90">
                      <Link to="/booking">Pesan</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Info */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Semua Kamar Dilengkapi Dengan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-background rounded-lg">
                <AirVent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Air Conditioning</h3>
                  <p className="text-sm text-foreground/70">
                    AC dingin di setiap kamar untuk kenyamanan maksimal
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-background rounded-lg">
                <Bath className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Kamar Mandi Pribadi</h3>
                  <p className="text-sm text-foreground/70">
                    Kamar mandi dalam dengan air panas tersedia
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-background rounded-lg">
                <Wifi className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Wi-Fi Gratis</h3>
                  <p className="text-sm text-foreground/70">
                    Internet cepat dan stabil di seluruh area
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-background rounded-lg">
                <Tv className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">TV Kabel</h3>
                  <p className="text-sm text-foreground/70">
                    Hiburan dengan berbagai channel TV
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Sudah Menemukan Kamar yang Cocok?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Segera pesan kamar Anda dan nikmati pengalaman menginap yang nyaman
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
          >
            <Link to="/booking">Pesan Sekarang</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;
