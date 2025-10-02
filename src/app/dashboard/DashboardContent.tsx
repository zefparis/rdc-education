'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

// Composants
import { RewardNotification } from '@/components/gamification/RewardNotification';
import { Badge as BadgeType, BadgeCategory, BadgeRarity } from '@/lib/gamification/badges';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FloatingParticles from '@/components/FloatingParticles';
import { Progress } from '@/components/ui/progress';
import { modulesConfig } from '@/config/modulesConfig';

// Icônes
import { Cpu, Sparkles, BarChart2, Gamepad2, Zap, Award, Trophy, Flame, ArrowRight, Clock, BookOpen, PlayCircle, Compass } from 'lucide-react';

// ---------------- Types ----------------
type Module = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icon: string;
  progress: number;
  isCompleted: boolean;
  slug: string;
  accentIcon: React.ElementType;
};

// Mock badges
const mockBadges: Array<BadgeType & { emoji: string }> = [
  {
    id: 'beginner',
    name: 'Débutant',
    description: 'A complété le premier module',
    emoji: '🎯',
    rarity: 'common' as BadgeRarity,
    category: 'achievement' as BadgeCategory,
    condition: { type: 'module_mastered', target: 1 },
    xpReward: 100,
    icon: 'award'
  },
  {
    id: 'quiz_master',
    name: 'Maître du Quiz',
    description: 'A réussi 10 quiz',
    emoji: '🏆',
    rarity: 'rare' as BadgeRarity,
    category: 'achievement' as BadgeCategory,
    condition: { type: 'quiz_completed', target: 10 },
    xpReward: 500,
    icon: 'trophy'
  }
];

const moduleVisualStyles: Record<string, { gradient: string; accent: string; glow: string }> = {
  'data-science': {
    gradient: 'from-blue-600/15 via-cyan-500/10 to-transparent',
    accent: 'text-cyan-300',
    glow: 'from-cyan-500/40 via-blue-500/20 to-transparent'
  },
  'deep-learning': {
    gradient: 'from-purple-600/15 via-pink-500/15 to-transparent',
    accent: 'text-pink-300',
    glow: 'from-purple-500/40 via-pink-500/20 to-transparent'
  },
  'ia-generative': {
    gradient: 'from-orange-500/15 via-red-500/10 to-transparent',
    accent: 'text-orange-300',
    glow: 'from-orange-500/40 via-rose-500/20 to-transparent'
  },
  mlops: {
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    accent: 'text-emerald-300',
    glow: 'from-emerald-500/40 via-teal-500/20 to-transparent'
  },
  nlp: {
    gradient: 'from-indigo-500/15 via-blue-500/10 to-transparent',
    accent: 'text-indigo-300',
    glow: 'from-indigo-500/40 via-blue-500/20 to-transparent'
  },
  'ml-fondamental': {
    gradient: 'from-amber-500/15 via-yellow-500/10 to-transparent',
    accent: 'text-amber-300',
    glow: 'from-amber-500/40 via-orange-500/20 to-transparent'
  }
};

