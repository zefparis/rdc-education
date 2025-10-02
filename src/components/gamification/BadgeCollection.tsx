'use client';

import { Badge as BadgeType } from '@/lib/gamification/badges';
import { Badge } from './Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Star, Zap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeCollectionProps {
  badges: BadgeType[];
  className?: string;
}

const RARITY_ORDER = {
  'legendary': 4,
  'epic': 3,
  'rare': 2,
  'uncommon': 1,
  'common': 0,
};

const CATEGORY_ICONS = {
  'achievement': <Award className="w-4 h-4" />,
  'milestone': <Flame className="w-4 h-4" />,
  'special': <Star className="w-4 h-4" />,
  'event': <Zap className="w-4 h-4" />,
};

export function BadgeCollection({ badges, className }: BadgeCollectionProps) {
  // Trier les badges par rareté (du plus rare au plus commun)
  const sortedBadges = [...badges].sort((a, b) => 
    RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name)
  );

  // Grouper les badges par catégorie
  const badgesByCategory = sortedBadges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, BadgeType[]>);

  // Toutes les catégories disponibles
  const categories = Object.keys(badgesByCategory);
  const defaultCategory = categories.length > 0 ? categories[0] : '';

  if (badges.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <Trophy className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Aucun badge obtenu</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Complétez des quiz et des défis pour débloquer des badges !</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Tabs defaultValue={defaultCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center gap-2 capitalize"
            >
              {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {badgesByCategory[category].map((badge) => (
                <div key={badge.id} className="flex flex-col items-center">
                  <Badge badge={badge} size="lg" showTooltip />
                  <span className="mt-2 text-xs font-medium text-center text-gray-700 dark:text-gray-300 line-clamp-1">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
