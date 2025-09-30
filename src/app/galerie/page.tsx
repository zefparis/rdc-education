'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { getAllImages } from '@/lib/images';

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Récupérer toutes les images depuis les dossiers
  const images = getAllImages();

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Real Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image.path}
                  alt={image.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn size={48} className="text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Image info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{image.name}</h3>
                <p className="text-gray-400 text-sm">{image.theme}</p>
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
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={images[selectedImage]?.path || ''}
                      alt={images[selectedImage]?.name || ''}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Image details */}
                  <div className="p-6 border-t border-[#2a2a2a]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {images[selectedImage]?.name}
                        </h3>
                        <p className="text-gray-400">
                          {images[selectedImage]?.theme} - Image {selectedImage + 1} sur {images.length}
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