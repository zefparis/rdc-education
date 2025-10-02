/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
    optimizePackageImports: ['lucide-react', 'geist']
  },
  // Ignorer les fichiers système Windows dans le suivi des fichiers
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/.next',
        '**/out',
        '**/public',
        // Ignorer les fichiers système Windows
        '**/hiberfil.sys',
        '**/pagefile.sys',
        '**/swapfile.sys',
        '**/DumpStack.log.tmp',
      ],
    };
    return config;
  },
  // Configuration pour éviter les problèmes de chargement des modules
  transpilePackages: ['lucide-react', 'geist'],
  // Configuration pour les images optimisées
  images: {
    domains: ['images.unsplash.com'],
  },
  // Configuration pour les en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
