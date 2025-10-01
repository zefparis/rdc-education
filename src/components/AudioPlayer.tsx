'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

export default function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 shadow-lg"
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {title && (
        <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Volume2 size={20} className="text-blue-400" />
          <span>{title}</span>
        </h3>
      )}

      <div className="space-y-4">
        {/* Play/Pause Button & Progress */}
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex-shrink-0 w-12 h-12 glass-button bg-blue-600/20 hover:bg-blue-600/30 disabled:bg-gray-600/50 rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            {isLoading ? (
              <Loader2 size={24} className="text-white animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} className="text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play size={24} className="text-white ml-1 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <div className="flex-1 space-y-2">
            {/* Progress Bar avec glassmorphism */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              disabled={isLoading}
              className="w-full h-2 glass-input rounded-lg appearance-none cursor-pointer disabled:opacity-50"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(42, 42, 42, 0.5) ${(currentTime / duration) * 100}%, rgba(42, 42, 42, 0.5) 100%)`,
              }}
            />

            {/* Time Display avec glassmorphism */}
            <div className="flex justify-between text-sm text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Volume Control avec glassmorphism */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 glass-input rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(42, 42, 42, 0.5) ${(isMuted ? 0 : volume) * 100}%, rgba(42, 42, 42, 0.5) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Bordure animée */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
