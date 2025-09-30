# Module NLP - Documentation

## Plateforme IA-Solution RDC

**Niveau :** Intermédiaire  
**Durée :** 6 semaines  
**Prérequis :** Python, ML, Deep Learning

---

## 📁 Contenu du module

### 1. **module-nlp-complet.ipynb**
Notebook Jupyter interactif

- 6 chapitres détaillés
- Code Python exécutable
- 5 exercices pratiques
- Projet final : Chatbot éducatif
- Exemples RDC

### 2. **nlp-cours.md**
Support de cours (~25 pages)

- Théorie complète
- Exemples de code
- Exercices
- Convertible en PDF

### 3. **audio-introduction.txt**
Script voix-off (~2 minutes)

---

## 🎯 Objectifs

### Connaissances
- ✅ Comprendre le NLP
- ✅ Maîtriser le prétraitement
- ✅ Connaître les modèles (BoW, TF-IDF, Embeddings, Transformers)

### Compétences
- ✅ Nettoyer des textes
- ✅ Tokeniser et vectoriser
- ✅ Utiliser word embeddings
- ✅ Appliquer des Transformers
- ✅ Créer des chatbots

### Applications
- ✅ Chatbots éducatifs
- ✅ Traduction FR ↔ lingala
- ✅ Analyse de textes

---

## 📊 Structure (6 semaines)

### Semaine 1 : Introduction
- NLP et applications
- Cas d'usage RDC

### Semaine 2 : Prétraitement
- Nettoyage
- Tokenisation
- Vectorisation

### Semaine 3 : Word Embeddings
- Word2Vec, GloVe
- Similarité sémantique

### Semaine 4 : Transformers
- BERT, GPT
- Hugging Face

### Semaine 5 : Applications
- Chatbots
- Extraction d'entités

### Semaine 6 : Projet
- Chatbot intelligent
- Présentation

---

## 💡 Exemples RDC

### 📚 Éducation
**Chatbot pour étudiants**
- Réponses automatiques
- Disponible 24/7
- Multilingue (FR/lingala)

### 🏛️ Administration
**Analyse de documents**
- Extraction d'informations
- Classification automatique
- Résumés

### 💬 Communication
**Traduction**
- Français ↔ lingala
- Français ↔ swahili
- Préservation des langues

---

## 🛠️ Installation

```bash
pip install nltk spacy transformers torch
python -m spacy download fr_core_news_sm
```

---

## 📚 Ressources

### Documentation
- [NLTK](https://www.nltk.org/)
- [SpaCy](https://spacy.io/)
- [Hugging Face](https://huggingface.co/)

### Cours
- NLP Specialization (DeepLearning.AI)
- CS224N (Stanford)
- Fast.ai NLP

### Livres
- "Speech and Language Processing"
- "NLP with Python"
- "Transformers for NLP"

---

## 🚀 Guide d'utilisation

### Pour les étudiants
1. Ouvrir le notebook
2. Suivre chapitre par chapitre
3. Faire les exercices
4. Réaliser le projet

### Pour les enseignants
1. Tester le notebook
2. Préparer exemples
3. Distribuer
4. Évaluer

---

## ✅ Checklist

### Concepts
- [ ] Je comprends le NLP
- [ ] Je maîtrise le prétraitement
- [ ] Je connais les embeddings
- [ ] Je sais utiliser Transformers

### Compétences
- [ ] Je nettoie des textes
- [ ] Je vectorise avec TF-IDF
- [ ] J'utilise word embeddings
- [ ] Je crée des chatbots

### Projet
- [ ] Chatbot fonctionnel
- [ ] 20+ questions/réponses
- [ ] Bonne précision
- [ ] Documentation

---

## 🎓 Évaluation

### Quiz (20%)
1. Qu'est-ce que le NLP ?
2. Étapes du prétraitement ?
3. Différence BoW vs Embeddings ?
4. Qu'est-ce qu'un Transformer ?

### Exercices (30%)
- Exercice 1-4 : 7 pts chacun
- Exercice 5 : 2 pts

### Projet (50%)
- Fonctionnalité : 20 pts
- Qualité code : 15 pts
- Documentation : 10 pts
- Créativité : 5 pts

---

## 🔧 Dépannage

### NLTK data manquant
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

### SpaCy modèle manquant
```bash
python -m spacy download fr_core_news_sm
```

### Transformers lent
```python
# Utiliser CPU
device = -1  # CPU
pipeline("task", device=device)
```

---

## 📞 Support

**Email :** support@ia-solution-rdc.cd  
**Forum :** forum.ia-solution-rdc.cd

---

## 📝 Licence

**Creative Commons BY-NC-SA 4.0**

---

**Bon apprentissage ! 🚀**
