import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";

export const metadata: Metadata = {
  title: "Ia-Solution RDC - Apprendre l'IA en République Démocratique du Congo",
  description: "Plateforme éducative en Intelligence Artificielle pour les étudiants de la RDC. Filiale de Ia-Solution France.",
  keywords: "IA, Intelligence Artificielle, RDC, éducation, apprentissage, Congo, Kinshasa",
  authors: [{ name: "Ia-Solution RDC" }],
  creator: "Ia-Solution RDC",
  publisher: "Ia-Solution RDC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ia-solution-rdc.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ia-Solution RDC - Plateforme IA pour la RDC",
    description: "Apprenez l'Intelligence Artificielle avec les meilleurs cours et projets pratiques",
    url: 'https://ia-solution-rdc.com',
    siteName: 'Ia-Solution RDC',
    locale: 'fr_CD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ia-Solution RDC - Plateforme IA pour la RDC",
    description: "Apprenez l'Intelligence Artificielle avec les meilleurs cours et projets pratiques",
    creator: '@iasolutionrdc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  );
}
