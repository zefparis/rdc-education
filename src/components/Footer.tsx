import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-footer depth-1 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-white/90 text-sm">
            © {currentYear} <span className="font-semibold text-blue-400">Ia-Solution RDC</span> - Tous droits réservés
          </div>

          {/* Filiale */}
          <div className="flex items-center space-x-2 text-white/60 text-sm">
            <span>Filiale de</span>
            <span className="font-semibold text-blue-400">Ia-Solution France</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
              À propos
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
              Contact
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}