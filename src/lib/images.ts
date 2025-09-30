/**
 * Utilitaires pour la gestion des images
 */

export interface ImageTheme {
  name: string;
  path: string;
  count: number;
}

export const IMAGE_THEMES: Record<string, ImageTheme> = {
  education: {
    name: 'Éducation',
    path: '/images/education',
    count: 5,
  },
  ai: {
    name: 'Intelligence Artificielle',
    path: '/images/ai',
    count: 5,
  },
  students: {
    name: 'Étudiants',
    path: '/images/students',
    count: 5,
  },
  africa: {
    name: 'Afrique',
    path: '/images/africa',
    count: 5,
  },
  'data-science': {
    name: 'Data Science',
    path: '/images/data-science',
    count: 5,
  },
  'deep-learning': {
    name: 'Deep Learning',
    path: '/images/deep-learning',
    count: 5,
  },
};

/**
 * Récupère le chemin d'une image pour un thème donné
 */
export function getImagePath(theme: string, index: number = 1): string {
  const themeData = IMAGE_THEMES[theme];
  if (!themeData) {
    return '/images/placeholder.jpg';
  }
  return `${themeData.path}/${theme}_${index}.jpg`;
}

/**
 * Récupère une image aléatoire pour un thème
 */
export function getRandomImage(theme: string): string {
  const themeData = IMAGE_THEMES[theme];
  if (!themeData) {
    return '/images/placeholder.jpg';
  }
  const randomIndex = Math.floor(Math.random() * themeData.count) + 1;
  return `${themeData.path}/${theme}_${randomIndex}.jpg`;
}

/**
 * Récupère toutes les images d'un thème
 */
export function getAllImagesForTheme(theme: string): string[] {
  const themeData = IMAGE_THEMES[theme];
  if (!themeData) {
    return [];
  }
  return Array.from({ length: themeData.count }, (_, i) => 
    `${themeData.path}/${theme}_${i + 1}.jpg`
  );
}

/**
 * Récupère toutes les images de tous les thèmes
 */
export function getAllImages(): Array<{ theme: string; path: string; name: string }> {
  const allImages: Array<{ theme: string; path: string; name: string }> = [];
  
  Object.entries(IMAGE_THEMES).forEach(([themeKey, themeData]) => {
    for (let i = 1; i <= themeData.count; i++) {
      allImages.push({
        theme: themeData.name,
        path: `${themeData.path}/${themeKey}_${i}.jpg`,
        name: `${themeData.name} ${i}`,
      });
    }
  });
  
  return allImages;
}

/**
 * Mapping des modules vers les thèmes d'images
 */
export const MODULE_IMAGE_MAPPING: Record<string, string> = {
  'data-science': 'data-science',
  'deep-learning': 'deep-learning',
  'generative-ai': 'ai',
  'mlops': 'ai',
  'computer-vision': 'ai',
  'nlp': 'ai',
};
