'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';

// Configuration des polices
const geistSans = {
  style: {
    fontFamily: 'var(--font-geist-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif)'
  }
};

const geistMono = {
  style: {
    fontFamily: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)'
  }
};

// Chargement dynamique des composants côté client
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
// Composant commenté car non utilisé pour le moment
// const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), { ssr: false });

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Si on est en cours de montage côté client, on attend que le composant soit monté
  if (!mounted) {
    return (
      <html lang="fr" className="dark">
        <body className="bg-[#0a0a0a] text-white font-sans antialiased min-h-screen" />
      </html>
    );
  }

  return (
    <html lang="fr" className="dark" data-scroll-behavior="smooth">
      <Head>
        <style jsx global>{`
          :root {
            --font-geist-sans: ${geistSans.style.fontFamily};
            --font-geist-mono: ${geistMono.style.fontFamily};
          }
          
          body {
            background-color: #0a0a0a;
            color: white;
            font-family: var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            min-height: 100vh;
          }
        `}</style>
      </Head>
      <body className="text-white font-sans antialiased min-h-screen">
        {/* Dark Overlay for readability */}
        <div className="fixed inset-0 z-0 bg-black/70" />

        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
