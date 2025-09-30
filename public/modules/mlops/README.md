# Module MLOps - Documentation

## Plateforme IA-Solution RDC

**Niveau :** Intermédiaire/Avancé  
**Durée :** 7 semaines  
**Prérequis :** Python, ML, Deep Learning

---

## 📁 Contenu du module

### 1. **module-mlops-complet.ipynb**
Notebook Jupyter interactif complet

- 6 chapitres détaillés
- Code Python exécutable
- 5 exercices pratiques
- Projet final complet
- Exemples RDC

### 2. **mlops-cours.md**
Support de cours pédagogique

- ~30 pages
- Théorie complète
- Exemples de code
- Exercices
- Convertible en PDF

### 3. **audio-introduction.txt**
Script pour voix-off (~2 minutes)

---

## 🎯 Objectifs pédagogiques

### Connaissances
- ✅ Comprendre le MLOps
- ✅ Maîtriser le cycle de vie ML
- ✅ Connaître les outils (Git, Docker, MLflow)

### Compétences
- ✅ Versionner code et modèles
- ✅ Créer des APIs REST
- ✅ Containeriser avec Docker
- ✅ Suivre avec MLflow
- ✅ Monitorer en production

### Applications
- ✅ Déployer en RDC
- ✅ Maintenir des modèles
- ✅ Créer des systèmes fiables

---

## 📊 Structure (7 semaines)

### Semaine 1 : Introduction
- MLOps vs Data Science
- Cycle de vie
- Applications RDC

### Semaine 2 : Git et versioning
- Commandes Git
- GitHub
- Structure de projet

### Semaine 3 : Docker
- Containerisation
- Dockerfile
- Images et containers

### Semaine 4 : MLflow
- Tracking
- Expérimentations
- Comparaison de modèles

### Semaine 5 : FastAPI
- Création d'API
- Documentation
- Tests

### Semaine 6 : Monitoring
- Métriques
- Dashboard
- Alertes

### Semaine 7 : Projet final
- Système complet
- Déploiement
- Présentation

---

## 💡 Exemples RDC

### 🏥 Santé
**Détection du paludisme**
- API déployée dans 10 hôpitaux
- Monitoring temps réel
- Alertes automatiques

### 🌾 Agriculture
**Prédiction de rendement**
- Application mobile
- Réentraînement mensuel
- Recommandations personnalisées

### ⚡ Énergie
**Optimisation électrique**
- Prédiction de demande
- Réduction des coupures
- Monitoring continu

---

## 🛠️ Outils nécessaires

### Installation

```bash
# Python 3.8+
pip install scikit-learn pandas numpy
pip install mlflow fastapi uvicorn
pip install docker

# Docker
# Télécharger depuis docker.com
```

### Configuration

```bash
# Git
git config --global user.name "Votre Nom"
git config --global user.email "email@example.com"

# MLflow
mlflow ui  # http://localhost:5000

# FastAPI
uvicorn main:app --reload  # http://localhost:8000
```

---

## 📚 Ressources

### Documentation
- [MLflow](https://mlflow.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Docker](https://docs.docker.com/)
- [Git](https://git-scm.com/doc)

### Cours en ligne
- MLOps Specialization (DeepLearning.AI)
- Machine Learning Engineering for Production
- Full Stack Deep Learning

### Livres
- "Designing Machine Learning Systems" - Chip Huyen
- "Building ML Powered Applications" - Emmanuel Ameisen
- "Machine Learning Engineering" - Andriy Burkov

### Communautés
- Reddit r/MLOps
- MLOps Community Slack
- LinkedIn MLOps groups

---

## 🚀 Guide d'utilisation

### Pour les étudiants

**Semaine par semaine :**
1. Lire le chapitre
2. Exécuter le notebook
3. Faire l'exercice
4. Pratiquer

**Projet final :**
- Choisir un cas d'usage
- Suivre les étapes
- Documenter
- Présenter

### Pour les enseignants

**Préparation :**
- [ ] Tester le notebook
- [ ] Installer Docker
- [ ] Configurer MLflow
- [ ] Préparer exemples

**En classe :**
- [ ] Audio intro (2 min)
- [ ] Théorie (30 min)
- [ ] Démonstration (45 min)
- [ ] Exercices (45 min)

**Évaluation :**
- Quiz : 20%
- Exercices : 30%
- Projet : 50%

---

## ✅ Checklist

### Concepts
- [ ] Je comprends le MLOps
- [ ] Je connais le cycle de vie
- [ ] Je maîtrise les outils

### Compétences
- [ ] Je sais utiliser Git
- [ ] Je crée des Dockerfiles
- [ ] J'utilise MLflow
- [ ] Je déploie avec FastAPI
- [ ] Je monitore des modèles

### Projet
- [ ] Modèle entraîné
- [ ] API fonctionnelle
- [ ] Dockerfile créé
- [ ] Monitoring implémenté
- [ ] Documentation complète

---

## 🎓 Évaluation

### Quiz (20 points)
1. Qu'est-ce que le MLOps ? (4 pts)
2. Étapes du cycle de vie ? (4 pts)
3. Utilité de Docker ? (4 pts)
4. Qu'est-ce que MLflow ? (4 pts)
5. Applications en RDC ? (4 pts)

### Exercices (30 points)
- Exercice 1 : 5 pts
- Exercice 2 : 5 pts
- Exercice 3 : 8 pts
- Exercice 4 : 7 pts
- Exercice 5 : 5 pts

### Projet final (50 points)
- Code : 10 pts
- Modèle : 10 pts
- API : 10 pts
- Docker : 8 pts
- Monitoring : 7 pts
- Documentation : 5 pts

---

## 🔧 Dépannage

### Docker ne démarre pas
```bash
# Windows : Activer Hyper-V
# Linux : sudo systemctl start docker
```

### MLflow UI ne s'affiche pas
```bash
mlflow ui --host 0.0.0.0 --port 5000
```

### API FastAPI erreur
```bash
# Vérifier les dépendances
pip install -r requirements.txt

# Relancer
uvicorn main:app --reload
```

---

## 📞 Support

**Email :** support@ia-solution-rdc.cd  
**Forum :** forum.ia-solution-rdc.cd  
**GitHub :** github.com/ia-solution-rdc

---

## 📝 Licence

**Creative Commons BY-NC-SA 4.0**

- ✅ Partage libre
- ✅ Adaptation autorisée
- 📌 Attribution requise
- 📌 Usage non commercial

---

## 🔄 Mises à jour

**Version 1.0** (2025)
- Création initiale
- 6 chapitres
- 5 exercices
- Projet final

**Prochaines versions :**
- [ ] Kubernetes
- [ ] CI/CD avancé
- [ ] Feature stores
- [ ] A/B testing

---

**Bon apprentissage ! 🚀**

*Pour toute suggestion, contactez-nous.*
