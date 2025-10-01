'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Limiter le nombre de particules sur mobile pour les performances
    const maxParticles = dimensions.width < 768 ? 20 : 50;
    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 15000), maxParticles);
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    setParticles(newParticles);

    // Animation plus lente sur mobile
    const animationSpeed = dimensions.width < 768 ? 100 : 50;
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + dimensions.width) % dimensions.width,
          y: (particle.y + particle.speedY + dimensions.height) % dimensions.height,
        }))
      );
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Image for Particles */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/how-it-works-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.3
        }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(96, 165, 250, ${particle.opacity}), rgba(16, 185, 129, ${particle.opacity * 0.5}), transparent)`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            zIndex: 1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
