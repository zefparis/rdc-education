'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Star,
  Calendar,
  MapPin,
  Clock,
  Target,
  Award,
  TrendingUp,
  MessageCircle,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Computer Vision' | 'NLP' | 'Data Science' | 'Robotics' | 'Healthcare' | 'Finance';
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  maxMembers: number;
  currentMembers: number;
  technologies: string[];
  status: 'Recrutement' | 'En cours' | 'Terminé';
  deadline: string;
  location: 'Kinshasa' | 'Lubumbashi' | 'Goma' | 'Bukavu' | 'Kisangani' | 'Distant';
  createdBy: string;
  createdAt: string;
  skills: string[];
  deliverables: string[];
  rating?: number;
  participants: Array<{
    name: string;
    role: string;
    avatar: string;
    joinedAt: string;
  }>;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Système de Détection de Maladies du Caféier',
    description: 'Développer un modèle d\'IA pour détecter automatiquement les maladies des caféiers à partir d\'images, adapté aux conditions agricoles congolaises.',
    category: 'Computer Vision',
    difficulty: 'Intermédiaire',
    maxMembers: 4,
    currentMembers: 2,
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    status: 'Recrutement',
    deadline: '2024-03-15',
    location: 'Distant',
    createdBy: 'Marie Kabila',
    createdAt: '2024-01-15',
    skills: ['Computer Vision', 'Deep Learning', 'API Development'],
    deliverables: ['Modèle entraîné', 'Application web', 'Rapport technique'],
    participants: [
      { name: 'Marie Kabila', role: 'Project Lead', avatar: '/avatars/marie.jpg', joinedAt: '2024-01-15' },
      { name: 'Jean Mwamba', role: 'ML Engineer', avatar: '/avatars/jean.jpg', joinedAt: '2024-01-20' }
    ]
  },
  {
    id: '2',
    title: 'Chatbot pour l\'Éducation en Lingala',
    description: 'Créer un chatbot éducatif qui répond aux questions des étudiants en lingala et français, spécialisé dans les matières scientifiques.',
    category: 'NLP',
    difficulty: 'Avancé',
    maxMembers: 3,
    currentMembers: 3,
    technologies: ['Python', 'Transformers', 'FastAPI', 'React'],
    status: 'En cours',
    deadline: '2024-04-01',
    location: 'Kinshasa',
    createdBy: 'Pierre Lukusa',
    createdAt: '2024-01-10',
    skills: ['NLP', 'Chatbots', 'Multilingual', 'React'],
    deliverables: ['Modèle linguistique', 'Interface web', 'Tests utilisateurs'],
    rating: 4.5,
    participants: [
      { name: 'Pierre Lukusa', role: 'Project Lead', avatar: '/avatars/pierre.jpg', joinedAt: '2024-01-10' },
      { name: 'Sarah Mbala', role: 'NLP Engineer', avatar: '/avatars/sarah.jpg', joinedAt: '2024-01-12' },
      { name: 'David Kongo', role: 'Frontend Dev', avatar: '/avatars/david.jpg', joinedAt: '2024-01-15' }
    ]
  },
  {
    id: '3',
    title: 'Analyse Prédictive des Prix du Cuivre',
    description: 'Modèle de prédiction des prix du cuivre sur le marché international en utilisant des données économiques et géopolitiques.',
    category: 'Data Science',
    difficulty: 'Avancé',
    maxMembers: 5,
    currentMembers: 1,
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
    status: 'Recrutement',
    deadline: '2024-05-01',
    location: 'Lubumbashi',
    createdBy: 'Antoine Kabongo',
    createdAt: '2024-01-20',
    skills: ['Time Series', 'Feature Engineering', 'Model Deployment'],
    deliverables: ['Modèle prédictif', 'Dashboard interactif', 'API de prédiction'],
    participants: [
      { name: 'Antoine Kabongo', role: 'Project Lead', avatar: '/avatars/antoine.jpg', joinedAt: '2024-01-20' }
    ]
  }
];

export default function CollaborativeProjects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sampleProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Tous');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const categories = ['Tous', 'Computer Vision', 'NLP', 'Data Science', 'Robotics', 'Healthcare', 'Finance'];
  const difficulties = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedDifficulty !== 'Tous') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory, selectedDifficulty]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recrutement': return 'bg-green-500';
      case 'En cours': return 'bg-blue-500';
      case 'Terminé': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-400 bg-green-400/10';
      case 'Intermédiaire': return 'text-yellow-400 bg-yellow-400/10';
      case 'Avancé': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-3 bg-blue-600/20 rounded-full mb-4">
          <Users size={32} className="text-blue-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Projets Collaboratifs IA
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Travaillez avec d&apos;autres étudiants sur des projets concrets d&apos;intelligence artificielle.
          Développez vos compétences en équipe et créez des solutions innovantes pour la RDC.
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#262626] border border-[#404040] rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des projets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          {/* Create Project Button */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Créer un Projet
          </button>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#262626] border border-[#404040] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-[#404040]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></span>
                      <span className="text-sm text-gray-400">{project.status}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Participants</span>
                    <span className="text-sm text-white">{project.currentMembers}/{project.maxMembers}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.currentMembers / project.maxMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Project Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>{new Date(project.deadline).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.participants.slice(0, 3).map((participant, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-[#262626] flex items-center justify-center text-white text-xs font-bold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.currentMembers > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#262626] flex items-center justify-center text-white text-xs font-bold">
                        +{project.currentMembers - 3}
                      </div>
                    )}
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    {project.status === 'Recrutement' ? 'Rejoindre' : 'Voir Détails'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">{projects.length}</div>
          <div className="text-gray-400">Projets Actifs</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-500 mb-2">
            {projects.reduce((acc, p) => acc + p.currentMembers, 0)}
          </div>
          <div className="text-gray-400">Participants</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {projects.filter(p => p.status === 'Terminé').length}
          </div>
          <div className="text-gray-400">Projets Terminés</div>
        </div>
      </motion.div>
    </div>
  );
}
