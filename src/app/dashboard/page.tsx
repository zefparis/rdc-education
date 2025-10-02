'use client';

import dynamic from 'next/dynamic';

// Importer dynamiquement le composant avec le rendu côté client uniquement
const DashboardContent = dynamic(() => import('./DashboardContent'), { 
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      </div>
    </div>
  )
});

export default function DashboardPage() {
  return <DashboardContent />;
}
