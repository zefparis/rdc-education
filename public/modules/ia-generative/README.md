# Module IA Générative - Documentation complète

## Plateforme IA-Solution RDC

**Niveau :** Intermédiaire  
**Durée :** 6 semaines  
**Prérequis :** Python, bases de Deep Learning

---

## 📁 Contenu du module

### 1. **module-ia-generative-complet.ipynb**
**Notebook Jupyter interactif complet**

- **Format :** `.ipynb` (compatible Google Colab)
- **Contenu :**
  - 6 chapitres détaillés
  - Code Python exécutable
  - 5 exercices pratiques
  - Projet final complet
  - Exemples multimodaux (texte, image, audio)

**Utilisation :**
```bash
# Google Colab (recommandé)
1. Aller sur colab.research.google.com
2. Fichier → Importer le notebook
3. Configurer la clé API OpenAI
4. Exécuter les cellules

# Jupyter local
pip install jupyter openai pillow requests
jupyter notebook
```

### 2. **ia-generative-cours.md**
**Support de cours pédagogique**

- **Format :** Markdown (convertible en PDF)
- **Pages :** ~25-30 pages A4
- **Contenu :**
  - Théorie complète
  - Exemples de code
  - Tableaux récapitulatifs
  - Exercices pratiques
  - Ressources supplémentaires

**Conversion en PDF :**
```bash
pandoc ia-generative-cours.md -o ia-generative-cours.pdf
```

### 3. **audio-introduction.txt**
**Script pour voix-off d'introduction**

- **Format :** Texte brut
- **Durée :** ~2 minutes
- **Usage :** Génération audio avec API TTS

**Génération audio :**
```python
from openai import OpenAI
client = OpenAI()

with open('audio-introduction.txt', 'r') as f:
    text = f.read()

response = client.audio.speech.create(
    model="tts-1",
    voice="nova",
    input=text
)
response.stream_to_file("ia-generative-intro.mp3")
```

---

## 🎯 Objectifs pédagogiques

À la fin de ce module, l'étudiant sera capable de :

### Connaissances théoriques
- ✅ Expliquer ce qu'est l'IA générative
- ✅ Comprendre les différents types de génération
- ✅ Connaître les principaux modèles (GPT, DALL·E, etc.)
- ✅ Comprendre le fonctionnement des LLM

### Compétences pratiques
- ✅ Utiliser l'API OpenAI
- ✅ Créer des prompts efficaces
- ✅ Générer du texte avec GPT
- ✅ Créer des images avec DALL·E
- ✅ Produire de l'audio avec TTS
- ✅ Combiner plusieurs modalités

### Applications concrètes
- ✅ Créer des supports éducatifs
- ✅ Générer des contenus marketing
- ✅ Produire des campagnes de sensibilisation
- ✅ Développer des assistants multimodaux

---

## 📊 Structure du module

### Chapitre 1 : Introduction (1 semaine)
**Contenu :**
- Qu'est-ce que l'IA générative ?
- Histoire et évolution
- Types de génération
- Applications en RDC

**Livrables :**
- Compréhension des concepts de base
- Vision des possibilités

### Chapitre 2 : Génération de texte (1 semaine)
**Contenu :**
- Modèles de langage (LLM)
- API OpenAI
- Création de prompts
- Exemples pratiques

**Livrables :**
- Génération de texte fonctionnelle
- Prompts efficaces

### Chapitre 3 : Génération d'images (1 semaine)
**Contenu :**
- DALL·E, Stable Diffusion
- Techniques de prompting
- Styles et qualité
- Cas d'usage

**Livrables :**
- Images générées
- Portfolio de créations

### Chapitre 4 : Génération audio (1 semaine)
**Contenu :**
- Text-to-Speech
- Choix des voix
- Qualité audio
- Applications vocales

**Livrables :**
- Fichiers audio
- Voix-off professionnelles

### Chapitre 5 : Applications RDC (1 semaine)
**Contenu :**
- Éducation
- Agriculture
- Santé
- Culture
- Intégration multimodale

