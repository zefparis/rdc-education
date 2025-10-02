"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  Code,
  Play,
  CheckCircle,
  Circle,
  Copy,
  Check,
  Download,
  FileText,
  ExternalLink,
  Lightbulb,
  Target
} from 'lucide-react';

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'python' | 'javascript' | 'typescript' | 'sql' | 'bash';
  explanation?: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  solution?: string;
  hints?: string[];
}

interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  estimatedTime?: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  resources?: {
    title: string;
    type: 'article' | 'video' | 'documentation' | 'dataset';
    url: string;
  }[];
}

interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icon: string;
  color: string;
  image: string;
  objectives: string[];
  prerequisites?: string[];
  sections: Section[];
  finalProject?: {
    title: string;
    description: string;
    requirements: string[];
    deliverables: string[];
  };
  resources?: {
    title: string;
    type: 'article' | 'video' | 'documentation' | 'dataset';
    url: string;
  }[];
  tags?: string[];
}

interface EnhancedCourseDisplayProps {
  module: Module;
  onGeneratePdf: () => void;
  isGeneratingPdf: boolean;
}

export default function EnhancedCourseDisplay({ module, onGeneratePdf, isGeneratingPdf }: EnhancedCourseDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([module.sections[0]?.id]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showExerciseSolution, setShowExerciseSolution] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId);
    } else {
      newCompleted.add(sectionId);
    }
    setCompletedSections(newCompleted);
  };

  const copyToClipboard = async (text: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'text-green-600 bg-green-100';
      case 'moyen': return 'text-yellow-600 bg-yellow-100';
      case 'difficile': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const progressPercentage = (completedSections.size / module.sections.length) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header avec progression */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Contenu du cours</h2>
              <p className="text-gray-600">{module.sections.length} sections • {module.duration}</p>
            </div>
            <button
              onClick={onGeneratePdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {isGeneratingPdf ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Génération...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Télécharger PDF
                </>
              )}
            </button>
          </div>

          {/* Barre de progression */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progression</span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prérequis */}
      {module.prerequisites && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Target className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Prérequis recommandés</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  {module.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sections du cours */}
      <div className="space-y-4">
        {module.sections.map((section, index) => {
          const isExpanded = expandedSections.has(section.id);
          const isCompleted = completedSections.has(section.id);

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Header de section */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{index + 1}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          {section.estimatedTime && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {section.estimatedTime}
                            </div>
                          )}
                          <span className="flex items-center gap-1">
                            <BookOpen size={14} />
                            {section.codeExamples?.length || 0} exemples
                          </span>
                          <span className="flex items-center gap-1">
                            <Play size={14} />
                            {section.exercises?.length || 0} exercices
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSectionComplete(section.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isCompleted
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </button>
                </div>
              </div>

              {/* Contenu de section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200"
                  >
                    <div className="p-6">
                      <div
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />

                      {/* Exemples de code */}
                      {section.codeExamples?.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="mt-6 bg-gray-900 rounded-lg overflow-hidden">
                          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Code size={16} className="text-green-400" />
                                <span className="text-gray-200 font-medium">{example.title}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(example.code, `${section.id}-${exampleIndex}`)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {copiedCode === `${section.id}-${exampleIndex}` ?
                                  <Check size={16} className="text-green-400" /> :
                                  <Copy size={16} />
                                }
                              </button>
                            </div>
                            {example.description && (
                              <p className="text-gray-400 text-sm mt-1">{example.description}</p>
                            )}
                          </div>
                          <pre className="p-4 overflow-x-auto text-sm text-gray-200">
                            <code>{example.code}</code>
                          </pre>
                          {example.explanation && (
                            <div className="px-4 py-3 bg-blue-900/30 border-t border-gray-700">
                              <div className="flex items-start gap-2">
                                <Lightbulb size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div className="text-blue-200 text-sm">
                                  <strong className="text-blue-100">Explication:</strong> {example.explanation}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Exercices */}
                      {section.exercises?.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600 font-medium">Exercice {exercise.id}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                  {exercise.difficulty}
                                </span>
                              </div>
                              {exercise.solution && (
                                <button
                                  onClick={() => {
                                    const newShown = new Set(showExerciseSolution);
                                    if (newShown.has(exercise.id)) {
                                      newShown.delete(exercise.id);
                                    } else {
                                      newShown.add(exercise.id);
                                    }
                                    setShowExerciseSolution(newShown);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  {showExerciseSolution.has(exercise.id) ? 'Masquer la solution' : 'Voir la solution'}
                                </button>
                              )}
                            </div>
                            <h4 className="font-medium text-gray-900 mt-1">{exercise.title}</h4>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-700 mb-4">{exercise.description}</p>

                            {exercise.solution && showExerciseSolution.has(exercise.id) && (
                              <div className="mt-4 bg-gray-900 rounded-lg">
                                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                                  <span className="text-green-400 font-medium">Solution</span>
                                </div>
                                <pre className="p-4 text-sm text-gray-200">
                                  <code>{exercise.solution}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Ressources */}
                      {section.resources?.length && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <ExternalLink size={16} />
                            Ressources complémentaires
                          </h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            {section.resources.map((resource, resourceIndex) => (
                              <a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <span className="text-lg">
                                  {resource.type === 'article' ? '📄' :
                                   resource.type === 'video' ? '🎥' :
                                   resource.type === 'documentation' ? '📚' : '📊'}
                                </span>
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{resource.title}</div>
                                  <div className="text-xs text-gray-500 capitalize">{resource.type}</div>
                                </div>
                                <ExternalLink size={14} className="text-gray-400 ml-auto" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Projet final */}
      {module.finalProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">🚀 Projet Final</h3>
            <p className="text-blue-100">{module.finalProject.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target size={16} />
                Exigences
              </h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                {module.finalProject.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText size={16} />
                Livrables attendus
              </h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                {module.finalProject.deliverables.map((del, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    {del}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
