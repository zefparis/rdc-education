# Module NLP - Support de cours

## Plateforme IA-Solution RDC

**Niveau :** Intermédiaire  
**Durée :** 6 semaines  
**Prérequis :** Python, ML, Deep Learning

---

## 📋 Table des matières

1. [Introduction au NLP](#chapitre-1)
2. [Prétraitement du texte](#chapitre-2)
3. [Word Embeddings](#chapitre-3)
4. [Transformers](#chapitre-4)
5. [Applications en RDC](#chapitre-5)
6. [Projet final](#chapitre-6)

---

# Chapitre 1 : Introduction au NLP

## 1.1 Définition

Le **NLP** (Natural Language Processing) permet aux ordinateurs de comprendre et générer du langage humain.

## 1.2 Applications

- Traduction automatique
- Analyse de sentiments
- Chatbots
- Résumé automatique
- Correction orthographique

## 1.3 Applications RDC

- 📚 **Éducation** : Chatbots, correction automatique
- 🏛️ **Administration** : Analyse de documents
- 💬 **Communication** : Traduction FR ↔ lingala
- 🏥 **Santé** : Analyse de dossiers médicaux

---

# Chapitre 2 : Prétraitement

## 2.1 Étapes

```
Texte brut
  ↓
Nettoyage
  ↓
Tokenisation
  ↓
Normalisation
  ↓
Stopwords
  ↓
Lemmatisation
```

## 2.2 Nettoyage

```python
def nettoyer_texte(texte):
    texte = texte.lower()
    texte = texte.translate(str.maketrans('', '', string.punctuation))
    texte = re.sub(r'\d+', '', texte)
    return texte.strip()
```

## 2.3 Tokenisation

```python
from nltk.tokenize import word_tokenize
mots = word_tokenize(texte, language='french')
```

## 2.4 Vectorisation

### Bag-of-Words
```python
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
```

### TF-IDF
```python
from sklearn.feature_extraction.text import TfidfVectorizer
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(corpus)
```

---

# Chapitre 3 : Word Embeddings

## 3.1 Définition

Représentation vectorielle dense capturant le sens sémantique.

## 3.2 Modèles

- **Word2Vec** (Google)
- **GloVe** (Stanford)
- **FastText** (Facebook)

## 3.3 Similarité

```python
import spacy
nlp = spacy.load('fr_core_news_sm')

def similarite(mot1, mot2):
    return nlp(mot1).similarity(nlp(mot2))
```

---

# Chapitre 4 : Transformers

## 4.1 Modèles

| Modèle | Usage |
|--------|-------|
| **BERT** | Compréhension |
| **GPT** | Génération |
| **CamemBERT** | Français |

## 4.2 Hugging Face

```python
from transformers import pipeline

# Sentiment
sentiment = pipeline("sentiment-analysis")

# Traduction
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-fr-en")

# Classification
classifier = pipeline("zero-shot-classification")
```

---

# Chapitre 5 : Applications RDC

## 5.1 Chatbot éducatif

```python
class Chatbot:
    def __init__(self):
        self.reponses = {...}
    
    def repondre(self, message):
        # Logique de réponse
        return reponse
```

## 5.2 Extraction d'entités

```python
doc = nlp(texte)
for ent in doc.ents:
    print(ent.text, ent.label_)
```

---

# Chapitre 6 : Projet final

## Objectif

Créer un chatbot éducatif intelligent.

## Spécifications

1. Base de 20+ questions/réponses
2. Prétraitement complet
3. TF-IDF + similarité cosinus
4. Seuil de confiance

## Implémentation

```python
# Vectoriser
vectorizer = TfidfVectorizer()
questions_vec = vectorizer.fit_transform(questions)

# Trouver meilleure réponse
def chatbot(question):
    q_vec = vectorizer.transform([question])
    similarities = cosine_similarity(q_vec, questions_vec)
    best_idx = similarities.argmax()
    return reponses[best_idx]
```

---

# Exercices

## Exercice 1 : Prétraitement ⭐⭐
Nettoyez et tokenisez un texte complet.

## Exercice 2 : Word Embeddings ⭐⭐
Calculez la similarité entre mots.

## Exercice 3 : Transformers ⭐⭐⭐
Utilisez Hugging Face pour l'analyse.

## Exercice 4 : Applications ⭐⭐⭐
Améliorez le chatbot.

## Exercice 5 : Projet final ⭐⭐⭐
Chatbot éducatif complet.

---

# Ressources

## Documentation
- [NLTK](https://www.nltk.org/)
- [SpaCy](https://spacy.io/)
- [Hugging Face](https://huggingface.co/)

## Cours
- NLP Specialization (DeepLearning.AI)
- CS224N (Stanford)

## Livres
- "Speech and Language Processing" - Jurafsky
- "Natural Language Processing with Python" - Bird

---

**Félicitations ! Module terminé ! 🎉**
