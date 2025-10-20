import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  AirVent,
  Bath,
  Wifi,
  Tv,
  ParkingCircle,
  Coffee,
  Clock,
  Leaf,
  Droplet,
  ChevronRight,
} from "lucide-react";
import heroImage from "@/assets/hero-guesthouse.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import lobbyImage from "@/assets/lobby.jpg";

const Index = () => {
  // Scroll animation hooks for about section photos
  const { elementRef: aboutSectionRef, isVisible: isAboutVisible } = useScrollAnimation(0.2);
  
  const facilities = [
    { icon: AirVent, title: "AC di Semua Kamar", description: "Ruangan sejuk dan nyaman" },
    { icon: Bath, title: "Kamar Mandi Pribadi", description: "Air panas tersedia" },
    { icon: Wifi, title: "Wi-Fi Gratis", description: "Internet cepat & stabil" },
    { icon: Tv, title: "TV Kabel", description: "Hiburan di setiap kamar" },
    { icon: ParkingCircle, title: "Area Parkir", description: "Aman dan luas" },
    { icon: Coffee, title: "Dapur Bersama", description: "Fasilitas memasak" },
    { icon: Clock, title: "Resepsionis 24 Jam", description: "Siap melayani Anda" },
    { icon: Leaf, title: "Taman Outdoor", description: "Area bersantai" },
  ];

  const rooms = [
    {
      name: "Deluxe Room",
      image: roomDeluxe,
      price: "250.000",
    },
    {
      name: "Standard Room",
      image: roomStandard,
      price: "250.000",
    },
    {
      name: "Twin Room",
      image: roomTwin,
      price: "250.000",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tight mb-4">
            Wisma Eldorado
          </h1>
          <p className="text-lg md:text-xl mb-3 max-w-2xl mx-auto opacity-90">
            Stay Comfortably in the Heart of Waingapu
          </p>
          <p className="text-base md:text-lg mb-6 text-white/85 max-w-xl mx-auto">
            6 kamar ber-AC nyaman dengan fasilitas modern untuk pengalaman menginap terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-7 py-5"
            >
              <Link to="/booking">Pesan Kamar</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white text-base md:text-lg px-7 py-5 backdrop-blur-sm"
            >
              <Link to="/rooms">Lihat Kamar</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              ref={aboutSectionRef}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={roomDeluxe}
                alt="Kamar Interior"
                className={`rounded-2xl w-full h-64 object-cover transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${
                  isAboutVisible 
                    ? 'animate-scroll-slide-left' 
                    : 'scroll-animate-hidden'
                }`}
                style={{ animationDelay: '0.15s' }}
              />
              <img
                src={lobbyImage}
                alt="Lobby"
                className={`rounded-2xl w-full h-64 object-cover mt-8 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${
                  isAboutVisible 
                    ? 'animate-scroll-slide-right' 
                    : 'scroll-animate-hidden'
                }`}
                style={{ animationDelay: '0.25s' }}
              />
              <img
                src={roomStandard}
                alt="Kamar Standard"
                className={`rounded-2xl w-full h-64 object-cover -mt-8 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${
                  isAboutVisible 
                    ? 'animate-scroll-slide-left' 
                    : 'scroll-animate-hidden'
                }`}
                style={{ animationDelay: '0.35s' }}
              />
              <img
                src={heroImage}
                alt="Gedung Depan"
                className={`rounded-2xl w-full h-64 object-cover transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${
                  isAboutVisible 
                    ? 'animate-scroll-slide-right' 
                    : 'scroll-animate-hidden'
                }`}
                style={{ animationDelay: '0.45s' }}
              />
            </div>

            <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-5">
                Tentang Kami
              </h2>
            <p className="text-base md:text-lg text-foreground/80 mb-5 leading-relaxed">
                Wisma Eldorado adalah penginapan modern dan nyaman di pusat Kota Waingapu.
                Kami menyediakan kamar ber-AC dengan fasilitas lengkap dan pelayanan ramah
                untuk tamu yang berkunjung ke Sumba Timur.
              </p>
            <p className="text-base md:text-lg text-foreground/80 mb-7 leading-relaxed">
                Dengan lokasi strategis di jantung kota, Wisma Eldorado menjadi pilihan
                sempurna untuk perjalanan bisnis maupun liburan Anda. Nikmati kenyamanan
                seperti di rumah sendiri dengan harga terjangkau.
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-3">
              Kamar Kami
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Pilih kamar yang sesuai dengan kebutuhan Anda. Semua kamar dilengkapi
              dengan AC dan fasilitas modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {rooms.map((room, index) => (
              <Card
                key={room.name}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={room.image}
                  alt="Tipe Kamar"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-tight mb-2">Tipe Kamar</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-1 text-sm text-foreground/70">
                      <AirVent className="w-4 h-4" /> AC
                    </span>
                    <span className="flex items-center gap-1 text-sm text-foreground/70">
                      <Bath className="w-4 h-4" /> Kamar Mandi
                    </span>
                    <span className="flex items-center gap-1 text-sm text-foreground/70">
                      <Wifi className="w-4 h-4" /> Wi-Fi
                    </span>
                    <span className="flex items-center gap-1 text-sm text-foreground/70">
                      <Tv className="w-4 h-4" /> TV
                    </span>
                    <span className="flex items-center gap-1 text-sm text-foreground/70">
                      <Droplet className="w-4 h-4" /> Air Panas
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl md:text-3xl font-heading font-semibold text-primary">
                        Rp.-
                      </span>
                      <span className="text-foreground/60"> / malam</span>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-sm md:text-base py-5">
                    <Link to="/booking">Pesan</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/rooms">Lihat Semua Kamar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-3">
              Fasilitas
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Nikmati berbagai fasilitas yang kami sediakan untuk kenyamanan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <Card
                key={facility.title}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-0"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <facility.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {facility.title}
                </h3>
                <p className="text-foreground/70">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-5">
            Siap Menginap di Wisma Eldorado?
          </h2>
          <p className="text-base md:text-lg mb-7 max-w-2xl mx-auto opacity-90">
            Pesan kamar Anda sekarang dan nikmati pengalaman menginap yang nyaman
            di pusat Kota Waingapu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              <Link to="/booking">Pesan Sekarang</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8"
            >
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