const defaultModuleVisual = {
  gradient: 'from-slate-600/15 via-slate-500/10 to-transparent',
  accent: 'text-blue-300',
  glow: 'from-blue-500/30 via-purple-500/20 to-transparent'
};
// ---------------- Animations ----------------
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// ---------------- Composants ----------------
const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'blue'
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color?: 'blue' | 'purple' | 'emerald' | 'amber';
}) => {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/20 border-blue-500/20 text-blue-100',
    purple: 'from-purple-500/10 to-purple-600/20 border-purple-500/20 text-purple-100',
    emerald: 'from-emerald-500/10 to-emerald-600/20 border-emerald-500/20 text-emerald-100',
    amber: 'from-amber-500/10 to-amber-600/20 border-amber-500/20 text-amber-100'
  };

  const iconColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400'
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 border ${iconColors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};
// ---- Mini Jeu Flash Vrai/Faux ----
const FlashQuiz = () => {
  const questions = [
    { id: 1, text: "L&apos;apprentissage supervisé utilise des données étiquetées (labelisées).", answer: true },
    { id: 2, text: "Un réseau de neurones convolutif est utilisé principalement pour le NLP.", answer: false },
    { id: 3, text: "Le surapprentissage (overfitting) signifie que le modèle généralise bien.", answer: false },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value: boolean) => {
    if (questions[current].answer === value) {
      setScore(prev => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
      {!finished ? (
        <>
          <h3 className="text-xl font-bold text-white mb-4">
            Question {current + 1}/{questions.length}
          </h3>
          <p className="text-gray-200 mb-6">{questions[current].text}</p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => handleAnswer(true)} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            >
              ✅ Vrai
            </Button>
            <Button 
              onClick={() => handleAnswer(false)} 
              className="bg-red-600 hover:bg-red-700 text-white px-6"
            >
              ❌ Faux
            </Button>
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">🎉 Quiz terminé !</h3>
          <p className="text-gray-300 mb-6">Votre score : {score}/{questions.length}</p>
          <Button 
            onClick={() => { setScore(0); setCurrent(0); setFinished(false); }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Rejouer 🔄
          </Button>
        </div>
      )}
    </div>
  );
};
// ---- Mini Jeu Memory IA ----
const MemoryGame = () => {
  const items = [
    { id: 1, text: "🤖 IA", pair: "AI" },
    { id: 2, text: "AI", pair: "🤖 IA" },
    { id: 3, text: "📊 Données", pair: "DATA" },
    { id: 4, text: "DATA", pair: "📊 Données" },
    { id: 5, text: "🧠 Deep", pair: "DL" },
    { id: 6, text: "DL", pair: "🧠 Deep" },
  ];

  const shuffled = [...items].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(shuffled);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      setMoves(m => m + 1);
      const first = cards[flipped[0]];
      const second = cards[index];

      if (first.pair === second.text || second.pair === first.text) {
        setMatched([...matched, flipped[0], index]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
      <h3 className="text-xl font-bold text-white mb-4">🧩 Memory IA</h3>
      <p className="text-gray-300 text-sm mb-4">Trouve les paires (concept ↔ icône)</p>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleFlip(idx)}
            className={`h-20 flex items-center justify-center rounded-lg cursor-pointer text-lg font-bold transition 
              ${flipped.includes(idx) || matched.includes(idx) 
                ? "bg-purple-600/30 text-white border border-purple-400" 
                : "bg-gray-800/50 text-gray-500 border border-gray-700"}`}
          >
            {flipped.includes(idx) || matched.includes(idx) ? card.text : "❓"}
          </div>
        ))}
      </div>
      <p className="text-gray-400 mt-4">Coups joués : {moves}</p>
      {matched.length === cards.length && (
        <div className="mt-4 text-green-400 font-bold">🎉 Bravo, toutes les paires trouvées !</div>
      )}
    </div>
  );
};