**Livrables :**
- Projets contextualisés
- Solutions pratiques

### Chapitre 6 : Projet final (1 semaine)
**Contenu :**
- Générateur d'affiches éducatives
- Intégration complète
- Déploiement
- Présentation

**Livrables :**
- Projet complet fonctionnel
- 3 campagnes de sensibilisation

---

## 💡 Exemples pratiques (contexte RDC)

### 📚 Éducation

**Exemple 1 : Support de cours illustré**
```python
# Génération de contenu
contenu = generer_texte("Explique la photosynthèse pour 6ème année")

# Génération d'illustration
image = generer_image("Diagramme de photosynthèse, style éducatif")

# Génération de voix-off
audio = generer_audio(contenu, voix="nova")
```

**Exemple 2 : Traduction en langues locales**
```python
texte_fr = "Bonjour, comment allez-vous ?"
texte_lingala = generer_texte(f"Traduis en lingala : {texte_fr}")
```

### 🌾 Agriculture

**Exemple : Guide agricole illustré**
```python
# Guide sur la culture du manioc
guide = generer_texte("Guide simple pour cultiver le manioc en RDC")
illustration = generer_image("Champ de manioc en RDC, style illustration")
audio = generer_audio(guide, voix="onyx")
```

### 🏥 Santé

**Exemple : Campagne de sensibilisation**
```python
# Affiche sur le paludisme
titre = generer_texte("Titre accrocheur sur prévention du paludisme")
contenu = generer_texte("Message de sensibilisation paludisme")
affiche = generer_image("Affiche prévention paludisme RDC")
message_audio = generer_audio(f"{titre}. {contenu}")
```

### 🎨 Culture

**Exemple : Art inspiré du folklore**
```python
art = generer_image(
    "Art traditionnel congolais moderne, motifs géométriques, "
    "couleurs vibrantes, style digital art"
)
```

---

## 🛠️ Outils nécessaires

### Option 1 : Google Colab (Recommandé)
**Avantages :**
- ✅ Gratuit
- ✅ Aucune installation
- ✅ GPU disponible
- ✅ Accessible partout

**Configuration :**
1. Créer un compte Google
2. Aller sur colab.research.google.com
3. Importer le notebook
4. Configurer la clé API OpenAI

### Option 2 : Installation locale

**Prérequis :**
- Python 3.8+
- pip

**Installation :**
```bash
# Créer environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Installer dépendances
pip install openai pillow requests python-dotenv

# Vérifier
python -c "import openai; print(openai.__version__)"
```

### Clé API OpenAI

