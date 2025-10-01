'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UserPlus,
  BookOpen,
  Play,
  Video,
  CheckCircle,
  Rocket,
  Code,
  Cpu,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
} from 'lucide-react';

export default function HowItWorksPage() {
  // Étapes d'utilisation de la plateforme
  const steps = [
    {
      number: 1,
      icon: <UserPlus size={32} />,
      title: 'Inscription / Création de compte',
      description: 'Créez votre compte gratuitement en quelques secondes. Aucune carte bancaire requise pour commencer.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      icon: <BookOpen size={32} />,
      title: 'Choix d\'un module de formation',
      description: 'Explorez nos 6 modules adaptés à tous les niveaux : Data Science, Deep Learning, IA Générative, MLOps, NLP et ML Fondamental.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      icon: <Play size={32} />,
      title: 'Lancer les notebooks dans Google Colab',
      description: 'Cliquez sur "Ouvrir dans Colab" pour accéder à un environnement Python gratuit avec GPU. Pas d\'installation nécessaire !',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      number: 4,
      icon: <Video size={32} />,
      title: 'Suivre les supports pédagogiques',
      description: 'Écoutez les voix-off explicatives, téléchargez les PDF de cours et regardez les démonstrations pratiques.',
      color: 'from-orange-500 to-red-500',
    },
    {
      number: 5,
      icon: <CheckCircle size={32} />,
      title: 'Valider vos acquis',
      description: 'Pratiquez avec des exercices concrets adaptés aux réalités de la RDC. Construisez votre portfolio de projets IA.',
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  // Avantages de Google Colab
  const colabFeatures = [
    {
      icon: <Zap size={24} />,
      title: 'Gratuit et Accessible',
      description: 'Pas besoin d\'ordinateur puissant. Tout fonctionne dans votre navigateur.',
    },
    {
      icon: <Cpu size={24} />,
      title: 'GPU Gratuit',
      description: 'Accès à des processeurs graphiques pour accélérer vos calculs d\'IA.',
    },
    {
      icon: <Code size={24} />,
      title: 'Python Préinstallé',
      description: 'Toutes les bibliothèques IA (TensorFlow, PyTorch, Pandas) déjà installées.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Collaboration Facile',
      description: 'Partagez vos notebooks avec vos camarades et enseignants.',
    },
  ];

  // Compétences acquises
  const skills = [
    'Python pour la Data Science',
    'Machine Learning & Deep Learning',
    'Traitement du Langage Naturel (NLP)',
    'IA Générative (GPT, DALL-E)',
    'Déploiement de modèles (MLOps)',
    'Analyse et visualisation de données',
  ];

  // Débouchés professionnels
  const careers = [
    {
      icon: <Briefcase size={24} />,
      title: 'Data Scientist',
      description: 'Analyser des données pour prendre des décisions stratégiques.',
      salary: '800-2000 USD/mois',
    },
    {
      icon: <Code size={24} />,
      title: 'Développeur IA',
      description: 'Créer des applications intelligentes et des chatbots.',
      salary: '700-1800 USD/mois',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Ingénieur MLOps',
      description: 'Déployer et maintenir des modèles IA en production.',
      salary: '900-2200 USD/mois',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Consultant IA',
      description: 'Conseiller les entreprises sur leurs projets d\'intelligence artificielle.',
      salary: '1000-2500 USD/mois',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/how-it-works-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="fixed inset-0 z-0 bg-black/60" />
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="p-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full">
                <Sparkles size={48} className="text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Comment ça marche ?
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
              Apprendre l&apos;IA n&apos;a jamais été aussi accessible
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Découvrez comment Ia-Solution RDC vous accompagne pas à pas dans votre apprentissage de l&apos;intelligence artificielle, de l&apos;inscription jusqu&apos;à votre premier emploi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Étapes d'utilisation - Timeline */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-[#262626]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              5 Étapes pour Devenir Expert en IA
            </h2>
            <p className="text-gray-400 text-lg">
              Un parcours simple et structuré pour maîtriser l&apos;intelligence artificielle
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Numéro et icône */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <div className="text-white">{step.icon}</div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Ligne de connexion */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-20 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Google Colab */}
      <section className="relative z-10 py-20 bg-[#262626]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block p-3 bg-emerald-600/20 rounded-full mb-4">
              <Rocket size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi Google Colab ?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Un environnement de développement gratuit et puissant, accessible depuis n&apos;importe quel navigateur
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {colabFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-4">
                  <div className="text-emerald-500">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Explication détaillée */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border border-emerald-500/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              🤔 Qu&apos;est-ce que Google Colab ?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Google Colaboratory (Colab) est un service cloud gratuit qui vous permet d&apos;écrire et d&apos;exécuter du code Python directement dans votre navigateur. C&apos;est l&apos;outil parfait pour apprendre l&apos;IA car :
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                <span><strong>Aucune installation requise</strong> - Tout fonctionne dans votre navigateur web</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                <span><strong>Accès gratuit au GPU</strong> - Entraînez vos modèles IA rapidement sans ordinateur puissant</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                <span><strong>Bibliothèques préinstallées</strong> - TensorFlow, PyTorch, Pandas déjà configurés</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                <span><strong>Sauvegarde automatique</strong> - Vos notebooks sont stockés sur Google Drive</span>
              </li>
            </ul>
            <Link
              href="/modules/data-science"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Voir un exemple de notebook
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Valeur des formations */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-3 bg-blue-600/20 rounded-full mb-4">
              <Target size={40} className="text-blue-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce que vous allez apprendre
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des compétences recherchées par les entreprises du monde entier
            </p>
          </motion.div>

          {/* Compétences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-[#262626] border border-[#404040] rounded-lg p-4 hover:border-blue-500/50 transition-colors"
              >
                <CheckCircle size={24} className="text-blue-500 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>

          {/* Débouchés professionnels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              💼 Débouchés Professionnels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careers.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <div className="text-blue-500">{career.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {career.title}
                      </h4>
                      <p className="text-gray-400 mb-3">
                        {career.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/20 rounded-full">
                        <TrendingUp size={16} className="text-emerald-500" />
                        <span className="text-emerald-400 text-sm font-semibold">
                          {career.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Crédibilité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-xl p-8 text-center"
          >
            <Award size={48} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Une Formation de Qualité Internationale
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Ia-Solution RDC est une <strong className="text-orange-400">filiale de Ia-Solution France</strong>, 
              une entreprise reconnue dans la formation en intelligence artificielle. Nos contenus sont créés 
              par des experts et adaptés aux réalités du marché congolais et africain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à commencer votre aventure en IA ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez des milliers d&apos;étudiants congolais qui se forment à l&apos;intelligence artificielle
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/50"
            >
              <Rocket size={24} />
              🚀 Commencer ma formation
              <ArrowRight size={24} />
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              Gratuit • Sans engagement • Accès immédiat
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
