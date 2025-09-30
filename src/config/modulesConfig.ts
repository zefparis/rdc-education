/**
 * Configuration centralisée des modules pédagogiques
 * Plateforme IA-Solution RDC
 */

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icon: string;
  color: string;
  image: string;
  pdf: string;
  notebook: string;
  audio: string;
  colabUrl?: string;
  objectives: string[];
  topics: string[];
}

export const modulesConfig: Module[] = [
  {
    id: '1',
    slug: 'data-science',
    title: 'Data Science',
    description: 'Découvrez les fondamentaux de la Data Science : Python, Pandas, visualisation et statistiques pour analyser vos données.',
    duration: '6 semaines',
    level: 'Débutant',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    image: '/images/data-science.jpg',
    pdf: '/modules/data-science/README.md',
    notebook: '/modules/data-science/module_data-science.ipynb',
    audio: '/audio/module_data-science.mp3',
    objectives: [
      'Maîtriser Python pour la Data Science',
      'Manipuler des données avec Pandas',
      'Créer des visualisations avec Matplotlib et Seaborn',
      'Comprendre les statistiques descriptives'
    ],
    topics: [
      'Python de base',
      'Pandas et DataFrames',
      'Visualisation de données',
      'Statistiques descriptives',
      'Analyse exploratoire'
    ]
  },
  {
    id: '2',
    slug: 'deep-learning',
    title: 'Deep Learning',
    description: 'Plongez dans les réseaux de neurones profonds avec TensorFlow et PyTorch pour créer des modèles d\'IA puissants.',
    duration: '10 semaines',
    level: 'Intermédiaire',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
    image: '/images/deep-learning.jpg',
    pdf: '/modules/deep-learning/deep-learning-cours-partie1.md',
    notebook: '/modules/deep-learning/module-deep-learning-complet.ipynb',
    audio: '/audio/module_deep-learning.mp3',
    objectives: [
      'Comprendre les réseaux de neurones',
      'Maîtriser TensorFlow et PyTorch',
      'Entraîner des modèles de Deep Learning',
      'Éviter le surapprentissage'
    ],
    topics: [
      'Réseaux de neurones artificiels',
      'Backpropagation',
      'TensorFlow et Keras',
      'PyTorch',
      'Régularisation (Dropout, Early Stopping)',
      'Projet : Classification de fruits'
    ]
  },
  {
    id: '3',
    slug: 'ia-generative',
    title: 'IA Générative',
    description: 'Créez du contenu avec l\'IA : texte (GPT), images (DALL·E), audio (TTS) pour des applications innovantes.',
    duration: '6 semaines',
    level: 'Intermédiaire',
    icon: '🎨',
    color: 'from-orange-500 to-red-500',
    image: '/images/ia-generative.jpg',
    pdf: '/modules/ia-generative/ia-generative-cours.md',
    notebook: '/modules/ia-generative/module-ia-generative-complet.ipynb',
    audio: '/audio/module_ia-generative.mp3',
    objectives: [
      'Générer du texte avec GPT',
      'Créer des images avec DALL·E',
      'Produire de l\'audio avec TTS',
      'Combiner plusieurs modalités'
    ],
    topics: [
      'Génération de texte (GPT)',
      'Génération d\'images (DALL·E)',
      'Génération audio (TTS)',
      'Applications multimodales',
      'Projet : Générateur d\'affiches éducatives'
    ]
  },
  {
    id: '4',
    slug: 'mlops',
    title: 'MLOps',
    description: 'Déployez vos modèles en production avec Docker, MLflow et FastAPI pour des systèmes ML fiables et scalables.',
    duration: '7 semaines',
    level: 'Avancé',
    icon: '🚀',
    color: 'from-green-500 to-teal-500',
    image: '/images/mlops.jpg',
    pdf: '/modules/mlops/mlops-cours.md',
    notebook: '/modules/mlops/module-mlops-complet.ipynb',
    audio: '/audio/module_mlops.mp3',
    objectives: [
      'Gérer le cycle de vie d\'un modèle ML',
      'Containeriser avec Docker',
      'Suivre les expérimentations avec MLflow',
      'Déployer des APIs avec FastAPI'
    ],
    topics: [
      'Cycle de vie ML',
      'Git et versioning',
      'Docker et containerisation',
      'MLflow pour tracking',
      'FastAPI pour déploiement',
      'Monitoring en production'
    ]
  },
  {
    id: '5',
    slug: 'nlp',
    title: 'NLP',
    description: 'Traitez le langage naturel : analyse de texte, chatbots, traduction avec NLTK, SpaCy et Transformers.',
    duration: '6 semaines',
    level: 'Intermédiaire',
    icon: '💬',
    color: 'from-indigo-500 to-blue-500',
    image: '/images/nlp.jpg',
    pdf: '/modules/nlp/nlp-cours.md',
    notebook: '/modules/nlp/module-nlp-complet.ipynb',
    audio: '/audio/module_nlp.mp3',
    objectives: [
      'Prétraiter des textes',
      'Utiliser word embeddings',
      'Appliquer des Transformers (BERT, GPT)',
      'Créer des chatbots'
    ],
    topics: [
      'Prétraitement de texte',
      'Vectorisation (TF-IDF)',
      'Word Embeddings',
      'Transformers (BERT, GPT)',
      'Projet : Chatbot éducatif'
    ]
  },
  {
    id: '6',
    slug: 'ml-fondamental',
    title: 'Machine Learning Fondamental',
    description: 'Apprenez les algorithmes ML essentiels : régression, classification, clustering pour résoudre des problèmes concrets.',
    duration: '6 semaines',
    level: 'Débutant',
    icon: '🤖',
    color: 'from-yellow-500 to-orange-500',
    image: '/images/ml-fondamental.jpg',
    pdf: '/modules/ml-fondamental/ml-fondamental-cours.md',
    notebook: '/modules/ml-fondamental/module_ml-fondamental.ipynb',
    audio: '/audio/module_ml-fondamental.mp3',
    objectives: [
      'Comprendre le Machine Learning',
      'Maîtriser les algorithmes fondamentaux',
      'Entraîner et valider des modèles',
      'Appliquer le ML à des cas RDC'
    ],
    topics: [
      'Régression linéaire',
      'Régression logistique',
      'k-Nearest Neighbors',
      'Arbres de décision',
      'Clustering (k-Means)',
      'Train/Test split et validation'
    ]
  }
];

/**
 * Récupère un module par son slug
 */
export function getModuleBySlug(slug: string): Module | undefined {
  return modulesConfig.find(module => module.slug === slug);
}

/**
 * Récupère un module par son ID
 */
export function getModuleById(id: string): Module | undefined {
  return modulesConfig.find(module => module.id === id);
}

/**
 * Récupère tous les slugs des modules (pour generateStaticParams)
 */
export function getAllModuleSlugs(): string[] {
  return modulesConfig.map(module => module.slug);
}

/**
 * Génère l'URL Google Colab pour un notebook
 */
export function getColabUrl(notebookPath: string): string {
  const baseUrl = 'https://colab.research.google.com/github';
  const repo = 'ia-solution-rdc/platform';
  const branch = 'main';
  const path = notebookPath.replace('/modules/', 'public/modules/');
  
  return `${baseUrl}/${repo}/blob/${branch}/${path}`;
}
