# Module Deep Learning - Support de cours
## Partie 1 : Introduction et Fondamentaux

**Plateforme IA-Solution RDC**  
**Niveau :** Intermédiaire | **Durée :** 10 semaines

---

## 📋 Table des matières complète

1. Introduction au Deep Learning
2. Réseaux de neurones artificiels
3. Entraînement d'un réseau
4. TensorFlow et PyTorch
5. Problèmes et solutions
6. Projet final

---

# Chapitre 1 : Introduction au Deep Learning

## 1.1 Qu'est-ce que le Deep Learning ?

Le **Deep Learning** (apprentissage profond) est une branche du Machine Learning qui utilise des **réseaux de neurones artificiels** avec plusieurs couches pour apprendre des représentations complexes des données.

### Analogie simple

Imaginez que vous apprenez à un enfant à reconnaître des fruits au marché de Kinshasa :

**ML Classique :**
- Vous donnez des règles : "Si c'est jaune et allongé, c'est une banane"
- Vous devez penser à toutes les règles

**Deep Learning :**
- Vous montrez des milliers de photos
- Il apprend lui-même les caractéristiques
- Il peut reconnaître des fruits jamais vus

## 1.2 Différences ML vs Deep Learning

| Aspect | ML Classique | Deep Learning |
|--------|--------------|---------------|
| **Features** | Manuelles | Automatiques |
| **Données** | 100-10K | 10K-millions |
| **Calcul** | CPU | GPU |
| **Temps** | Minutes-heures | Heures-jours |
| **Interprétabilité** | Élevée | Faible |
| **Performance** | Bonne | Excellente |

## 1.3 Applications en RDC

### 🏥 Santé
- Détection du paludisme sur lames
- Analyse de radiographies
- Prédiction d'épidémies

### 🌾 Agriculture
- Détection maladies du manioc
- Estimation des rendements
- Classification des sols

### 💰 Commerce
- Reconnaissance de produits
- Détection de fraudes
- Recommandations

### 📚 Éducation
- Correction automatique
- Chatbots éducatifs
- Analyse de performances

---

# Chapitre 2 : Réseaux de neurones

## 2.1 Le neurone artificiel

### Composants
1. **Entrées (x)** : Données
2. **Poids (w)** : Importance
3. **Biais (b)** : Ajustement
4. **Activation (f)** : Transformation

### Formule
```
z = (x₁×w₁) + (x₂×w₂) + ... + b
y = f(z)
```

## 2.2 Fonctions d'activation

### Sigmoid
- **Formule :** σ(z) = 1/(1+e⁻ᶻ)
- **Sortie :** [0, 1]
- **Usage :** Classification binaire

### ReLU
- **Formule :** f(z) = max(0, z)
- **Sortie :** [0, ∞)
- **Usage :** Couches cachées (recommandé)

### Softmax
- **Formule :** eᶻⁱ/Σeᶻʲ
- **Sortie :** Probabilités (somme=1)
- **Usage :** Classification multi-classes

## 2.3 Architecture

```
Entrée → Couches cachées → Sortie
  (5)      (32→16→8)        (3)
```

**Exemple : Classification de fruits**
- Entrée : 5 features (longueur, largeur, poids, couleur, texture)
- Cachées : 3 couches (32, 16, 8 neurones)
- Sortie : 3 classes (banane, mangue, ananas)

---

# Chapitre 3 : Entraînement

## 3.1 Fonction de perte

Mesure l'erreur entre prédiction et réalité.

### Types principaux

| Fonction | Usage | Formule |
|----------|-------|---------|
| **Binary Crossentropy** | 2 classes | -[y log(ŷ) + (1-y) log(1-ŷ)] |
| **Categorical Crossentropy** | N classes | -Σ yᵢ log(ŷᵢ) |
| **MSE** | Régression | (y - ŷ)² |

## 3.2 Backpropagation

Algorithme pour ajuster les poids.

### Étapes
1. **Forward** : Calculer prédiction
2. **Erreur** : Comparer avec vérité
3. **Backward** : Propager erreur
4. **Update** : Ajuster poids

### Analogie
Comme apprendre à lancer une balle :
1. Vous lancez
2. Vous ratez
3. Vous analysez
4. Vous ajustez
5. Vous relancez

## 3.3 Optimiseurs

