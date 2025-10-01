'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, FileCode, Copy, Play, Cpu, Sparkles } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Aller sur Google Colab',
    description: 'Ouvrez Google Colab en cliquant sur le bouton "🚀 Ouvrir dans Google Colab". C\'est un environnement gratuit qui vous permet d\'exécuter du code Python directement dans votre navigateur.',
    icon: <div className="text-4xl">🚀</div>,
  },
  {
    id: 2,
    title: 'Créer un Nouveau Notebook',
    description: 'Une fois sur Colab, le notebook s\'ouvrira automatiquement. Vous verrez des cellules de code prêtes à être exécutées. Pas besoin de créer un nouveau fichier !',
    icon: <FileCode size={48} className="text-blue-500" />,
  },
  {
    id: 3,
    title: 'Copier-coller le code (optionnel)',
    description: 'Si vous avez téléchargé le notebook, vous pouvez copier-coller le code dans Colab. Sinon, le notebook Colab contient déjà tout le code nécessaire.',
    icon: <Copy size={48} className="text-purple-500" />,
  },
  {
    id: 4,
    title: 'Exécuter chaque cellule',
    description: 'Cliquez sur le bouton ▶️ (Play) à gauche de chaque cellule pour l\'exécuter. Attendez que chaque cellule termine avant de passer à la suivante. Un ✓ vert apparaîtra quand c\'est terminé.',
    icon: <Play size={48} className="text-emerald-500" />,
  },
  {
    id: 5,
    title: 'Vérifier l\'environnement Python',
    description: 'Google Colab utilise Python 3 et offre un GPU gratuit ! Pour activer le GPU : Menu > Exécution > Modifier le type d\'exécution > GPU. Cela accélérera vos calculs d\'IA.',
    icon: <Cpu size={48} className="text-orange-500" />,
  },
  {
    id: 6,
    title: 'Interagir avec l\'application 🎉',
    description: 'Une fois toutes les cellules exécutées, vous pouvez modifier le code, expérimenter et apprendre ! N\'ayez pas peur de faire des erreurs, c\'est en pratiquant qu\'on apprend.',
    icon: <Sparkles size={48} className="text-yellow-500" />,
  },
];

interface JupyterTutorialProps {
  onClose?: () => void;
}

export default function JupyterTutorial({ onClose }: JupyterTutorialProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Vérifier si le tutoriel a déjà été vu
    const tutorialSeen = localStorage.getItem('jupyterTutorialSeen');
    if (!tutorialSeen) {
      // Attendre 1 seconde avant d'afficher le tutoriel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('jupyterTutorialSeen', 'true');
    if (onClose) onClose();
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    handleClose();
  };

  const openTutorial = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const currentStepData = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <>
      {/* Bouton pour rouvrir le tutoriel */}
      <button
        onClick={openTutorial}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 px-3 py-2 md:px-4 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm md:text-base font-medium"
      >
        <FileCode size={18} className="md:hidden" />
        <FileCode size={20} className="hidden md:block" />
        <span className="hidden sm:inline">📖 Revoir le tutoriel</span>
        <span className="sm:hidden">📖</span>
      </button>

      {/* Modal du tutoriel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Fenêtre du tutoriel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            >
              <div
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative p-4 sm:p-6 border-b border-gray-200">
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={20} className="text-gray-600 sm:hidden" />
                    <X size={24} className="text-gray-600 hidden sm:block" />
                  </button>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 pr-8 sm:pr-10">
                    Guide d&apos;utilisation des Notebooks Jupyter
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">
                    Étape {currentStep + 1} sur {tutorialSteps.length}
                  </p>
                  {/* Barre de progression */}
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Contenu de l'étape */}
                <div className="p-4 sm:p-6 md:p-8">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {/* Icône */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <div className="p-3 sm:p-4 bg-gray-100 rounded-full">
                        {currentStepData.icon}
                      </div>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {currentStepData.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </motion.div>
                </div>

                {/* Footer avec boutons de navigation */}
                <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                  {/* Bouton Précédent */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} className="sm:hidden" />
                    <ChevronLeft size={20} className="hidden sm:block" />
                    Précédent
                  </button>

                  {/* Indicateurs de points */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {tutorialSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? 'bg-blue-600 w-6 sm:w-8'
                            : index < currentStep
                            ? 'bg-emerald-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Bouton Suivant ou Terminer */}
                  {currentStep < tutorialSteps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Suivant
                      <ChevronRight size={18} className="sm:hidden" />
                      <ChevronRight size={20} className="hidden sm:block" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Check size={18} className="sm:hidden" />
                      <Check size={20} className="hidden sm:block" />
                      J&apos;ai compris ✅
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
