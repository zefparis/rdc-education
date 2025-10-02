'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Image as ImageIcon, LogIn, Menu, X, HelpCircle, Users, Brain, MessageCircle, Briefcase, ChevronDown, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navSections = [
    {
      title: 'Principal',
      items: [
        { href: '/', label: 'Accueil', icon: Home },
        { href: '/how-it-works', label: 'Comment ça marche ?', icon: HelpCircle },
      ]
    },
    {
      title: 'Apprentissage',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/modules/data-science', label: 'Modules', icon: BookOpen },
        { href: '/quiz', label: 'Quiz', icon: HelpCircle },
      ]
    },
    {
      title: 'Communauté',
      items: [
        { href: '/projects', label: 'Projets Collaboratifs', icon: Users },
        { href: '/community', label: 'Communauté', icon: MessageCircle },
        { href: '/interview', label: 'Entrevue IA', icon: Brain },
      ]
    },
    {
      title: 'Carrière',
      items: [
        { href: '/jobs', label: 'Emploi IA', icon: Briefcase },
        { href: '/galerie', label: 'Galerie', icon: ImageIcon },
      ]
    }
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const handleDropdown = (sectionTitle: string) => {
    setActiveDropdown(activeDropdown === sectionTitle ? null : sectionTitle);
  };

  return (
    <nav className="sticky top-0 z-50 glass-navbar navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
            >
              Ia-Solution RDC
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navSections.map((section) => (
              <div key={section.title} className="relative">
                <button
                  onClick={() => handleDropdown(section.title)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 glass-button ${
                    section.items.some(item => isActive(item.href))
                      ? 'bg-orange-600/20 text-white border border-orange-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 hover:bg-orange-500/10'
                  }`}
                >
                  <span className="font-medium">{section.title}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${activeDropdown === section.title ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === section.title && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden"
                      style={{
                        background: 'rgba(30, 30, 30, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 165, 0, 0.4)',
                        boxShadow: '0 0 10px rgba(255, 165, 0, 0.3), 0 0 20px rgba(255, 165, 0, 0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="relative py-1">
                        {/* Effet de lueur intérieure */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            boxShadow: 'inset 0 0 20px rgba(255, 165, 0, 0.1)',
                            borderRadius: '0.75rem'
                          }}
                        />
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              style={{
                                textShadow: isActive(item.href) ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
                              }}
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 relative group ${
                                isActive(item.href)
                                  ? 'bg-gradient-to-r from-orange-600/40 to-orange-700/50 text-white font-medium'
                                  : 'text-gray-200 hover:bg-white/5 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-600/10'
                              }`}
                            >
                              <Icon size={18} />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Connexion - separate */}
            <Link
              href="/auth"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 glass-button ${
                isActive('/auth')
                  ? 'bg-orange-600/20 text-white border border-orange-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-orange-500/10'
              }`}
            >
              <LogIn size={18} />
              <span className="font-medium">Connexion</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-button hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-orange-500/20"
          >
            <div className="p-2">
              {navSections.map((section) => (
                <div key={section.title} className="mb-4">
                  <div className="text-gray-400 text-sm font-medium mb-2 px-3">
                    {section.title}
                  </div>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-gradient-to-r from-orange-500/30 to-orange-600/40 text-white font-medium'
                            : 'text-gray-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}

              <div className="pt-2 border-t border-orange-500/20">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-white/5 ${
                    isActive('/auth')
                      ? 'bg-orange-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-500/10'
                  }`}
                >
                  <LogIn size={20} />
                  <span className="font-medium">Connexion</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}