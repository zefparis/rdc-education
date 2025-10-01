'use client';

import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';

// Chargement dynamique des composants côté client
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), { ssr: false });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="fr" className="dark">
        <body className="bg-gray-900 min-h-screen" />
      </html>
    );
  }

  return (
    <html lang="fr" className="dark" data-scroll-behavior="smooth">
      <head>
        <style>
          {`
            :root {
              --font-geist-sans: ${geistSans.style.fontFamily};
              --font-geist-mono: ${geistMono.style.fontFamily};
            }
          `}
        </style>
      </head>
      <body className="antialiased bg-gray-900 text-white min-h-screen">
        {/* Dark Overlay for readability */}
        <div className="fixed inset-0 z-0 bg-black/60" />

        <FloatingParticles />
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
