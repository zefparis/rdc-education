'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Brain, Sparkles, Users, BookOpen, Rocket } from 'lucide-react';
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
    <div className="relative z-10">
      {/* Hero Section - Split Layout */}
      <section className="relative overflow-hidden min-h-screen flex items-center">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Title with Glow Effect */}
              <div>
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
                  style={{
                    color: '#60a5fa',
                    textShadow: '0 0 40px rgba(96, 165, 250, 0.5), 0 0 80px rgba(96, 165, 250, 0.3)'
                  }}
                >
                  Ia-Solution RDC
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
                  Apprendre l&apos;IA en République Démocratique du Congo
                </p>
                <p className="text-gray-400 text-lg flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Filiale de <span className="text-blue-400 font-semibold">Ia-Solution France</span>
                </p>
              </div>

              {/* CTA Buttons - Side by Side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Primary CTA */}
                <Link
                  href="/auth"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70"
                >
                  <Rocket size={24} className="group-hover:rotate-12 transition-transform" />
                  <span>🚀 Commencer maintenant</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/dashboard"
                  className="group px-8 py-4 bg-transparent hover:bg-blue-600/10 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 border-2 border-blue-400/50 hover:border-blue-400 shadow-lg"
                >
                  <BookOpen size={20} />
                  <span>📚 Explorer les modules</span>
                </Link>
              </motion.div>

              {/* Audio Button - Smaller */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <IntroAudioPlayer />
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800"
              >
                <div>
                  <div className="text-3xl font-bold text-blue-400">6+</div>
                  <div className="text-sm text-gray-400">Modules IA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">1000+</div>
                  <div className="text-sm text-gray-400">Étudiants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Heures</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl blur-3xl"></div>
                
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
                  <Image
                    src="/images/education/education_1.jpg"
                    alt="IA Education en RDC"
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    style={{
                      boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)'
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 p-4 bg-blue-600 rounded-2xl shadow-2xl"
                >
                  <Brain size={32} className="text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 p-4 bg-emerald-600 rounded-2xl shadow-2xl"
                >
                  <Sparkles size={32} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-black/30">
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
      <section className="relative z-10 py-20 bg-gradient-to-b from-black/30 to-transparent">
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
      <section className="relative z-10 py-20">
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
