'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images placeholder avec gradients
  const images = [
    {
      id: 1,
      title: 'Intelligence Artificielle',
      gradient: 'from-blue-600 to-purple-600',
      emoji: '🤖',
    },
    {
      id: 2,
      title: 'Machine Learning',
      gradient: 'from-purple-600 to-pink-600',
      emoji: '🧠',
    },
    {
      id: 3,
      title: 'Deep Learning',
      gradient: 'from-pink-600 to-red-600',
      emoji: '🔬',
    },
    {
      id: 4,
      title: 'Data Science',
      gradient: 'from-emerald-600 to-teal-600',
      emoji: '📊',
    },
    {
      id: 5,
      title: 'IA Générative',
      gradient: 'from-teal-600 to-cyan-600',
      emoji: '✨',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative h-[400px] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${images[currentIndex].gradient} flex items-center justify-center`}
          >
            <div className="text-center">
              <div className="text-9xl mb-6">{images[currentIndex].emoji}</div>
              <h3 className="text-4xl font-bold text-white">
                {images[currentIndex].title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Image suivante"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-500 w-8'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
