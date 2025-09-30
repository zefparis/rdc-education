# Module Machine Learning Fondamental - Support de cours

## Plateforme IA-Solution RDC

**Niveau :** Débutant/Intermédiaire  
**Durée :** 6 semaines  
**Prérequis :** Python, bases de mathématiques

---

## 📋 Table des matières

1. [Introduction au Machine Learning](#chapitre-1)
2. [Types d'apprentissage](#chapitre-2)
3. [Algorithmes fondamentaux](#chapitre-3)
4. [Entraînement et validation](#chapitre-4)
5. [Applications en RDC](#chapitre-5)
6. [Projet final](#chapitre-6)

---

# Chapitre 1 : Introduction au Machine Learning

## 1.1 Définition

Le **Machine Learning** (ML) est la capacité des ordinateurs à apprendre à partir de données sans être explicitement programmés.

### Différence avec programmation classique

| Programmation classique | Machine Learning |
|------------------------|------------------|
| Règles explicites | Apprentissage des règles |
| If/else, boucles | Modèles statistiques |
| Déterministe | Probabiliste |
| Rigide | Adaptable |

## 1.2 Applications

- **Santé** : Diagnostic médical
- **Agriculture** : Prédiction de rendement
- **Finance** : Détection de fraudes
- **Commerce** : Recommandations
- **Transport** : Véhicules autonomes

## 1.3 Applications RDC

- 🏥 **Santé** : Détection du paludisme
- 🌾 **Agriculture** : Prédiction récoltes manioc
- 💰 **Finance** : Détection fraudes mobile money
- 📚 **Éducation** : Prédiction réussite étudiants

---

# Chapitre 2 : Types d'apprentissage

## 2.1 Apprentissage supervisé

**Données** : Features (X) + Labels (y)  
**Objectif** : Prédire y à partir de X

### Régression
Prédire une valeur continue
- Exemple : Prix, température, rendement

### Classification
Prédire une catégorie
- Exemple : Spam/Non-spam, Malade/Sain

## 2.2 Apprentissage non supervisé

**Données** : Features (X) seulement  
**Objectif** : Trouver des patterns

### Clustering
Regrouper données similaires
- Exemple : Segmentation clients

## 2.3 Apprentissage par renforcement

**Principe** : Agent apprend par essai-erreur  
**Exemple** : Jeux vidéo, robotique

---

# Chapitre 3 : Algorithmes fondamentaux

## 3.1 Régression linéaire

**Équation** : y = ax + b

**Usage** : Prédire valeurs continues

**Exemple** :
```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

## 3.2 Régression logistique

**Usage** : Classification binaire

**Exemple** :
```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

## 3.3 k-Nearest Neighbors (kNN)

**Principe** : Classer selon les k voisins les plus proches

**Exemple** :
```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)
```

## 3.4 Arbres de décision

**Principe** : Séquence de questions

**Exemple** :
```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)
```

## 3.5 k-Means

**Usage** : Clustering

**Exemple** :
```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3)
model.fit(X)
labels = model.predict(X)
```

---

# Chapitre 4 : Entraînement et validation

## 4.1 Split train/test

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

## 4.2 Validation croisée

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5)
print(f"Précision moyenne : {scores.mean():.2f}")
```

## 4.3 Métriques

### Régression
- MAE, MSE, RMSE, R²

### Classification
- Accuracy, Precision, Recall, F1-Score

## 4.4 Surapprentissage

**Problème** : Modèle trop complexe  
**Solution** : Régularisation, plus de données

---

# Chapitre 5 : Applications RDC

## 5.1 Agriculture

**Prédiction rendement manioc**
- Features : Pluie, engrais, température
- Target : Rendement (tonnes/hectare)
- Modèle : Régression linéaire

## 5.2 Santé

**Détection paludisme**
- Features : Température, symptômes
- Target : Malade/Sain
- Modèle : Régression logistique

## 5.3 Finance

**Détection fraudes**
- Features : Montant, heure, localisation
- Target : Fraude/Normal
- Modèle : Random Forest

---

# Chapitre 6 : Projet final

## Objectif

Créer un modèle ML complet pour prédire le prix du manioc.

## Étapes

1. Collecte de données
2. Préparation (nettoyage, split)
3. Entraînement (plusieurs modèles)
4. Validation (métriques)
5. Sélection du meilleur modèle
6. Prédictions

## Livrables

- Code complet
- Rapport d'analyse
- Visualisations
- Présentation

---

# Exercices

## Exercice 1 : Régression linéaire ⭐
Prédire le prix en fonction de la quantité

## Exercice 2 : Classification ⭐⭐
Classifier des SMS (spam/normal)

## Exercice 3 : kNN ⭐⭐
Classifier des fruits

## Exercice 4 : Clustering ⭐⭐⭐
Segmenter des clients

## Exercice 5 : Projet final ⭐⭐⭐
Modèle complet de prédiction

---

# Ressources

## Documentation
- [Scikit-learn](https://scikit-learn.org/)
- [Pandas](https://pandas.pydata.org/)
- [NumPy](https://numpy.org/)

## Cours
- Machine Learning (Coursera - Andrew Ng)
- Fast.ai
- DataCamp

## Livres
- "Hands-On Machine Learning" - Aurélien Géron
- "Introduction to Machine Learning with Python"

---

**Félicitations ! Module terminé ! 🎉**
