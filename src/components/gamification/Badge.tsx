// src/components/gamification/Badge.tsx
'use client';

import { Badge as BadgeType } from '@/lib/gamification/badges';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Star, Trophy, Zap, Award, Flame, CheckCircle } from 'lucide-react';

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
  showLabel?: boolean;
  animateOnHover?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl',
};

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  flame: Flame,
  check: CheckCircle,
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200 border-gray-200 dark:border-gray-600',
  uncommon: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  legendary: 'bg-gradient-to-br from-amber-200 to-yellow-300 text-amber-900 border-amber-300 dark:from-amber-600/30 dark:to-yellow-700/30 dark:text-amber-200 dark:border-amber-600/50',
};

const rarityGradients = {
  common: 'from-gray-200 to-gray-300',
  uncommon: 'from-green-200 to-emerald-300',
  rare: 'from-blue-200 to-cyan-300',
  epic: 'from-purple-200 to-fuchsia-300',
  legendary: 'from-amber-200 via-yellow-300 to-orange-300',
};

export function Badge({ 
  badge, 
  size = 'md', 
  showTooltip = true,
  showLabel = false,
  animateOnHover = true,
  className,
}: BadgeProps) {
  const Icon = iconMap[badge.icon as keyof typeof iconMap] || Trophy;
  const isLegendary = badge.rarity === 'legendary';
  
  const content = (
    <div className={cn(
      'relative flex flex-col items-center justify-center',
      showLabel ? 'space-y-2' : ''
    )}>
      <div 
        className={cn(
          'relative rounded-full flex items-center justify-center shadow-sm border-2',
          'transition-all duration-300',
          animateOnHover && 'hover:scale-105 hover:shadow-md',
          isLegendary && 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          sizeClasses[size],
          rarityColors[badge.rarity],
          className
        )}
      >
        {isLegendary && (
          <div className={cn(
            'absolute inset-0 rounded-full opacity-30',
            'animate-pulse',
            'bg-gradient-to-r',
            rarityGradients[badge.rarity]
          )} />
        )}
        <div className="relative z-10">
          {badge.icon && badge.icon in iconMap ? (
            <Icon className={cn(
              size === 'sm' ? 'w-4 h-4' : 
              size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
            )} />
          ) : (
            <span>🏆</span>
          )}
        </div>
      </div>
      
      {showLabel && (
        <div className="text-center">
          <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">
            {badge.name}
          </p>
          {badge.earnedAt && (
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              {new Date(badge.earnedAt).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (!showTooltip) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-semibold">{badge.name}</p>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
            {badge.unlockedAt && (
              <p className="text-xs mt-1 text-gray-500">
                Débloqué le {new Date(badge.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}