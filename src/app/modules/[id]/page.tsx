"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Volume2,
  Download,
  BarChart,
  Clock,
  CheckCircle,
  FileText,
  Video as VideoIcon,
  Code,
  ArrowLeft,
  BookOpen,
  Copy,
  Check
} from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import JupyterTutorial from "@/components/JupyterTutorial";
import { modulesConfig, getColabUrl } from "@/config/modulesConfig";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ModulePage({ params }: ModulePageProps) {
  // Unwrap params avec React.use()
  const { id } = React.use(params);
  
  // Récupérer le module depuis la configuration
  const courseModule = modulesConfig.find((m) => m.slug === id);

  // États
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showCodeExamples, setShowCodeExamples] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  
  // Fonction pour obtenir des exemples de code basés sur le module
  const getCodeExamples = () => {
    if (!courseModule) return "// Chargement des exemples de code...";
    
    const examples: Record<string, string> = {
      'data-science': `# Exemple de code Python avec Pandas\nimport pandas as pd\nimport numpy as np\n\n# Créer un DataFrame\ndata = {'Nom': ['Alice', 'Bob', 'Charlie'],\n        'Âge': [25, 30, 35],\n        'Ville': ['Paris', 'Lyon', 'Marseille']}\n\ndf = pd.DataFrame(data)\nprint(df.head())`,
      'machine-learning': `# Exemple de modèle de Machine Learning\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Diviser les données\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Entraîner le modèle\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\n# Évaluer le modèle\naccuracy = model.score(X_test, y_test)\nprint(f\"Précision: {accuracy:.2f}\")`,
      'deep-learning': `# Exemple de réseau de neurones avec TensorFlow\nimport tensorflow as tf\n\n# Créer un modèle séquentiel\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),\n    tf.keras.layers.Dropout(0.2),\n    tf.keras.layers.Dense(10, activation='softmax')\n])\n\n# Compiler le modèle\nmodel.compile(optimizer='adam',\n              loss='sparse_categorical_crossentropy',\n              metrics=['accuracy'])`
    };
    
    return examples[courseModule.slug] || "// Aucun exemple de code disponible pour ce module";
  };

  // Fonction pour générer le PDF du cours
  const generatePdf = async () => {
    if (!courseModule) return;
    
    setIsGeneratingPdf(true);
    
    try {
      // Importer dynamiquement jsPDF et html2canvas uniquement côté client
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      
      // Créer un élément temporaire pour le contenu du PDF
      const content = document.createElement('div');
      content.style.padding = '20px';
      content.style.fontFamily = 'Arial, sans-serif';
      content.style.maxWidth = '800px';
      content.style.margin = '0 auto';
      content.style.color = '#2d3748';
      
      // Ajouter le contenu au PDF
      content.innerHTML = `
        <!-- En-tête -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px;">
          <h1 style="color: #2d3748; margin-bottom: 10px; font-size: 24px;">${courseModule.title}</h1>
          <p style="color: #4a5568; font-style: italic; font-size: 16px;">${courseModule.description}</p>
          <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px; color: #718096; font-size: 14px;">
            <span>Niveau: ${courseModule.level}</span>
            <span>•</span>
            <span>Durée: ${courseModule.duration}</span>
          </div>
        </div>
        
        <!-- Objectifs d'apprentissage -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px; font-size: 20px;">Objectifs d'apprentissage</h2>
          <ul style="padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.6;">
            ${courseModule.objectives?.map(obj => `<li style="margin-bottom: 8px;">${obj}</li>`).join('')}
          </ul>
        </div>
        
        <!-- Contenu du cours -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px; font-size: 20px;">Contenu du cours</h2>
          <div style="color: #4a5568; line-height: 1.6; font-size: 14px;">
            ${courseModule.topics?.map((topic, index) => 
              `<div style="margin-bottom: 20px;" key="${index}">
                <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 16px;">${topic}</h3>
                <p>Contenu détaillé pour ${topic}...</p>
              </div>`
            ).join('')}
          </div>
        </div>
        
        <!-- Exemples de code -->
        <div>
          <h2 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px; font-size: 20px;">Exemples de code</h2>
          <pre style="background-color: #f7fafc; padding: 15px; border-radius: 6px; overflow-x: auto; color: #2d3748; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap;">
            <code>${getCodeExamples()}</code>
          </pre>
        </div>
        
        <!-- Pied de page -->
        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px; text-align: center;">
          <p>Formation ${courseModule.title} - Ia-Solution RDC</p>
          <p>${new Date().getFullYear()} - Tous droits réservés</p>
        </div>
      `;
      
      // Créer un conteneur temporaire pour le contenu du PDF
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.appendChild(content);
      document.body.appendChild(container);
      
      try {
        // Générer le canvas avec html2canvas
        const canvas = await html2canvas(content, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Créer le PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Télécharger le PDF
        pdf.save(`cours-${courseModule.slug}.pdf`);
        
      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        alert("Une erreur est survenue lors de la génération du PDF.");
      } finally {
        // Nettoyer
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
        setIsGeneratingPdf(false);
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
      setIsGeneratingPdf(false);
    }
  };

  // Si le module n'existe pas, afficher un fallback
  if (!courseModule) {
    return (
      <div className="relative z-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Module introuvable
            </h1>
            <p className="text-gray-400 mb-8">
              Le module que vous recherchez n&apos;existe pas ou a été déplacé.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              Retour au dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Construire les métadonnées
  const meta = {
    level: courseModule.level ?? "N/A",
    duration: courseModule.duration ?? "N/A",
    students: 450,
    content: courseModule.topics ?? [],
  };

  // Handler pour charger/générer l'audio
  const handleListen = async () => {
    if (audioUrl) return; // Audio déjà chargé
    if (!courseModule.description) return;

    try {
      setIsGenerating(true);

      // D'abord, essayer de charger le MP3 existant
      if (courseModule.audio) {
        try {
          const checkResponse = await fetch(courseModule.audio, { method: 'HEAD' });
          if (checkResponse.ok) {
            // Le fichier MP3 existe, l'utiliser directement
            setAudioUrl(courseModule.audio);
            setIsGenerating(false);
            return;
          }
        } catch {
          // Le fichier n'existe pas, continuer avec la génération TTS
        }
      }

      // Si le MP3 n'existe pas, générer via TTS
      const text = `Bienvenue au module ${courseModule.title}. ${courseModule.description}`;

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          moduleId: courseModule.slug,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération audio");

      const data = await res.json();
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }
    } catch (error) {
      console.error("Erreur audio:", error);
      alert("Impossible de charger l&apos;audio pour le moment");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative z-10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Retour aux modules</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl md:text-6xl" aria-hidden="true">
              {courseModule.icon}
            </span>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                {courseModule.title}
              </h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {courseModule.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Boutons Audio, PDF et Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {/* Bouton Audio */}
          <button
            onClick={handleListen}
            disabled={isGenerating || !!audioUrl}
            className="group relative bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            aria-label="Écouter le module"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Volume2 size={32} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Voix-off</h3>
                  <p className="text-orange-100 text-sm">
                    {isGenerating
                      ? "Génération..."
                      : audioUrl
                      ? "Audio prêt"
                      : "Écouter l'introduction"}
                  </p>
                </div>
              </div>
              {!isGenerating && !audioUrl && (
                <Volume2 size={24} className="opacity-50" />
              )}
              {isGenerating && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              )}
            </div>
          </button>

          {/* Bouton PDF */}
          <button
            onClick={generatePdf}
            disabled={isGeneratingPdf}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-75 disabled:cursor-not-allowed"
            aria-label="Télécharger le PDF du cours"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText size={32} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Support PDF</h3>
                  <p className="text-blue-100 text-sm">
                    {isGeneratingPdf ? 'Génération...' : 'Télécharger le cours'}
                  </p>
                </div>
              </div>
              {isGeneratingPdf ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <Download size={24} className="opacity-50" />
              )}
            </div>
          </button>

          {/* Bouton Code */}
          <button
            onClick={() => setShowCodeExamples(!showCodeExamples)}
            className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            aria-label="Afficher les exemples de code"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Code size={32} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Code source</h3>
                  <p className="text-purple-100 text-sm">
                    {showCodeExamples ? 'Masquer le code' : 'Afficher les exemples'}
                  </p>
                </div>
              </div>
              <Code size={24} className="opacity-50" />
            </div>
          </button>
        </motion.div>

        {/* Section Code Examples */}
        {showCodeExamples && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-[#1e1e1e] rounded-xl border border-[#404040] overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#404040] bg-[#252526]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-sm text-gray-400">exemple.py</span>
                <button 
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(getCodeExamples());
                      setCodeCopied(true);
                      setTimeout(() => setCodeCopied(false), 2000);
                    } catch (err) {
                      console.error('Failed to copy:', err);
                    }
                  }}
                  className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2d2d2d] transition-colors"
                  aria-label="Copier le code"
                >
                  {codeCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
              <pre className="p-6 overflow-x-auto text-sm text-gray-200 font-mono">
                <code>{getCodeExamples()}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-500 flex-shrink-0" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">
                  {meta.duration}
                </div>
                <div className="text-sm text-gray-400">Durée</div>
              </div>
            </div>
          </div>

          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <BarChart className="text-emerald-500 flex-shrink-0" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">{meta.level}</div>
                <div className="text-sm text-gray-400">Niveau</div>
              </div>
            </div>
          </div>

          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle
                className="text-purple-500 flex-shrink-0"
                size={24}
              />
              <div>
                <div className="text-2xl font-bold text-white">
                  {meta.content.length}
                </div>
                <div className="text-sm text-gray-400">Chapitres</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Audio */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#262626] border border-[#404040] rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-300">
                Génération de la voix-off en cours...
              </span>
            </div>
          </motion.div>
        )}

        {/* Audio Player */}
        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer
              audioUrl={audioUrl}
              title={`Voix-off - ${courseModule.title}`}
            />
          </motion.div>
        )}


        {/* Section Notebook Jupyter */}
        {courseModule.notebook && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-500" size={32} />
              <h2 className="text-2xl font-bold text-white">
                Notebook Jupyter Interactif
              </h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Pratiquez avec des exercices Python interactifs. Choisissez votre méthode préférée :
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Bouton Télécharger */}
              <a
                href={courseModule.notebook}
                download
                className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] flex items-center justify-center gap-2"
              >
                <Download size={20} />
                📥 Télécharger le Notebook
              </a>

              {/* Bouton Google Colab */}
              <a
                href={getColabUrl(courseModule.notebook)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] flex items-center justify-center gap-2"
              >
                <Code size={20} />
                🚀 Ouvrir dans Google Colab
              </a>
            </div>

            <p className="text-sm text-gray-400 bg-[#1a1a1a] rounded-lg p-4 border border-[#404040]">
              👉 <strong className="text-gray-300">Télécharger :</strong> Pour ouvrir le notebook en local avec Jupyter ou VS Code (nécessite Python installé).
              <br />
              👉 <strong className="text-gray-300">Google Colab :</strong> Pour l&apos;exécuter en ligne directement dans votre navigateur, sans installation (recommandé pour les débutants).
            </p>
          </motion.div>
        )}

        {/* Objectifs */}
        {courseModule.objectives && courseModule.objectives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Objectifs d&apos;apprentissage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseModule.objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="text-emerald-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <span className="text-gray-300">{objective}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contenu du module */}
        {meta.content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Contenu du module
            </h2>
            <div className="space-y-3">
              {meta.content.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#404040] hover:border-blue-500/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 group-hover:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm transition-colors">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {topic}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ressources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-blue-500/30 transition-colors">
            <FileText size={32} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Documents PDF
            </h3>
            <p className="text-gray-400 text-sm">
              Supports de cours et exercices pratiques
            </p>
          </div>

          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <VideoIcon size={32} className="text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Vidéos</h3>
            <p className="text-gray-400 text-sm">
              Tutoriels vidéo et démonstrations
            </p>
          </div>

          <div className="bg-[#262626] border border-[#404040] rounded-xl p-6 hover:border-purple-500/30 transition-colors">
            <Code size={32} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Code Source</h3>
            <p className="text-gray-400 text-sm">
              Exemples de code et projets
            </p>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <ArrowLeft size={20} />
            Retour aux modules
          </Link>
        </motion.div>
      </div>

      {/* Tutoriel Jupyter */}
      {courseModule.notebook && <JupyterTutorial />}
    </div>
  );
}