**Obtenir une clé :**
1. Créer un compte sur [platform.openai.com](https://platform.openai.com/)
2. Aller dans API Keys
3. Créer une nouvelle clé
4. Copier et sauvegarder

**Configuration :**
```python
import os
os.environ["OPENAI_API_KEY"] = "votre-clé-ici"
```

**Coûts estimés :**
- GPT-3.5-turbo : $0.002/1K tokens (~$0.10 pour le module)
- DALL·E 3 : $0.04/image (~$0.50 pour le module)
- TTS : $15/1M caractères (~$0.05 pour le module)

**Total estimé : ~$1 pour tout le module**

---

## 📚 Ressources complémentaires

### Documentation officielle
1. **OpenAI**
   - [Documentation API](https://platform.openai.com/docs)
   - [Cookbook](https://cookbook.openai.com/)
   - [Examples](https://platform.openai.com/examples)

2. **Hugging Face**
   - [Models](https://huggingface.co/models)
   - [Datasets](https://huggingface.co/datasets)
   - [Spaces](https://huggingface.co/spaces)

3. **Stable Diffusion**
   - [Documentation](https://stability.ai/stable-diffusion)
   - [GitHub](https://github.com/Stability-AI/stablediffusion)

### Cours en ligne
1. **DeepLearning.AI**
   - ChatGPT Prompt Engineering for Developers
   - Building Systems with ChatGPT API
   - LangChain for LLM Application Development

2. **Coursera**
   - Generative AI with Large Language Models
   - Prompt Engineering Specialization

3. **Fast.ai**
   - Practical Deep Learning for Coders
   - From Deep Learning Foundations to Stable Diffusion

### Livres recommandés
1. **"Generative Deep Learning"** - David Foster
   - Théorie et pratique
   - Exemples avec code
   - Niveau intermédiaire

2. **"Prompt Engineering Guide"** - DAIR.AI
   - Gratuit en ligne
   - Techniques avancées
   - Exemples pratiques

### Communautés
- **Reddit**
  - r/StableDiffusion
  - r/OpenAI
  - r/MachineLearning

- **Discord**
  - OpenAI Community
  - Midjourney
  - Stable Diffusion

- **Twitter/X**
  - #AIArt
  - #GenerativeAI
  - #PromptEngineering

### Outils et plateformes
- [ChatGPT](https://chat.openai.com/) - Interface web
- [DALL·E](https://labs.openai.com/) - Génération d'images
- [Midjourney](https://www.midjourney.com/) - Art IA
- [ElevenLabs](https://elevenlabs.io/) - Voix IA
- [Suno](https://suno.ai/) - Musique IA
- [Runway](https://runwayml.com/) - Vidéo IA

---

## 🚀 Guide d'utilisation

### Pour les étudiants

#### Semaine 1 : Introduction
1. Lire le Chapitre 1
2. Écouter l'audio d'introduction
3. Créer un compte OpenAI
4. Tester ChatGPT

#### Semaine 2 : Génération de texte
1. Configurer l'API
2. Exécuter les exemples
3. Faire l'Exercice 1
4. Expérimenter avec les prompts

#### Semaine 3 : Génération d'images
1. Étudier les techniques de prompting
2. Générer vos premières images
3. Faire l'Exercice 2
4. Créer un portfolio

#### Semaine 4 : Génération audio
1. Tester les différentes voix
2. Créer des voix-off
3. Faire l'Exercice 3
4. Combiner texte + audio

#### Semaine 5 : Applications RDC
1. Étudier les cas d'usage
2. Créer un assistant multimodal
3. Faire l'Exercice 4
4. Contextualiser vos projets

#### Semaine 6 : Projet final
1. Choisir 3 thèmes
2. Générer les affiches
3. Faire l'Exercice 5
4. Présenter vos créations

### Pour les enseignants

#### Préparation
- [ ] Tester le notebook complet
- [ ] Obtenir une clé API OpenAI
- [ ] Générer l'audio d'introduction
- [ ] Préparer des exemples supplémentaires
- [ ] Créer un budget pour les API

#### En classe
- [ ] Audio d'introduction (2 min)
- [ ] Démonstration live (30 min)
- [ ] Exercices guidés (45 min)
- [ ] Expérimentation libre (30 min)
- [ ] Questions-réponses (15 min)

#### Évaluation
- Quiz théorique : 20%
- Exercices pratiques : 30%
- Projet final : 40%
- Créativité : 10%

---

## ✅ Checklist d'apprentissage

### Concepts théoriques
- [ ] Je comprends ce qu'est l'IA générative
- [ ] Je connais les différents types de génération
- [ ] Je sais comment fonctionnent les LLM
- [ ] Je comprends les modèles de diffusion

### Compétences pratiques
- [ ] Je sais utiliser l'API OpenAI
- [ ] Je crée des prompts efficaces
- [ ] Je génère du texte de qualité
- [ ] Je crée des images pertinentes
- [ ] Je produis de l'audio professionnel
- [ ] Je combine plusieurs modalités

### Projet
- [ ] J'ai créé 3 affiches éducatives
- [ ] Chaque affiche a texte + image + audio
- [ ] Les contenus sont de qualité
- [ ] Les messages sont clairs et impactants

---

## 🎓 Évaluation

### Quiz théorique (20 points)
1. Qu'est-ce que l'IA générative ? (4 pts)
2. Citez 3 modèles de génération de texte (3 pts)
3. Qu'est-ce qu'un prompt ? (3 pts)
4. Différence entre GPT-3.5 et GPT-4 ? (3 pts)
5. Applications de l'IA générative en RDC ? (4 pts)
6. Qu'est-ce que le temperature ? (3 pts)

### Exercices pratiques (30 points)
- Exercice 1 : Génération de texte (5 pts)
- Exercice 2 : Génération d'images (7 pts)
- Exercice 3 : Génération audio (6 pts)
- Exercice 4 : Application complète (12 pts)

### Projet final (40 points)
- Qualité du contenu textuel (10 pts)
- Qualité des images (10 pts)
- Qualité de l'audio (10 pts)
- Créativité et originalité (10 pts)

### Créativité (10 points)
- Innovation dans l'approche
- Adaptation au contexte RDC
- Qualité de la présentation

**Note finale = Quiz + Exercices + Projet + Créativité**

---

## 🔧 Dépannage

### Problème : Erreur d'authentification API
**Solution :**
```python
# Vérifier la clé
import os
print(os.environ.get("OPENAI_API_KEY"))

# Reconfigurer
os.environ["OPENAI_API_KEY"] = "votre-nouvelle-clé"
```

### Problème : Rate limit exceeded
**Solution :**
- Attendre quelques secondes entre les requêtes
- Utiliser un compte payant
- Réduire la fréquence des appels

### Problème : Image de mauvaise qualité
**Solution :**
- Améliorer le prompt (plus de détails)
- Utiliser quality="hd"
- Tester différentes formulations

### Problème : Audio robotique
**Solution :**
- Utiliser model="tts-1-hd"
- Tester différentes voix
- Ajouter de la ponctuation au texte

---

## 📞 Support

### Questions techniques
- **Email :** support@ia-solution-rdc.cd
- **Forum :** [forum.ia-solution-rdc.cd](https://forum.ia-solution-rdc.cd)

### Contributions
- **GitHub :** [github.com/ia-solution-rdc](https://github.com/ia-solution-rdc)
- **Issues :** Signaler bugs et suggestions

### Communauté
- **Discord :** Serveur IA-Solution RDC
- **WhatsApp :** Groupe d'entraide

---

## 📝 Licence

**Creative Commons BY-NC-SA 4.0**

Vous pouvez :
- ✅ Partager et redistribuer
- ✅ Adapter et transformer

Conditions :
- 📌 Créditer IA-Solution RDC
- 📌 Usage non commercial
- 📌 Partager dans les mêmes conditions

---

## 🔄 Mises à jour

**Version 1.0** (2025)
- Création initiale
- 6 chapitres complets
- 5 exercices pratiques
- Projet final

**Prochaines versions :**
- [ ] Génération de vidéos (Sora)
- [ ] Fine-tuning de modèles
- [ ] Agents autonomes
- [ ] RAG (Retrieval Augmented Generation)
- [ ] LangChain integration

---

## 🎉 Remerciements

**Équipe pédagogique :**
- Experts en IA générative
- Enseignants congolais
- Créateurs de contenu

**Partenaires :**
- OpenAI
- Universités de RDC
- Communauté open-source

---

**Bon apprentissage ! 🚀**

*Pour toute suggestion, contactez-nous.*

---

## Annexe : Commandes utiles

### OpenAI API

```python
# Génération de texte
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello"}]
)

# Génération d'image
response = client.images.generate(
    model="dall-e-3",
    prompt="A beautiful sunset",
    size="1024x1024"
)

# Génération d'audio
response = client.audio.speech.create(
    model="tts-1",
    voice="nova",
    input="Hello world"
)
```

### Gestion des coûts

```python
# Compter les tokens
import tiktoken

encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
tokens = encoding.encode("Votre texte")
print(f"Nombre de tokens: {len(tokens)}")
print(f"Coût estimé: ${len(tokens) * 0.000002:.6f}")
```

### Bonnes pratiques

```python
# Gestion des erreurs
try:
    response = client.chat.completions.create(...)
except openai.RateLimitError:
    print("Limite de taux atteinte, attendez...")
except openai.APIError as e:
    print(f"Erreur API: {e}")
```
