import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] border-t border-[#404040] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} <span className="font-semibold text-white">Ia-Solution RDC</span> - Tous droits réservés
          </div>

          {/* Filiale */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Filiale de</span>
            <span className="font-semibold text-blue-400">Ia-Solution France</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              À propos
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}