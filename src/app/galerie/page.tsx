'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Images placeholder - en production, ces images viendraient du dossier public/images
  const images = [
    { id: 1, title: 'Intelligence Artificielle', description: 'Concepts fondamentaux de l\'IA' },
    { id: 2, title: 'Machine Learning', description: 'Algorithmes d\'apprentissage automatique' },
    { id: 3, title: 'Deep Learning', description: 'Réseaux de neurones profonds' },
    { id: 4, title: 'Data Science', description: 'Analyse et visualisation de données' },
    { id: 5, title: 'IA Générative', description: 'Création de contenu avec l\'IA' },
    { id: 6, title: 'Computer Vision', description: 'Vision par ordinateur' },
    { id: 7, title: 'NLP', description: 'Traitement du langage naturel' },
    { id: 8, title: 'Robotique', description: 'Intelligence artificielle et robotique' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galerie
          </h1>
          <p className="text-gray-400 text-lg">
            Explorez notre collection d&apos;images et ressources visuelles sur l&apos;IA
          </p>
        </motion.div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Placeholder gradient image */}
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10 text-center p-6">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-white font-semibold">{image.title}</h3>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn size={48} className="text-white" />
                </div>
              </div>

              {/* Image info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                <p className="text-gray-400 text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <X size={32} />
                </button>

                {/* Modal content */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
                  {/* Large image */}
                  <div className="aspect-video bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20 flex items-center justify-center">
                    <div className="text-center p-12">
                      <div className="text-9xl mb-6">🤖</div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {images.find(img => img.id === selectedImage)?.title}
                      </h2>
                      <p className="text-gray-400 text-lg">
                        {images.find(img => img.id === selectedImage)?.description}
                      </p>
                    </div>
                  </div>

                  {/* Image details */}
                  <div className="p-6 border-t border-[#2a2a2a]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {images.find(img => img.id === selectedImage)?.title}
                        </h3>
                        <p className="text-gray-400">
                          Image {selectedImage} sur {images.length}
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                        Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}