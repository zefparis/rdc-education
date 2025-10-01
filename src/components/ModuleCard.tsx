'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Clock, Volume2 } from 'lucide-react';
import Link from 'next/link';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  icon?: React.ReactNode;
  onListen?: () => void;
}

export default function ModuleCard({ id, title, description, duration, level, icon, onListen }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      className="glass-card group relative overflow-hidden hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-600/5 via-transparent to-emerald-600/5 pointer-events-none" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 glass-button rounded-lg group-hover:bg-blue-600/20 transition-all duration-300">
            {icon || <BookOpen size={24} className="text-blue-500" />}
          </div>
          <span className="text-xs px-3 py-1 glass-button text-emerald-400 rounded-full font-medium border border-emerald-500/30">
            {level}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
          <div className="flex items-center space-x-2 text-white/50 text-sm">
            <Clock size={16} />
            <span>{duration}</span>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/modules/${id}`}
              className="px-4 py-2 glass-button bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 group/btn"
            >
              <span>Voir</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full group-hover/btn:animate-pulse" />
            </Link>
            {onListen && (
              <button
                onClick={onListen}
                className="p-2 glass-button bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-white rounded-lg transition-all duration-300"
                title="Écouter le module"
              >
                <Volume2 size={18} />
              </button>
            )}
            <button className="p-2 glass-button bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-white rounded-lg transition-all duration-300" title="Télécharger">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bordure animée */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}