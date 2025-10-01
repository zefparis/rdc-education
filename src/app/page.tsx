'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Sparkles, Users, BookOpen } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel';
import IntroAudioPlayer from '@/components/IntroAudioPlayer';

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Intelligence Artificielle',
      description: 'Apprenez les fondamentaux et techniques avancées de l\'IA',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Contenu de Qualité',
      description: 'Cours structurés et projets pratiques pour maîtriser l\'IA',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Communauté Active',
      description: 'Rejoignez des milliers d\'étudiants en RDC',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Modules Complets',
      description: 'Data Science, Deep Learning, IA Générative et plus',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: 'url(/images/education/education_1.jpg)',
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#0a0a0a'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  Ia-Solution RDC
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
                Apprendre l&apos;IA en République Démocratique du Congo
              </p>
              <p className="text-gray-400 text-lg">
                Filiale de <span className="text-blue-400 font-semibold">Ia-Solution France</span>
              </p>
            </motion.div>

            {/* Bouton Audio Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <IntroAudioPlayer />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/auth"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-600/50"
              >
                <span>Commencer maintenant</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-full font-semibold text-lg transition-all duration-200 border border-[#2a2a2a] hover:border-blue-500/50"
              >
                Explorer les modules
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi choisir Ia-Solution RDC ?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Une plateforme éducative complète pour maîtriser l&apos;Intelligence Artificielle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Découvrez nos domaines d&apos;expertise
            </h2>
            <p className="text-gray-400 text-lg">
              Explorez les différents domaines de l&apos;Intelligence Artificielle
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ImageCarousel />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à commencer votre parcours en IA ?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Rejoignez des milliers d&apos;étudiants qui apprennent l&apos;IA en RDC
            </p>
            <Link
              href="/auth"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Créer mon compte gratuitement
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
