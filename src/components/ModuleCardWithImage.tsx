'use client';

import { motion } from 'framer-motion';
import { Download, BookOpen, Clock, Volume2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ModuleCardWithImageProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  icon?: React.ReactNode;
  imagePath: string;
  onListen?: () => void;
}

export default function ModuleCardWithImage({ 
  id, 
  title, 
  description, 
  duration, 
  level, 
  icon, 
  imagePath,
  onListen 
}: ModuleCardWithImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay sombre pour le contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-transparent" />
        
        {/* Badge niveau */}
        <div className="absolute top-4 right-4">
          <span className="text-xs px-3 py-1 bg-emerald-600/90 backdrop-blur-sm text-white rounded-full font-medium shadow-lg">
            {level}
          </span>
        </div>

        {/* Icône */}
        <div className="absolute bottom-4 left-4">
          <div className="p-3 bg-blue-600/90 backdrop-blur-sm rounded-lg group-hover:bg-blue-600 transition-colors shadow-lg">
            {icon || <BookOpen size={24} className="text-white" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Clock size={16} />
            <span>{duration}</span>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/modules/${id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <span>Voir</span>
            </Link>
            {onListen && (
              <button
                onClick={onListen}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                title="Écouter le module"
              >
                <Volume2 size={18} />
              </button>
            )}
            <button 
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors" 
              title="Télécharger"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
