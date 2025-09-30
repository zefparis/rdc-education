# Module MLOps - Support de cours

## Plateforme IA-Solution RDC

**Niveau :** Intermédiaire/Avancé  
**Durée :** 7 semaines  
**Prérequis :** Python, Machine Learning, Deep Learning

---

## 📋 Table des matières

1. [Introduction au MLOps](#chapitre-1)
2. [Cycle de vie d'un modèle IA](#chapitre-2)
3. [Outils MLOps](#chapitre-3)
4. [Exemple pratique](#chapitre-4)
5. [Applications en RDC](#chapitre-5)
6. [Projet final](#chapitre-6)

---

# Chapitre 1 : Introduction au MLOps

## 1.1 Qu'est-ce que le MLOps ?

**MLOps** (Machine Learning Operations) = Ensemble des pratiques pour déployer et maintenir des modèles ML en production.

### Différences Data Science vs MLOps

| Aspect | Data Science | MLOps |
|--------|--------------|-------|
| **Objectif** | Créer un modèle | Déployer et maintenir |
| **Environnement** | Notebook, local | Serveurs, production |
| **Focus** | Précision | Fiabilité, scalabilité |
| **Outils** | Pandas, Scikit-learn | Docker, Kubernetes |

## 1.2 Pourquoi le MLOps ?

### Problèmes sans MLOps
- "Ça marche sur mon ordinateur"
- Modèles non reproductibles
- Dégradation des performances
- Déploiement lent et risqué

### Solutions avec MLOps
- Containerisation (Docker)
- Versioning (Git, DVC)
- Monitoring
- CI/CD

## 1.3 Applications en RDC

- 🏥 **Santé** : Diagnostic dans plusieurs hôpitaux
- 🌾 **Agriculture** : API de prédiction de rendement
- ⚡ **Énergie** : Optimisation de la consommation
- 💰 **Finance** : Détection de fraudes en temps réel

---

# Chapitre 2 : Cycle de vie d'un modèle

## 2.1 Les 7 étapes

```
1. Collecte de données
2. Préparation
3. Entraînement
4. Évaluation
5. Déploiement
6. Monitoring
7. Réentraînement
```

## 2.2 Bonnes pratiques

### Collecte
- Qualité > Quantité
- Documentation complète
- Versioning avec DVC

### Préparation
- Nettoyage systématique
- Normalisation/Standardisation
- Split train/val/test

### Entraînement
- Expérimentation multiple
- Tracking avec MLflow
- Sauvegarde des métadonnées

### Déploiement
- API REST (FastAPI)
- Batch processing
- Edge deployment

### Monitoring
- Performance du modèle
- Performance système
- Métriques métiers

---

# Chapitre 3 : Outils MLOps

## 3.1 Git et GitHub

**Commandes essentielles :**
```bash
git init
git add .
git commit -m "Message"
git push origin main
```

**Structure projet ML :**
```
projet-ml/
├── data/
├── notebooks/
├── src/
├── models/
├── tests/
├── requirements.txt
├── Dockerfile
└── README.md
```

## 3.2 Docker

**Dockerfile exemple :**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

**Commandes :**
```bash
docker build -t mon-modele .
docker run -p 8000:8000 mon-modele
```

## 3.3 MLflow

**Composants :**
- Tracking : Métriques et paramètres
- Projects : Packager le code
- Models : Format standard
- Registry : Gestion centralisée

**Exemple :**
```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.sklearn.log_model(model, "model")
```

## 3.4 CI/CD

**Pipeline typique :**
```
Code → Tests → Build → Deploy
```

**Outils :**
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

---

# Chapitre 4 : Exemple pratique

## 4.1 API REST avec FastAPI

```python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

model = joblib.load('model.pkl')
app = FastAPI()

class PredictionInput(BaseModel):
    feature1: float
    feature2: float

@app.post("/predict")
def predict(data: PredictionInput):
    prediction = model.predict([[data.feature1, data.feature2]])
    return {"prediction": int(prediction[0])}
```

## 4.2 Déploiement

**Étapes :**
1. Créer l'API (FastAPI)
2. Créer Dockerfile
3. Build l'image
4. Lancer le container
5. Tester

**Commandes :**
```bash
uvicorn main:app --reload
docker build -t api-ml .
docker run -p 8000:8000 api-ml
```

---

# Chapitre 5 : Applications RDC

## 5.1 Santé

**Système de diagnostic du paludisme**
- Déployé dans 10 hôpitaux
- API centrale
- Monitoring en temps réel
- Alertes automatiques

## 5.2 Agriculture

**Application mobile agriculteurs**
- Prédiction de rendement
- Recommandations d'engrais
- Réentraînement mensuel
- A/B testing

## 5.3 Énergie

**Prédiction demande électrique**
- Optimisation production
- Réduction des coupures
- Réentraînement quotidien
- Monitoring temps réel

---

# Chapitre 6 : Projet final

## Objectif

Créer un système MLOps complet pour prédiction météo.

## Spécifications

1. **Modèle** : Classification binaire (pluie/pas pluie)
2. **Versioning** : Git + MLflow
3. **API** : FastAPI avec documentation
4. **Docker** : Image < 500 MB
5. **Monitoring** : Dashboard + alertes

## Livrables

- Code source (GitHub)
- Modèle entraîné
- API fonctionnelle
- Dockerfile
- Documentation
- Présentation

## Évaluation

- Code : 20%
- Modèle : 20%
- API : 20%
- Docker : 15%
- Monitoring : 15%
- Documentation : 10%

---

# Exercices pratiques

## Exercice 1 : Cycle de vie ⭐⭐
Créez un modèle de prédiction de rendement agricole complet.

## Exercice 2 : MLflow ⭐⭐
Comparez 3 modèles avec MLflow tracking.

## Exercice 3 : API ⭐⭐⭐
Créez une API REST avec FastAPI et Dockerfile.

## Exercice 4 : Monitoring ⭐⭐⭐
Créez un dashboard de monitoring avec alertes.

## Exercice 5 : Projet final ⭐⭐⭐
Système MLOps complet pour prédiction météo.

---

# Ressources

## Documentation
- [MLflow](https://mlflow.org/docs/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Docker](https://docs.docker.com/)

## Cours
- MLOps Specialization (DeepLearning.AI)
- Full Stack Deep Learning

## Livres
- "Designing ML Systems" - Chip Huyen
- "ML Engineering" - Andriy Burkov

---

**Félicitations ! Module terminé ! 🎉**