### Adam (Recommandé)
- Adapte le learning rate
- Convergence rapide
- Peu de réglages

### SGD
- Simple
- Plus lent
- Nécessite réglages

## 3.4 Hyperparamètres

### Learning Rate
- **Trop petit** : Lent
- **Trop grand** : Diverge
- **Optimal** : 0.001-0.01

### Époques
- **Trop peu** : Sous-apprentissage
- **Trop** : Surapprentissage
- **Optimal** : 50-200

### Batch Size
- **Petit (32)** : Rapide, bruité
- **Grand (128)** : Lent, stable

---

# Chapitre 4 : TensorFlow

## 4.1 Introduction

Bibliothèque Google pour Deep Learning.

### Avantages
- ✅ Populaire
- ✅ Keras intégré
- ✅ Production
- ✅ Mobile

### Installation
```bash
pip install tensorflow
```

## 4.2 Exemple basique

```python
import tensorflow as tf
from tensorflow import keras

# Créer modèle
model = keras.Sequential([
    keras.layers.Dense(16, activation='relu', input_shape=(4,)),
    keras.layers.Dense(8, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

# Compiler
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Entraîner
model.fit(X_train, y_train, epochs=50)

# Prédire
predictions = model.predict(X_test)
```

---

# Chapitre 5 : Problèmes courants

## 5.1 Surapprentissage

### Signes
- ✅ Train excellent
- ❌ Test mauvais
- 📈 Écart croissant

### Solutions

#### 1. Dropout
```python
keras.layers.Dropout(0.3)  # 30%
```

#### 2. Régularisation
```python
kernel_regularizer=regularizers.l2(0.01)
```

#### 3. Early Stopping
```python
EarlyStopping(patience=10)
```

#### 4. Plus de données
- Collecter plus
- Data augmentation

## 5.2 Sous-apprentissage

### Signes
- ❌ Train mauvais
- ❌ Test mauvais

### Solutions
- Modèle plus complexe
- Plus d'époques
- Meilleures features

---

# Chapitre 6 : Projet - Fruits

## 6.1 Objectif

Classifier 3 fruits congolais :
- 🍌 Banane
- 🥭 Mangue
- 🍍 Ananas

## 6.2 Features

1. Longueur (cm)
2. Largeur (cm)
3. Poids (g)
4. Couleur (0-1)
5. Texture (0-1)

## 6.3 Architecture

```
Input (5) → Dense(32) → Dropout(0.3) 
→ Dense(16) → Dropout(0.2) 
→ Dense(8) → Output(3)
```

## 6.4 Code complet

```python
# Données
X = np.array([...])  # 300 exemples
y = np.array([...])  # Labels 0,1,2

# Normaliser
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# One-hot encoding
y_cat = keras.utils.to_categorical(y, 3)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_cat, test_size=0.2
)

# Modèle
model = keras.Sequential([
    keras.layers.Dense(32, activation='relu', input_shape=(5,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(8, activation='relu'),
    keras.layers.Dense(3, activation='softmax')
])

# Compiler
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Entraîner
history = model.fit(
    X_train, y_train,
    validation_split=0.2,
    epochs=100,
    callbacks=[EarlyStopping(patience=20)]
)

# Évaluer
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Précision: {test_acc*100:.2f}%")
```

## 6.5 Résultats attendus

- **Précision** : > 90%
- **Temps** : 2-3 minutes
- **Paramètres** : ~900

---

# Exercices pratiques

## Exercice 1 : Perceptron ⭐
Créer un neurone pour prédire réussite étudiant.

## Exercice 2 : Learning Rate ⭐⭐
Tester différents learning rates.

## Exercice 3 : Architecture ⭐⭐
Créer un réseau pour prédire rendement agricole.

## Exercice 4 : Surapprentissage ⭐⭐⭐
Comparer modèle avec/sans dropout.

## Exercice 5 : Amélioration ⭐⭐⭐
Améliorer le modèle de fruits.

---

# Ressources

## Cours en ligne
- Deep Learning Specialization (Coursera)
- Fast.ai
- TensorFlow Tutorials

## Livres
- "Deep Learning" - Goodfellow
- "Hands-On ML" - Géron

## Communautés
- Kaggle
- Papers With Code
- Reddit r/MachineLearning

---

**Félicitations ! Module terminé ! 🎉**

*Continuez à pratiquer et explorer !*
