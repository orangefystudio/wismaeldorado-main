import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/rooms">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Lihat Kamar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
