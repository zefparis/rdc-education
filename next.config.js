/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver le cache de build pour éviter les problèmes de chargement des styles
  experimental: {
    serverActions: true,
    optimizePackageImports: ['lucide-react'],
  },
  // Ignorer les fichiers système Windows dans le suivi des fichiers
  webpack: (config, { isServer }) => {
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
  transpilePackages: ['lucide-react'],
  // Désactiver le cache de build
  cache: false,
};

module.exports = nextConfig;
