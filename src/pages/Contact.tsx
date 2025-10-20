import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Hubungi Kami
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up">
            Kami siap membantu Anda. Hubungi kami melalui berbagai cara di bawah ini.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Telepon</h3>
                <a
                  href="tel:+6281234567890"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  +62 812xxx
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
                <a
                  href="mailto:info@wismaeldorado.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  info@wismaeldorado.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Alamat</h3>
                <p className="text-foreground/70">
                  Jl. Raya Waingapu No. 8<br />
                  Sumba Timur, NTT
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Jam Operasional</h3>
                <p className="text-foreground/70">
                  24 Jam<br />
                  Setiap Hari
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Lokasi Kami
            </h2>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.2185031340996!2d120.24790859999999!3d-9.6623627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c4c9ca636590579%3A0x3f47699f2117ee82!2sWisma%20Eldorado!5e0!3m2!1sid!2sid!4v1760955109853!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wisma Eldorado Location"
                />
              </div>
            </Card>
            <div className="text-center mt-6">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <a
                  href="https://maps.app.goo.gl/Bn5GuGUZdRF223kw5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka di Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Siap Menginap Bersama Kami?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Pesan kamar Anda sekarang dan rasakan kenyamanan Wisma Eldorado
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
          >
            <Link to="/booking">Pesan Kamar</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
