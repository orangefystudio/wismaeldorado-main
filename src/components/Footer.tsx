import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#E2E8F0] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Home className="w-8 h-8 text-[#E2E8F0]/80" aria-label="Wisma Eldorado Logo" />
              </div>
              <span className="font-heading font-semibold text-lg tracking-tight">Wisma Eldorado</span>
            </div>
            <p className="text-sm text-[#E2E8F0]/80 mb-4">
              Penginapan modern dan nyaman di pusat Kota Waingapu, Sumba Timur. 
              6 kamar ber-AC dengan fasilitas lengkap dan pelayanan ramah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-sm hover:text-primary transition-colors">
                  Kamar
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-primary transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm hover:text-primary transition-colors">
                  Pemesanan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Jl. Raya Waingapu No. 8, Pusat Kota<br />
                  Sumba Timur, NTT, Indonesia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-sm hover:text-primary transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@wismaeldorado.com" className="text-sm hover:text-primary transition-colors">
                  info@wismaeldorado.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#E2E8F0]/10 text-center">
          <p className="text-sm text-[#E2E8F0]/60">
            © 2024 Wisma Eldorado. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
