'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Search,
  CheckCircle,
  Users,
  Star,
  Bookmark
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    industry: string;
    size: string;
    location: string;
  };
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
  level: 'Junior' | 'Mid' | 'Senior';
  location: 'Kinshasa' | 'Lubumbashi' | 'Goma' | 'Distant' | 'Hybride';
  postedAt: string;
  applicants: number;
  isUrgent: boolean;
  tags: string[];
  benefits: string[];
}

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  openPositions: number;
  rating: number;
  founded: string;
  website: string;
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Data Scientist Junior',
    company: {
      name: 'TechCorp RDC',
      logo: '/companies/techcorp.png',
      industry: 'Technologie',
      size: '50-200 employés',
      location: 'Kinshasa'
    },
    description: 'Nous recherchons un Data Scientist junior passionné par l\'IA pour rejoindre notre équipe innovation. Vous travaillerez sur des projets de Machine Learning appliqués aux données africaines.',
    requirements: [
      'Diplôme en Informatique, Mathématiques ou domaine connexe',
      'Connaissance de Python et des bibliothèques ML (Pandas, Scikit-learn)',
      'Expérience avec SQL et bases de données',
      'Intérêt pour l\'IA appliquée aux problématiques africaines'
    ],
    salary: {
      min: 800,
      max: 1500,
      currency: 'USD'
    },
    type: 'CDI',
    level: 'Junior',
    location: 'Kinshasa',
    postedAt: '2024-01-15',
    applicants: 23,
    isUrgent: false,
    tags: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    benefits: ['Assurance maladie', 'Formation continue', 'Télétravail 2j/semaine', 'Prime annuelle']
  },
  {
    id: '2',
    title: 'Ingénieur IA Senior',
    company: {
      name: 'MineTech Solutions',
      logo: '/companies/minetech.png',
      industry: 'Mining & IA',
      size: '200-500 employés',
      location: 'Lubumbashi'
    },
    description: 'Leader technique pour développer des solutions d\'IA prédictive pour l\'industrie minière congolaise. Gestion d\'équipe et architecture de solutions MLOps.',
    requirements: [
      '5+ ans d\'expérience en Machine Learning',
      'Expertise en Deep Learning et Computer Vision',
      'Leadership d\'équipe technique',
      'Expérience en déploiement MLOps'
    ],
    salary: {
      min: 2500,
      max: 4000,
      currency: 'USD'
    },
    type: 'CDI',
    level: 'Senior',
    location: 'Lubumbashi',
    postedAt: '2024-01-12',
    applicants: 8,
    isUrgent: true,
    tags: ['Deep Learning', 'MLOps', 'Leadership', 'Computer Vision'],
    benefits: ['Stock options', 'Logement fourni', 'Véhicule de fonction', 'Prime de performance']
  },
  {
    id: '3',
    title: 'Développeur NLP Freelance',
    company: {
      name: 'EduTech Africa',
      logo: '/companies/edutech.png',
      industry: 'Éducation',
      size: '20-50 employés',
      location: 'Distant'
    },
    description: 'Mission freelance pour développer un chatbot éducatif en langues locales congolaises (Lingala, Swahili) avec technologies NLP modernes.',
    requirements: [
      'Expertise en NLP et traitement du langage',
      'Expérience avec Hugging Face Transformers',
      'Connaissance des langues bantu un atout',
      'Portfolio de projets NLP'
    ],
    salary: {
      min: 50,
      max: 80,
      currency: 'USD/heure'
    },
    type: 'Freelance',
    level: 'Mid',
    location: 'Distant',
    postedAt: '2024-01-10',
    applicants: 15,
    isUrgent: false,
    tags: ['NLP', 'Transformers', 'Multilingual', 'Chatbots'],
    benefits: ['Paiement rapide', 'Projets variés', 'Flexibilité horaire']
  }
];

const sampleCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp RDC',
    logo: '/companies/techcorp.png',
    industry: 'Technologie',
    size: '50-200 employés',
    location: 'Kinshasa',
    description: 'Entreprise technologique congolaise spécialisée dans les solutions IA pour l\'Afrique.',
    openPositions: 5,
    rating: 4.2,
    founded: '2020',
    website: 'https://techcorp-rdc.com'
  },
  {
    id: '2',
    name: 'MineTech Solutions',
    logo: '/companies/minetech.png',
    industry: 'Mining & IA',
    size: '200-500 employés',
    location: 'Lubumbashi',
    description: 'Leader de l\'innovation dans l\'industrie minière avec des solutions d\'IA prédictive.',
    openPositions: 3,
    rating: 4.5,
    founded: '2018',
    website: 'https://minetech.cd'
  }
];

export default function JobMarketplace() {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [companies] = useState<Company[]>(sampleCompanies);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Tous');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [activeTab, setActiveTab] = useState<'jobs' | 'companies'>('jobs');

  const locations = ['Tous', 'Kinshasa', 'Lubumbashi', 'Goma', 'Distant', 'Hybride'];
  const types = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'];
  const levels = ['Tous', 'Junior', 'Mid', 'Senior'];

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation !== 'Tous') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    if (selectedType !== 'Tous') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    if (selectedLevel !== 'Tous') {
      filtered = filtered.filter(job => job.level === selectedLevel);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedLocation, selectedType, selectedLevel]);

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    if (salary.min === salary.max) {
      return `${salary.min} ${salary.currency}`;
    }
    return `${salary.min}-${salary.max} ${salary.currency}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Aujourd\'hui';
    if (diffInDays === 1) return 'Hier';
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-3 bg-orange-600/20 rounded-full mb-4">
          <Briefcase size={32} className="text-orange-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Marché de l&apos;Emploi IA
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Découvrez les opportunités d&apos;emploi en intelligence artificielle en RDC.
          Entreprises locales et internationales recrutent des talents IA formés localement.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-1">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'jobs'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Offres d&apos;Emploi ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'companies'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Entreprises ({companies.length})
          </button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#262626] border border-[#404040] rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des emplois..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-orange-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-orange-500"
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-orange-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'jobs' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Job Cards */}
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#262626] border border-[#404040] rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              >
                {/* Job Header */}
                <div className="p-6 border-b border-[#404040]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {job.company.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                          <Building2 size={16} />
                          <span>{job.company.name}</span>
                          <span>•</span>
                          <MapPin size={16} />
                          <span>{job.location}</span>
                          <span>•</span>
                          <Clock size={16} />
                          <span>{formatTimeAgo(job.postedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-xs font-medium">
                            {job.type}
                          </span>
                          <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs font-medium">
                            {job.level}
                          </span>
                          {job.isUrgent && (
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-medium animate-pulse">
                              Urgent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {formatSalary(job.salary)}
                      </div>
                      <div className="text-sm text-gray-400">par mois</div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Prérequis :</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.requirements.slice(0, 4).map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-1" />
                          <span className="text-sm text-gray-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Footer */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{job.applicants} candidats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>{job.company.size}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Bookmark size={16} className="inline mr-2" />
                        Sauvegarder
                      </button>
                      <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors">
                        Postuler
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#262626] border border-[#404040] rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {company.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{company.name}</h3>
                      <p className="text-gray-400 text-sm">{company.industry}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {company.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={16} />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={16} />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Briefcase size={16} />
                      <span>{company.openPositions} postes ouverts</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-white">{company.rating}</span>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Voir Offres
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-orange-500 mb-1">{jobs.length}</div>
          <div className="text-sm text-gray-400">Offres d&apos;Emploi</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-500 mb-1">{companies.length}</div>
          <div className="text-sm text-gray-400">Entreprises</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-500 mb-1">
            {jobs.reduce((acc, job) => acc + job.applicants, 0)}
          </div>
          <div className="text-sm text-gray-400">Candidatures</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-500 mb-1">
            ${Math.round(jobs.reduce((acc, job) => acc + job.salary.min, 0) / jobs.length)}k
          </div>
          <div className="text-sm text-gray-400">Salaire Moyen</div>
        </div>
      </motion.div>
    </div>
  );
}
