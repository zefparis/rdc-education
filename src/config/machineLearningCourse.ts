import { Module } from './enhancedCourseConfig';

export const machineLearningCourse: Module = {
  id: '2',
  slug: 'machine-learning',
  title: 'Machine Learning Appliqué',
  description: 'Apprenez à créer des modèles prédictifs avec scikit-learn : régression, classification, clustering et évaluation de modèles.',
  duration: '10 semaines',
  level: 'Intermédiaire',
  icon: '🤖',
  color: 'from-green-500 to-blue-500',
  image: '/images/machine-learning.jpg',
  pdf: '/modules/machine-learning/README.md',
  notebook: '/modules/machine-learning/module-ml.ipynb',
  audio: '/audio/module-machine-learning.mp3',
  colabUrl: 'https://colab.research.google.com/github/ia-solution-rdc/ml/blob/main/module-ml.ipynb',
  objectives: [
    'Comprendre les concepts fondamentaux du Machine Learning',
    'Maîtriser les algorithmes de régression et classification',
    'Savoir préparer et nettoyer les données pour l\'apprentissage',
    'Évaluer correctement les performances des modèles',
    'Optimiser les hyperparamètres pour améliorer les résultats',
    'Déployer des modèles en production'
  ],
  prerequisites: [
    'Connaissances solides en Python et Pandas (module Data Science)',
    'Notions de statistiques et probabilités',
    'Compréhension de l\'algèbre linéaire de base',
    'Logique de programmation orientée objet'
  ],
  sections: [
    {
      id: 'ml-fundamentals',
      title: 'Concepts fondamentaux du Machine Learning',
      content: `
        <div class="course-section">
          <h3>Qu'est-ce que le Machine Learning ?</h3>
          <p>Le Machine Learning (ML) est un sous-domaine de l'Intelligence Artificielle qui permet aux ordinateurs d'apprendre à partir de données sans être explicitement programmés pour chaque tâche.</p>

          <h4>Les trois paradigmes d'apprentissage :</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
            <div style="padding: 15px; background-color: #e6f3ff; border-radius: 8px; border-left: 4px solid #0066cc;">
              <h5 style="color: #0066cc; margin-top: 0;">🔍 Apprentissage Supervisé</h5>
              <p>Données étiquetées → prédictions</p>
              <ul>
                <li><strong>Classification :</strong> Catégoriser (spam/ham, maladie/présence)</li>
                <li><strong>Régression :</strong> Prédire valeurs continues (prix, température)</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #fff3e6; border-radius: 8px; border-left: 4px solid #ff6600;">
              <h5 style="color: #ff6600; margin-top: 0;">🎯 Apprentissage Non Supervisé</h5>
              <p>Données non étiquetées → découverte de patterns</p>
              <ul>
                <li><strong>Clustering :</strong> Grouper données similaires</li>
                <li><strong>Réduction de dimension :</strong> Simplifier données</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #e6ffe6; border-radius: 8px; border-left: 4px solid #00cc00;">
              <h5 style="color: #00cc00; margin-top: 0;">🎮 Apprentissage par Renforcement</h5>
              <p>Agent apprend par interaction avec environnement</p>
              <ul>
                <li><strong>Récompenses/Pénalités :</strong> Optimisation de stratégie</li>
                <li><strong>Applications :</strong> Jeux, robotique, trading</li>
              </ul>
            </div>
          </div>

          <h3>Le pipeline ML standard</h3>
          <ol>
            <li><strong>Collecte des données</strong> - Rassembler des données pertinentes</li>
            <li><strong>Préparation des données</strong> - Nettoyage, transformation, ingénierie</li>
            <li><strong>Exploration des données</strong> - Analyse et visualisation</li>
            <li><strong>Sélection du modèle</strong> - Choix de l'algorithme approprié</li>
            <li><strong>Entraînement</strong> - Apprentissage sur données d'entraînement</li>
            <li><strong>Évaluation</strong> - Mesure des performances</li>
            <li><strong>Optimisation</strong> - Amélioration des résultats</li>
            <li><strong>Déploiement</strong> - Mise en production</li>
          </ol>

          <div class="warning-box">
            <strong>⚠️ Important :</strong> Un modèle ne sera jamais meilleur que la qualité des données sur lesquelles il apprend.
          </div>
        </div>
      `,
      order: 1,
      estimatedTime: '2h 30min',
      codeExamples: [
        {
          title: 'Introduction à scikit-learn',
          description: 'Découverte de la bibliothèque ML principale en Python',
          code: `import numpy as np
import pandas as pd
from sklearn.datasets import load_iris, make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. Chargement d'un dataset classique
print("🌸 Dataset Iris (classification)")
iris = load_iris()
X, y = iris.data, iris.target

print(f"Dimensions: {X.shape}")
print(f"Features: {iris.feature_names}")
print(f"Classes: {iris.target_names}")
print(f"Distribution des classes: {np.bincount(y)}")

# 2. Création d'un dataset synthétique
print("\\n🛠️ Dataset synthétique (régression)")
X_reg, y_reg = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=5,
    n_redundant=2,
    n_clusters_per_class=1,
    random_state=42
)

print(f"Dataset de régression: {X_reg.shape}")
print(f"Valeurs cibles: min={y_reg.min()}, max={y_reg.max()}")

# 3. Division des données
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

print(f"\\n📊 Division des données:")
print(f"Entraînement: {X_train.shape}, Test: {X_test.shape}")

# 4. Préparation des données
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Moyenne avant scaling: {X_train.mean():.3f}")
print(f"Moyenne après scaling: {X_train_scaled.mean():.3f}")

# 5. Premier modèle - Régression Logistique
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train_scaled, y_train)

# 6. Prédictions et évaluation
y_pred = model.predict(X_test_scaled)

accuracy = accuracy_score(y_test, y_pred)
print(f"\\n🎯 Précision du modèle: {accuracy:.3f}")

print("\\n📋 Rapport de classification:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))

print("\\n🔍 Matrice de confusion:")
conf_matrix = confusion_matrix(y_test, y_pred)
print(conf_matrix)`,
          language: 'python',
          explanation: 'Ce code montre le processus complet de Machine Learning : chargement des données, préparation, entraînement et évaluation avec scikit-learn.'
        }
      ],
      exercises: [
        {
          id: 'ex-ml-pipeline',
          title: 'Implémentez votre premier pipeline ML',
          description: 'Créez un pipeline complet avec préprocessing et modèle pour le dataset Iris.',
          difficulty: 'facile',
          solution: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Création du pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(random_state=42))
])

# Entraînement
pipeline.fit(X_train, y_train)

# Évaluation
accuracy = pipeline.score(X_test, y_test)
print(f"Précision avec pipeline: {accuracy:.3f}")

# Les pipelines garantissent que le preprocessing est appliqué correctement`
        }
      ],
      resources: [
        {
          title: 'Documentation scikit-learn',
          type: 'documentation',
          url: 'https://scikit-learn.org/stable/user_guide.html'
        },
        {
          title: 'Introduction au Machine Learning - Stanford',
          type: 'video',
          url: 'https://www.coursera.org/learn/machine-learning'
        }
      ]
    },
    {
      id: 'regression-algorithms',
      title: 'Algorithmes de régression',
      content: `
        <div class="course-section">
          <h3>Régression linéaire et ses variantes</h3>
          <p>La régression est utilisée pour prédire des valeurs continues. Elle établit une relation mathématique entre variables indépendantes et dépendante.</p>

          <h4>Types de régression :</h4>
          <ul>
            <li><strong>Régression linéaire simple :</strong> Une variable indépendante</li>
            <li><strong>Régression linéaire multiple :</strong> Plusieurs variables indépendantes</li>
            <li><strong>Régression polynomiale :</strong> Variables avec termes non-linéaires</li>
            <li><strong>Régression régularisée :</strong> Prévention du surapprentissage</li>
          </ul>

          <h3>Métriques d'évaluation</h3>
          <ul>
            <li><strong>MAE (Mean Absolute Error) :</strong> Erreur absolue moyenne</li>
            <li><strong>MSE (Mean Squared Error) :</strong> Erreur quadratique moyenne</li>
            <li><strong>RMSE (Root Mean Squared Error) :</strong> Racine carrée du MSE</li>
            <li><strong>R² (Coefficient de détermination) :</strong> Qualité de l'ajustement</li>
          </ul>

          <div class="info-box">
            <strong>💡 Astuce :</strong> Choisissez la métrique selon votre problème. R² pour expliquer la variance, MAE pour l'erreur absolue.
          </div>
        </div>
      `,
      order: 2,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Régression linéaire avec Boston Housing',
          description: 'Prédiction du prix des maisons avec différents algorithmes de régression',
          code: `import numpy as np
import pandas as pd
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import matplotlib.pyplot as plt

# Note: load_boston est déprécié, utilisation d'un dataset alternatif
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X, y = housing.data, housing.target

print("🏠 Dataset California Housing")
print(f"Dimensions: {X.shape}")
print(f"Features: {housing.feature_names}")
print(f"Prix médian: {y.mean():.2f} (en $100,000)")

# Division des données
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 1. Régression Linéaire Simple
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
lr_pred = lr_model.predict(X_test)

print("\\n📈 Régression Linéaire:")
print(f"R²: {r2_score(y_test, lr_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, lr_pred)):.3f}")

# 2. Régression Ridge (L2 regularization)
ridge_model = Ridge(alpha=1.0)
ridge_model.fit(X_train, y_train)
ridge_pred = ridge_model.predict(X_test)

print("\\n🏔️ Régression Ridge:")
print(f"R²: {r2_score(y_test, ridge_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, ridge_pred)):.3f}")

# 3. Régression Lasso (L1 regularization)
lasso_model = Lasso(alpha=0.1)
lasso_model.fit(X_train, y_train)
lasso_pred = lasso_model.predict(X_test)

print("\\n🪢 Régression Lasso:")
print(f"R²: {r2_score(y_test, lasso_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, lasso_pred)):.3f}")

# 4. Random Forest (plus complexe)
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)

print("\\n🌳 Random Forest:")
print(f"R²: {r2_score(y_test, rf_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, rf_pred)):.3f}")

# Comparaison des coefficients
print("\\n📊 Comparaison des modèles:")
models = ['Linéaire', 'Ridge', 'Lasso', 'Random Forest']
predictions = [lr_pred, ridge_pred, lasso_pred, rf_pred]

for name, pred in zip(models, predictions):
    mae = mean_absolute_error(y_test, pred)
    rmse = np.sqrt(mean_squared_error(y_test, pred))
    r2 = r2_score(y_test, pred)
    print(f"{name"15"} | MAE: {mae"6.3f"} | RMSE: {rmse"6.3f"} | R²: {r2"6.3f"}")

# Validation croisée pour le meilleur modèle
cv_scores = cross_val_score(rf_model, X_train, y_train, cv=5, scoring='r2')
print(f"\\n✅ Validation croisée (R²): {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")`,
          language: 'python',
          explanation: 'Ce code compare différents algorithmes de régression sur un problème réel de prédiction de prix immobiliers.'
        }
      ],
      exercises: [
        {
          id: 'ex-regression-diabetes',
          title: 'Prédiction du diabète avec régression',
          description: 'Utilisez le dataset diabetes de scikit-learn pour prédire la progression de la maladie.',
          difficulty: 'moyen',
          solution: `from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# Chargement des données
diabetes = load_diabetes()
X, y = diabetes.data, diabetes.target

# Division
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modèle
model = LinearRegression()
model.fit(X_train, y_train)

# Évaluation
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
print(f"R² sur les données de test: {r2:.3f}")
print(f"Equation: y = {model.intercept_:.2f} + {model.coef_[0]:.2f}x1 + ...")`
        }
      ]
    },
    {
      id: 'classification-algorithms',
      title: 'Algorithmes de classification',
      content: `
        <div class="course-section">
          <h3>Classification : prédire des catégories</h3>
          <p>La classification consiste à prédire la classe d'appartenance d'une observation basée sur ses caractéristiques.</p>

          <h4>Principaux algorithmes :</h4>
          <ul>
            <li><strong>K-Nearest Neighbors (KNN) :</strong> Classification par proximité</li>
            <li><strong>Arbres de décision :</strong> Règles de classification séquentielles</li>
            <li><strong>Forêts aléatoires :</strong> Ensemble d'arbres pour robustesse</li>
            <li><strong>Support Vector Machines (SVM) :</strong> Séparation optimale des classes</li>
            <li><strong>Naïve Bayes :</strong> Probabilités conditionnelles</li>
          </ul>

          <h3>Matrices de confusion et métriques</h3>
          <ul>
            <li><strong>Accuracy :</strong> Pourcentage de prédictions correctes</li>
            <li><strong>Precision :</strong> Qualité des prédictions positives</li>
            <li><strong>Recall (Sensibilité) :</strong> Capacité à détecter les positifs</li>
            <li><strong>F1-Score :</strong> Moyenne harmonique de precision et recall</li>
          </ul>
        </div>
      `,
      order: 3,
      estimatedTime: '3h 30min',
      codeExamples: [
        {
          title: 'Classification avec différents algorithmes',
          description: 'Comparaison de plusieurs algorithmes de classification sur le dataset des vins',
          code: `import numpy as np
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import matplotlib.pyplot as plt

# Chargement du dataset
wine = load_wine()
X, y = wine.data, wine.target

print("🍷 Dataset Wine")
print(f"Dimensions: {X.shape}")
print(f"Classes: {wine.target_names}")
print(f"Distribution: {np.bincount(y)}")

# Division des données
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Préparation des données
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Dictionnaire des modèles
models = {
    'KNN': KNeighborsClassifier(n_neighbors=5),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(kernel='rbf', random_state=42),
    'Naive Bayes': GaussianNB()
}

# Entraînement et évaluation de chaque modèle
results = {}

for name, model in models.items():
    # Entraînement
    model.fit(X_train_scaled, y_train)

    # Prédictions
    y_pred = model.predict(X_test_scaled)

    # Métriques
    results[name] = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred, average='weighted'),
        'recall': recall_score(y_test, y_pred, average='weighted'),
        'f1': f1_score(y_test, y_pred, average='weighted')
    }

    print(f"\\n🍷 {name}:")
    print(f"Accuracy: {results[name]['accuracy']:.3f}")
    print(f"F1-Score: {results[name]['f1']:.3f}")

# Optimisation du meilleur modèle (Random Forest)
print("\\n🔍 Optimisation du Random Forest...")
rf_params = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10]
}

rf_grid = GridSearchCV(
    RandomForestClassifier(random_state=42),
    rf_params,
    cv=5,
    scoring='f1_weighted',
    n_jobs=-1
)

rf_grid.fit(X_train_scaled, y_train)
best_rf = rf_grid.best_estimator_

# Évaluation du modèle optimisé
y_pred_best = best_rf.predict(X_test_scaled)
print("🏆 Meilleur Random Forest:")
print(f"Meilleurs paramètres: {rf_grid.best_params_}")
print(f"Accuracy: {accuracy_score(y_test, y_pred_best):.3f}")
print(f"F1-Score: {f1_score(y_test, y_pred_best, average='weighted'):.3f}")

print("\\n📊 Rapport détaillé du meilleur modèle:")
print(classification_report(y_test, y_pred_best, target_names=wine.target_names))`,
          language: 'python',
          explanation: 'Cette comparaison montre comment différents algorithmes de classification performent sur un problème de reconnaissance de vins.'
        }
      ],
      exercises: [
        {
          id: 'ex-classification-digits',
          title: 'Classification de chiffres manuscrits',
          description: 'Utilisez le dataset digits de scikit-learn pour créer un modèle de reconnaissance de chiffres.',
          difficulty: 'moyen',
          solution: `from sklearn.datasets import load_digits
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

# Chargement des données
digits = load_digits()
X, y = digits.data, digits.target

print(f"Dataset: {X.shape} images de {digits.data.shape[1]} pixels")

# Division
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modèle
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Évaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision: {accuracy:.3f}")

# Matrice de confusion pour les chiffres difficiles (8 vs 3, etc.)
conf_matrix = confusion_matrix(y_test, y_pred)
print(f"Matrice de confusion:\\n{conf_matrix}")`
        }
      ]
    },
    {
      id: 'model-evaluation',
      title: 'Évaluation et validation des modèles',
      content: `
        <div class="course-section">
          <h3>L'importance de l'évaluation rigoureuse</h3>
          <p>Un modèle qui semble performant peut être trompeur. L'évaluation rigoureuse est cruciale pour :</p>
          <ul>
            <li><strong>Éviter le surapprentissage</strong> (overfitting)</li>
            <li><strong>Estimer les performances réelles</strong> sur de nouvelles données</li>
            <li><strong>Comparer objectivement</strong> différents modèles</li>
            <li><strong>Identifier les points d'amélioration</strong></li>
          </ul>

          <h3>Techniques de validation</h3>
          <ul>
            <li><strong>Train/Test Split :</strong> Division simple mais peut manquer de stabilité</li>
            <li><strong>Cross-Validation :</strong> Utilisation de k plis pour une meilleure estimation</li>
            <li><strong>Validation croisée stratifiée :</strong> Maintien de la distribution des classes</li>
            <li><strong>Leave-One-Out CV :</strong> Pour petits datasets</li>
          </ul>

          <h3>Surapprentissage vs Sous-apprentissage</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="padding: 15px; background-color: #ffe6e6; border-radius: 8px; border-left: 4px solid #cc0000;">
              <h5 style="color: #cc0000; margin-top: 0;">🔥 Surapprentissage (Overfitting)</h5>
              <p>Modèle trop complexe qui mémorise les données d'entraînement</p>
              <ul>
                <li>Performance excellente sur train</li>
                <li>Performance médiocre sur test</li>
                <li>Écart important entre train/test</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #e6f3ff; border-radius: 8px; border-left: 4px solid #0066cc;">
              <h5 style="color: #0066cc; margin-top: 0;">❄️ Sous-apprentissage (Underfitting)</h5>
              <p>Modèle trop simple qui ne capture pas les patterns</p>
              <ul>
                <li>Performance médiocre sur train</li>
                <li>Performance similaire sur test</li>
                <li>Modèle à complexifier</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      order: 4,
      estimatedTime: '2h',
      codeExamples: [
        {
          title: 'Validation croisée et courbes d\'apprentissage',
          description: 'Techniques avancées d\'évaluation pour diagnostiquer les problèmes de modèle',
          code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score, learning_curve, validation_curve
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import StratifiedKFold

# Création d'un dataset déséquilibré pour montrer l'importance de la stratification
X, y = make_classification(
    n_samples=1000,
    n_features=20,
    n_informative=10,
    n_redundant=10,
    n_classes=3,
    n_clusters_per_class=1,
    weights=[0.7, 0.2, 0.1],  # Classes déséquilibrées
    random_state=42
)

print(f"Distribution des classes: {np.bincount(y)}")

# Division classique vs stratifiée
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

print(f"Distribution train (non-stratifiée): {np.bincount(y_train)}")
print(f"Distribution test (non-stratifiée): {np.bincount(y_test)}")

# Avec stratification
X_train_strat, X_test_strat, y_train_strat, y_test_strat = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

print(f"Distribution train (stratifiée): {np.bincount(y_train_strat)}")
print(f"Distribution test (stratifiée): {np.bincount(y_test_strat)}")

# 1. Validation croisée classique
models = {
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

for name, model in models.items():
    # Validation croisée simple
    cv_scores = cross_val_score(model, X_train_strat, y_train_strat, cv=5)
    print(f"\\n📊 {name} - CV Scores: {cv_scores}")
    print(f"CV Mean: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")

    # Validation croisée stratifiée
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores_strat = cross_val_score(model, X_train_strat, y_train_strat, cv=skf)
    print(f"CV Stratifié Mean: {cv_scores_strat.mean():.3f} (+/- {cv_scores_strat.std() * 2:.3f})")

# 2. Courbes d'apprentissage pour diagnostiquer le surapprentissage
print("\\n📈 Analyse des courbes d'apprentissage...")

train_sizes = np.linspace(0.1, 1.0, 10)

for name, model in models.items():
    train_sizes_abs, train_scores, val_scores = learning_curve(
        model, X_train_strat, y_train_strat,
        train_sizes=train_sizes, cv=5, random_state=42
    )

    plt.figure(figsize=(12, 4))

    plt.subplot(1, 2, 1)
    plt.plot(train_sizes_abs, train_scores.mean(axis=1), 'o-', label='Train')
    plt.plot(train_sizes_abs, val_scores.mean(axis=1), 'o-', label='Validation')
    plt.fill_between(train_sizes_abs,
                     train_scores.mean(axis=1) - train_scores.std(axis=1),
                     train_scores.mean(axis=1) + train_scores.std(axis=1),
                     alpha=0.1)
    plt.fill_between(train_sizes_abs,
                     val_scores.mean(axis=1) - val_scores.std(axis=1),
                     val_scores.mean(axis=1) + val_scores.std(axis=1),
                     alpha=0.1)
    plt.xlabel('Taille du training set')
    plt.ylabel('Score')
    plt.title(f'Courbes d\\'apprentissage - {name}')
    plt.legend()
    plt.grid(True, alpha=0.3)

    plt.subplot(1, 2, 2)
    gap = train_scores.mean(axis=1) - val_scores.mean(axis=1)
    plt.plot(train_sizes_abs, gap, 'o-')
    plt.fill_between(train_sizes_abs,
                     gap - (train_scores.std(axis=1) + val_scores.std(axis=1)),
                     gap + (train_scores.std(axis=1) + val_scores.std(axis=1)),
                     alpha=0.1)
    plt.xlabel('Taille du training set')
    plt.ylabel('Gap Train-Validation')
    plt.title(f'Gap d\\'apprentissage - {name}')
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

print("\\n✅ Diagnostic: Un gap important indique du surapprentissage")`,
          language: 'python',
          explanation: 'Cette analyse approfondie montre comment diagnostiquer les problèmes de modèle avec des techniques de validation avancées.'
        }
      ],
      exercises: [
        {
          id: 'ex-validation-cv',
          title: 'Implémentez une validation croisée personnalisée',
          description: 'Créez une fonction qui effectue une validation croisée manuelle pour comprendre le processus.',
          difficulty: 'difficile',
          solution: `import numpy as np
from sklearn.model_selection import KFold
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

def custom_cross_validation(X, y, model, k=5):
    kf = KFold(n_splits=k, shuffle=True, random_state=42)
    scores = []

    for train_idx, val_idx in kf.split(X):
        X_train, X_val = X[train_idx], X[val_idx]
        y_train, y_val = y[train_idx], y[val_idx]

        model_fold = LogisticRegression(random_state=42, max_iter=1000)
        model_fold.fit(X_train, y_train)

        y_pred = model_fold.predict(X_val)
        score = accuracy_score(y_val, y_pred)
        scores.append(score)

    return scores

# Test de la fonction
scores = custom_cross_validation(X_train_strat, y_train_strat, LogisticRegression())
print(f"Scores CV personnalisée: {scores}")
print(f"Moyenne: {np.mean(scores):.3f} (+/- {np.std(scores) * 2:.3f})")`
        }
      ]
    }
  ],
  finalProject: {
    title: 'Projet Machine Learning End-to-End',
    description: 'Développez un modèle prédictif complet sur un problème réel de votre choix avec déploiement d\'une API.',
    requirements: [
      'Collecte et préparation d\'un dataset réel (minimum 1000 échantillons)',
      'Analyse exploratoire approfondie avec visualisations',
      'Comparaison d\'au moins 4 algorithmes différents',
      'Optimisation des hyperparamètres avec GridSearch ou RandomSearch',
      'Évaluation rigoureuse avec validation croisée et métriques appropriées',
      'Interface web simple (Streamlit/Flask) pour utiliser le modèle',
      'Analyse des erreurs et interprétabilité du modèle',
      'Documentation complète du projet'
    ],
    deliverables: [
      'Notebook Jupyter d\'analyse et modélisation',
      'Code source du modèle optimisé et sauvegardé',
      'Application web fonctionnelle avec interface utilisateur',
      'Rapport technique détaillé (10-15 pages)',
      'Présentation orale de 15 minutes',
      'Code de déploiement (Dockerfile, requirements.txt)',
      'Jeu de données nettoyé et documenté'
    ]
  },
  resources: [
    {
      title: 'Scikit-learn documentation complète',
      type: 'documentation',
      url: 'https://scikit-learn.org/stable/documentation.html'
    },
    {
      title: 'Machine Learning Yearning - Andrew Ng',
      type: 'article',
      url: 'https://www.mlyearning.org/'
    },
    {
      title: 'Kaggle Learn - Machine Learning',
      type: 'video',
      url: 'https://www.kaggle.com/learn/intro-to-machine-learning'
    },
    {
      title: 'Towards Data Science - ML Tutorials',
      type: 'article',
      url: 'https://towardsdatascience.com/tagged/machine-learning'
    }
  ],
  tags: ['machine-learning', 'scikit-learn', 'classification', 'regression', 'validation', 'python', 'data-science']
};
