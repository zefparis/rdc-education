'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Vérifier si l'audio existe au chargement
  useEffect(() => {
    checkAudioAvailability();
  }, []);

  const checkAudioAvailability = async () => {
    try {
      const response = await fetch('/api/intro-audio');
      const data = await response.json();
      
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }
    } catch {
      // Audio pas encore généré, on le générera au clic
      setAudioUrl(null);
    }
  };

  const generateAudio = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/intro-audio');
      const data = await response.json();

      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
        setShowPlayer(true);
        // Attendre un peu que l'audio soit chargé
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.load();
          }
        }, 500);
      } else {
        setError(data.error || 'Erreur lors de la génération');
      }
    } catch (error) {
      setError('Erreur de connexion à l&apos;API');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioUrl) {
      await generateAudio();
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setShowPlayer(true);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Erreur lecture:', error);
        setError('Erreur lors de la lecture');
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    setError('Erreur de chargement de l&apos;audio');
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Bouton principal */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={togglePlay}
        disabled={isGenerating || isLoading}
        className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg shadow-purple-600/50"
      >
        {isGenerating ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span>Génération de l&apos;audio...</span>
          </>
        ) : isLoading ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span>Chargement...</span>
          </>
        ) : isPlaying ? (
          <>
            <Pause size={24} />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Volume2 size={24} className="group-hover:animate-pulse" />
            <span>🔊 Écouter l&apos;introduction</span>
          </>
        )}
      </motion.button>

      {/* Message d'erreur */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lecteur audio caché */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onError={handleAudioError}
          onCanPlay={handleCanPlay}
          onLoadStart={() => setIsLoading(true)}
          preload="auto"
          className="hidden"
        />
      )}

      {/* Mini player (optionnel) */}
      <AnimatePresence>
        {showPlayer && audioUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center space-x-4 px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full"
          >
            <button
              onClick={togglePlay}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <Volume2 size={16} className="text-purple-400" />
              <span className="text-sm text-gray-300">Introduction vocale</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