// ---------------- Dashboard ----------------
function DashboardContent() {
  const [badges, setBadges] = useState<Array<BadgeType & { emoji: string }>>(mockBadges);
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const [streak, setStreak] = useState({ current: 0, lastActive: '' });
  const [isClient, setIsClient] = useState(false);

  // Charger les données
  useEffect(() => {
    setIsClient(true);

    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit !== today) {
      localStorage.setItem('lastVisit', today);
      setStreak(prev => ({
        current: prev.current + 1,
        lastActive: new Date().toISOString()
      }));
    }

    const modules = modulesConfig.map(module => {
      let accentIcon: React.ElementType = Sparkles;
      if (module.slug.includes('deep-learning')) {
        accentIcon = Cpu;
      } else if (module.slug.includes('data')) {
        accentIcon = BarChart2;
      } else if (module.slug.includes('mlops')) {
        accentIcon = Gamepad2;
      }

      const progress = parseInt(localStorage.getItem(`module-${module.slug}-progress`) || '0', 10);

      return {
        ...module,
        id: module.slug,
        progress,
        isCompleted: progress >= 100,
        accentIcon
      };
    });

    setModulesData(modules);
  }, []);
  if (!isClient) return null;

  const stats = {
    totalPoints: badges.length * 10,
    quizzesCompleted: 12,
    modulesCompleted: modulesData.filter(m => m.isCompleted).length,
    currentStreak: streak.current
  };

  const quickActions = [
    {
      title: 'Parcourir les modules',
      description: 'Reprenez votre parcours de formation en un clic.',
      href: '#modules-progress',
      icon: BookOpen,
      glow: 'from-blue-500/40 via-purple-500/30 to-transparent'
    },
    {
      title: 'Lancer un quiz',
      description: 'Mesurez vos connaissances avec nos mini-jeux IA.',
      href: '/quiz/true-false',
      icon: PlayCircle,
      glow: 'from-emerald-500/40 via-teal-500/20 to-transparent'
    },
    {
      title: 'Documentation & ressources',
      description: 'Téléchargez les supports PDF et notebooks associés.',
      href: '/modules/deep-learning',
      icon: Compass,
      glow: 'from-amber-500/40 via-orange-500/20 to-transparent'
    }
  ] as const;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 -z-10">
        <FloatingParticles />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text mb-4">
            Tableau de bord
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Suivez votre progression et vos réalisations
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Points totaux" value={stats.totalPoints} icon={Zap} color="amber" />
          <StatCard title="Quiz complétés" value={stats.quizzesCompleted} icon={Award} color="blue" />
          <StatCard title="Modules terminés" value={stats.modulesCompleted} icon={Trophy} color="purple" />
          <StatCard title="Série actuelle" value={stats.currentStreak} icon={Flame} color="emerald" />
        </motion.div>

        {/* Actions rapides */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 grid gap-4 md:grid-cols-3"
        >
          {quickActions.map(action => {
            const ActionIcon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10"
              >
                <span className={`pointer-events-none absolute -top-10 right-0 h-36 w-36 bg-gradient-to-br ${action.glow} opacity-0 transition duration-500 group-hover:opacity-100 blur-3xl`} />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <ActionIcon size={24} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{action.title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{action.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-300 group-hover:text-white">
                      Découvrir
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
          <Tabs defaultValue="overview">
            <TabsList className="w-full flex p-1 bg-gray-900/50 border-b border-white/5 rounded-t-2xl">
              <TabsTrigger value="overview" className="flex-1 py-4 rounded-xl data-[state=active]:bg-gradient-to-r from-blue-500/20 to-purple-500/20 data-[state=active]:text-white transition">
                <BarChart2 className="w-5 h-5 mr-2" /> Aperçu
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 py-4 rounded-xl data-[state=active]:bg-gradient-to-r from-amber-500/20 to-yellow-500/20 data-[state=active]:text-white transition">
                <Trophy className="w-5 h-5 mr-2" /> Badges
              </TabsTrigger>
            </TabsList>

            {/* Aperçu */}
            <TabsContent value="overview" className="p-6">
              {/* Progression modules */}
              <h2 id="modules-progress" className="text-2xl font-bold text-white mb-4 flex items-center">
                <BarChart2 className="mr-2 text-blue-400" /> Progression
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {modulesData.map((module) => {
                  const AccentIcon = module.accentIcon;
                  const visuals = moduleVisualStyles[module.slug] ?? defaultModuleVisual;

                  return (
                    <motion.div
                      key={module.id}
                      variants={fadeInUp}
                      whileHover={{ y: -6 }}
                      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${visuals.gradient} p-6 transition duration-300 hover:border-white/30 hover:shadow-xl hover:shadow-blue-500/20`}
                    >
                      <div className="relative">
                        <span className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${visuals.glow} opacity-0 transition duration-500 group-hover:opacity-80`} />
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 text-2xl backdrop-blur">
                              {module.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                {module.title}
                                {module.isCompleted && (
                                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                                    Terminé
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-200/80 line-clamp-2">
                                {module.description}
                              </p>
                              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-200/70">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 backdrop-blur">
                                  <Clock size={12} /> {module.duration}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 backdrop-blur">
                                  <BarChart2 size={12} /> {module.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <AccentIcon className={`hidden md:block opacity-30 transition duration-300 group-hover:-translate-y-1 group-hover:opacity-80 ${visuals.accent}`} size={32} />
                        </div>

                        <div className="mt-5">
                          <div className="flex items-center justify-between text-xs text-gray-200/70">
                            <span>Progression</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="mt-2 h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500" />
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                          <Link
                            href={`/modules/${module.slug}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-purple-500"
                          >
                            Continuer
                            <ArrowRight size={16} />
                          </Link>
                          <Link
                            href={`/modules/${module.slug}`}
                            className="text-sm font-medium text-blue-200/90 hover:text-white"
                          >
                            Voir le module
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.length > 0 ? badges.map(b => (
                <div key={b.id} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10">
                  <div className="text-3xl">{b.emoji}</div>
                  <h4 className="text-white">{b.name}</h4>
                  <p className="text-xs text-gray-400">{b.description}</p>
                </div>
              )) : <p className="col-span-full text-center text-gray-400">Aucun badge obtenu</p>}
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16">
  <h2 className="text-2xl font-bold text-white flex items-center mb-6">
    <Gamepad2 className="mr-2 text-purple-400" /> Jeux éducatifs
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <FlashQuiz />
</div>

</motion.div>



        <RewardNotification />
      </div>
    </div>
  );
}

export default DashboardContent;
