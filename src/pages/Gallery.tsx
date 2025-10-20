import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-guesthouse.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import lobbyImage from "@/assets/lobby.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: heroImage, alt: "Wisma Eldorado Exterior", category: "Exterior" },
    { src: roomDeluxe, alt: "Deluxe Room", category: "Rooms" },
    { src: roomStandard, alt: "Standard Room", category: "Rooms" },
    { src: roomTwin, alt: "Twin Room", category: "Rooms" },
    { src: lobbyImage, alt: "Lobby Area", category: "Facilities" },
    { src: heroImage, alt: "Building Front", category: "Exterior" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Galeri
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up">
            Jelajahi foto-foto Wisma Eldorado. Lihat kamar kami, fasilitas, dan
            suasana yang menanti Anda.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent text-sm font-semibold mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl font-heading font-semibold">
                    {image.alt}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Tur Virtual
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Video tur virtual akan segera hadir. Sementara itu, silakan hubungi
              kami untuk informasi lebih lanjut.
            </p>
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
              <p className="text-foreground/50">Video Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
