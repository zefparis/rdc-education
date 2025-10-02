import { Module } from './enhancedCourseConfig';

export const dataScienceModule: Module = {
  id: '1',
  slug: 'data-science',
  title: 'Data Science Fondamentale',
  description: 'Maîtrisez les fondamentaux de la Data Science : Python, Pandas, visualisation et statistiques pour analyser vos données efficacement.',
  duration: '8 semaines',
  level: 'Débutant',
  icon: '📊',
  color: 'from-blue-500 to-cyan-500',
  image: '/images/data-science.jpg',
  pdf: '/modules/data-science/README.md',
  notebook: '/modules/data-science/module_data-science.ipynb',
  audio: '/audio/module_data-science.mp3',
  colabUrl: 'https://colab.research.google.com/github/ia-solution-rdc/data-science/blob/main/module_data-science.ipynb',
  objectives: [
    'Maîtriser les bases de Python pour la Data Science',
    'Manipuler et nettoyer des données avec Pandas',
    'Créer des visualisations percutantes avec Matplotlib et Seaborn',
    'Comprendre et appliquer les statistiques descriptives',
    'Réaliser une analyse exploratoire de données complète'
  ],
  prerequisites: [
    'Connaissances de base en mathématiques (algèbre, statistiques)',
    'Logique de programmation souhaitée mais non obligatoire',
    'Curiosité pour les données et leur analyse'
  ],
  sections: [
    {
      id: 'python-basics',
      title: 'Introduction à Python pour la Data Science',
      content: `
        <div class="course-section">
          <h2>Pourquoi Python pour la Data Science ?</h2>
          <p>Python est le langage de référence en Data Science grâce à :</p>
          <ul>
            <li><strong>Simplicité :</strong> Syntaxe claire et lisible</li>
            <li><strong>Polyvalence :</strong> De l'analyse à la production</li>
            <li><strong>Écosystème :</strong> Bibliothèques spécialisées</li>
            <li><strong>Communauté :</strong> Support et ressources abondantes</li>
          </ul>

          <h3>1. Installation et configuration</h3>
          <p>Nous recommandons Anaconda qui inclut :</p>
          <ul>
            <li>Python 3.8+</li>
            <li>Jupyter Notebook/Lab</li>
            <li>Bibliothèques essentielles préinstallées</li>
          </ul>
          
          <h3>2. Les bases de Python pour la Data Science</h3>
          <p>Les concepts clés à maîtriser :</p>
          <ul>
            <li>Structures de données (listes, dictionnaires, tuples, sets)</li>
            <li>Boucles et compréhensions</li>
            <li>Fonctions et programmation orientée objet</li>
            <li>Gestion des erreurs</li>
          </ul>
          
          <h3>3. Environnements de développement</h3>
          <p>Outils recommandés :</p>
          <ul>
            <li>Jupyter Notebook pour l'exploration</li>
            <li>VS Code avec l'extension Python</li>
            <li>Google Colab pour le calcul dans le cloud</li>
          </ul>

          <h3>Premiers pas avec Python</h3>
          <p>Python est un langage interprété qui s'exécute ligne par ligne. Contrairement aux langages compilés comme C++, il n'y a pas besoin de compiler le code avant de l'exécuter.</p>
        </div>
      `,
      order: 1,
      estimatedTime: '2h',
      codeExamples: [
        {
          title: 'Hello World - Votre premier programme',
          description: 'Le traditionnel premier programme pour découvrir Python',
          code: `# Ceci est un commentaire
print("Bonjour le monde de la Data Science !")
print("Bienvenue à Ia-Solution RDC")

# Variables en Python
nom = "Data Scientist"
age = 25
salaire_moyen = 45000.50

print(f"Bonjour {nom}, vous avez {age} ans !")`,
          language: 'python',
          explanation: 'Ce code montre les bases : commentaires, fonction print(), variables et f-strings pour le formatage.'
        },
        {
          title: 'Structures de données de base',
          description: 'Listes, tuples et dictionnaires en Python',
          code: `# Listes (mutables)
etudiants = ["Alice", "Bob", "Charlie", "Diana"]
notes = [15, 18, 12, 16]

# Ajouter un élément
etudiants.append("Eve")
notes.append(14)

# Tuples (immutables)
coordonnees = (48.8566, 2.3522)  # Paris

# Dictionnaires (clé-valeur)
profil = {
    "nom": "Alice",
    "age": 25,
    "competences": ["Python", "SQL", "Tableau"],
    "experience": 3
}

print(f"Profil: {profil['nom']} - {profil['age']} ans")`,
          language: 'python',
          explanation: 'Les structures de données sont essentielles en Data Science pour organiser l\'information.'
        }
      ],
      exercises: [
        {
          id: 'ex-python-1',
          title: 'Analyse de données de ventes',
          description: 'Créez une fonction qui analyse un ensemble de données de ventes et retourne des statistiques par catégorie de produits.',
          difficulty: 'moyen',
          solution: `def analyser_ventes(ventes):
    """Analyse des ventes par catégorie.
    
    Args:
        ventes: Liste de dictionnaires contenant les données de vente
        
    Returns:
        Dictionnaire avec les statistiques par catégorie
    """
    stats = {}
    
    for vente in ventes:
        categorie = vente["categorie"]
        montant = vente["montant"]
        
        if categorie not in stats:
            stats[categorie] = {
                "total": 0,
                "nombre_ventes": 0,
                "montant_max": float("-inf"),
                "montant_min": float("inf")
            }
            
        stats[categorie]["total"] += montant
        stats[categorie]["nombre_ventes"] += 1
        stats[categorie]["montant_max"] = max(stats[categorie]["montant_max"], montant)
        stats[categorie]["montant_min"] = min(stats[categorie]["montant_min"], montant)
    
    # Calcul des moyennes
    for categorie in stats:
        stats[categorie]["moyenne"] = stats[categorie]["total"] / stats[categorie]["nombre_ventes"]
    
    return stats

# Exemple d'utilisation
ventes = [
    {"id": 1, "categorie": "Électronique", "montant": 1200},
    {"id": 2, "categorie": "Vêtements", "montant": 80},
    {"id": 3, "categorie": "Électronique", "montant": 899},
    {"id": 4, "categorie": "Livres", "montant": 25},
    {"id": 5, "categorie": "Vêtements", "montant": 45}
]

resultats = analyser_ventes(ventes)
for categorie, stat in resultats.items():
    print(f"\n{categorie}:")
    print(f"  Total des ventes: {stat['total']}€")
    print(f"  Nombre de ventes: {stat['nombre_ventes']}")
    print(f"  Moyenne par vente: {stat['moyenne']:.2f}€")
    print(f"  Plus grosse vente: {stat['montant_max']}€")
    print(f"  Plus petite vente: {stat['montant_min']}€")`,
          hints: [
            'Commencez par initialiser un dictionnaire pour stocker les statistiques',
            'Parcourez chaque vente et mettez à jour les compteurs',
            'Pensez à gérer le cas où une catégorie apparaît pour la première fois',
            'Calculez les statistiques (total, moyenne, min, max) pour chaque catégorie'
          ]
        },
        {
          id: 'ex-python-2',
          title: 'Visualisation de données',
          description: 'Créez une visualisation des températures moyennes mensuelles pour différentes villes.',
          difficulty: 'difficile',
          solution: `import matplotlib.pyplot as plt
import numpy as np

# Données météorologiques (températures mensuelles moyennes en °C)
donnees = {
    "Paris": [5, 6, 10, 13, 17, 20, 22, 22, 19, 14, 9, 6],
    "Lyon": [3, 5, 9, 12, 17, 21, 24, 23, 19, 14, 8, 4],
    "Marseille": [7, 8, 11, 14, 18, 22, 25, 25, 22, 17, 12, 8],
    "Lille": [4, 4, 7, 10, 14, 17, 19, 19, 16, 12, 8, 5]
}

mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", 
        "Jui", "Aoû", "Sep", "Oct", "Nov", "Déc"]

# Création de la figure
plt.figure(figsize=(12, 6))

# Tracé des courbes pour chaque ville
for ville, temperatures in donnees.items():
    plt.plot(mois, temperatures, marker="o", label=ville, linewidth=2)

# Personnalisation du graphique
plt.title("Températures mensuelles moyennes en France", fontsize=14, fontweight="bold")
plt.xlabel("Mois", fontsize=12)
plt.ylabel("Température (°C)", fontsize=12)
plt.legend(title="Villes", title_fontsize=12)
plt.grid(True, linestyle="--", alpha=0.7)
plt.xticks(rotation=45)
plt.tight_layout()

# Ajout d'une note explicative
plt.figtext(0.5, -0.15, 
           "Source: Données météorologiques moyennes (1991-2020)",
           ha="center", fontsize=10, style="italic")

# Affichage du graphique
plt.show()

# Analyse des données
print("\nAnalyse des températures annuelles moyennes :")
for ville, temperatures in donnees.items():
    moyenne_annuelle = sum(temperatures) / len(temperatures)
    print(f"- {ville}: {moyenne_annuelle:.1f}°C")

# Trouver le mois le plus chaud pour chaque ville
print("\nMois les plus chauds :")
for ville, temperatures in donnees.items():
    mois_chaud = mois[temperatures.index(max(temperatures))]
    print(f"- {ville}: {mois_chaud} ({max(temperatures)}°C)")`,
          hints: [
            'Utilisez matplotlib pour créer le graphique',
            'Créez une ligne pour chaque ville',
            'Ajoutez des étiquettes et une légende',
            'Personnalisez l\'apparence avec des couleurs et des styles',
            'Pensez à ajouter un titre et des labels aux axes',
            'Utilisez la fonction show() pour afficher le graphique'
          ]
        },
        {
          id: 'ex-python-3',
          title: 'Nettoyage de données',
          description: 'Créez une fonction qui nettoie un ensemble de données en gérant les valeurs manquantes et les valeurs aberrantes.',
          difficulty: 'moyen',
          solution: `import pandas as pd
import numpy as np

def nettoyer_donnees(df):
    """
    Nettoie un DataFrame en gérant les valeurs manquantes et aberrantes.
    
    Args:
        df: DataFrame pandas à nettoyer
        
    Returns:
        DataFrame nettoyé
    """
    # Faire une copie pour éviter les modifications inattendues
    df_clean = df.copy()
    
    # 1. Gestion des valeurs manquantes
    # Pour les colonnes numériques : remplacer par la médiane
    for colonne in df_clean.select_dtypes(include=[np.number]).columns:
        mediane = df_clean[colonne].median()
        df_clean[colonne].fillna(mediane, inplace=True)
    
    # Pour les colonnes catégorielles : remplacer par le mode
    for colonne in df_clean.select_dtypes(include=['object']).columns:
        mode = df_clean[colonne].mode()[0]
        df_clean[colonne].fillna(mode, inplace=True)
    
    # 2. Détection et traitement des valeurs aberrantes (pour les colonnes numériques)
    for colonne in df_clean.select_dtypes(include=[np.number]).columns:
        # Calcul des bornes avec la règle IQR
        Q1 = df_clean[colonne].quantile(0.25)
        Q3 = df_clean[colonne].quantile(0.75)
        IQR = Q3 - Q1
        borne_inf = Q1 - 1.5 * IQR
        borne_sup = Q3 + 1.5 * IQR
        
        # Remplacer les valeurs aberrantes par la médiane
        masque = (df_clean[colonne] < borne_inf) | (df_clean[colonne] > borne_sup)
        if masque.any():
            df_clean.loc[masque, colonne] = df_clean[colonne].median()
    
    # 3. Nettoyage des chaînes de caractères
    for colonne in df_clean.select_dtypes(include=['object']).columns:
        # Supprimer les espaces en début et fin
        df_clean[colonne] = df_clean[colonne].str.strip()
        # Mettre en minuscules
        df_clean[colonne] = df_clean[colonne].str.lower()
    
    return df_clean

# Exemple d'utilisation
if __name__ == "__main__":
    # Création d'un exemple de DataFrame avec des données sales
    data = {
        "age": [25, 30, None, 35, 200, 28, 32, None],
        "salaire": [50000, 60000, 70000, None, 80000, 1200000, 65000, 55000],
        "ville": ["Paris", "Lyon", "  Marseille", "Paris", "Lille", "Paris", None, "Lyon"],
        "experience": [2, 5, 3, 7, 1, 4, None, 6]
    }
    
    df = pd.DataFrame(data)
    print("=== Avant le nettoyage ===")
    print(df)
    
    df_propre = nettoyer_donnees(df)
    print("\n=== Après le nettoyage ===")
    print(df_propre)`,
          hints: [
            'Commencez par gérer les valeurs manquantes',
            'Utilisez des méthodes statistiques pour détecter les valeurs aberrantes',
            'Nettoyez les chaînes de caractères (espaces, majuscules, etc.)',
            'Documentez bien votre fonction avec des docstrings',
            'Testez votre fonction avec différents jeux de données',
            'Pensez à faire une copie du DataFrame pour éviter les effets de bord'
          ]
        }
      ],
      resources: [
        {
          title: 'Documentation officielle Python',
          type: 'documentation',
          url: 'https://docs.python.org/3/'
        },
        {
          title: 'Tutoriel Python pour débutants',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
        }
      ]
    },
    {
      id: 'pandas-fundamentals',
      title: 'Pandas : Manipulation de données',
      content: `
        <div class="course-section">
          <h3>Introduction à Pandas</h3>
          <p>Pandas est LA bibliothèque pour la manipulation de données en Python. Elle introduit deux structures principales :</p>

          <h4>Series : Données 1D</h4>
          <p>Une Series est comme une colonne dans un tableau Excel. Elle peut contenir différents types de données.</p>

          <h4>DataFrame : Données 2D</h4>
          <p>Un DataFrame est comme un tableau Excel complet avec des lignes et des colonnes étiquetées.</p>

          <h3>Opérations essentielles</h3>
          <ul>
            <li><strong>Lecture :</strong> Charger des données depuis CSV, Excel, SQL...</li>
            <li><strong>Nettoyage :</strong> Gérer les valeurs manquantes, les doublons</li>
            <li><strong>Transformation :</strong> Filtrer, trier, grouper les données</li>
            <li><strong>Analyse :</strong> Statistiques descriptives, corrélations</li>
          </ul>
        </div>
      `,
      order: 2,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Création et manipulation de DataFrames',
          description: 'Comment créer et manipuler des tableaux de données',
          code: `import pandas as pd
import numpy as np

# Création d'un DataFrame depuis un dictionnaire
data = {
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age': [25, 30, 35, 28, 32],
    'Salaire': [45000, 52000, 48000, 61000, 55000],
    'Departement': ['IT', 'Marketing', 'IT', 'Finance', 'Marketing']
}

df = pd.DataFrame(data)
print("DataFrame créé :")
print(df)

# Informations sur le DataFrame
print(f"\nDimensions: {df.shape}")
print(f"Colonnes: {list(df.columns)}")
print(f"Types de données:\n{df.dtypes}")

# Statistiques descriptives
print(f"\nStatistiques descriptives:\n{df.describe()}")`,
          language: 'python',
          explanation: 'Ce code montre comment créer un DataFrame réaliste avec des données d\'employés et explorer sa structure.'
        },
        {
          title: 'Filtrage et sélection de données',
          description: 'Comment extraire des informations spécifiques d\'un DataFrame',
          code: `# Filtrer les employés IT
df_it = df[df['Departement'] == 'IT']
print("Employés IT:")
print(df_it)

# Employés avec salaire > 50000
df_high_salary = df[df['Salaire'] > 50000]
print("\nEmployés avec salaire > 50k:")
print(df_high_salary)

# Sélection par colonnes
noms_ages = df[['Nom', 'Age']]
print("\nJuste noms et âges:")
print(noms_ages)

# Sélection par index (iloc pour position, loc pour label)
print(f"\nPremier employé: {df.iloc[0]}")
print(f"Employé nommé Bob: {df.loc[df['Nom'] == 'Bob']}")`,
          language: 'python',
          explanation: 'Le filtrage est une opération fondamentale en Data Science pour extraire les données pertinentes.'
        }
      ],
      exercises: [
        {
          id: 'ex-pandas-1',
          title: 'Analyse des ventes',
          description: 'À partir d\'un DataFrame de ventes, calculez le chiffre d\'affaires total et identifiez le produit le plus vendu.',
          difficulty: 'moyen',
          solution: `import pandas as pd

# Jeu de données fictif
ventes = pd.DataFrame({
    'Produit': ['A', 'B', 'A', 'C', 'B', 'A'],
    'Quantite': [10, 5, 8, 12, 6, 15],
    'Prix': [100, 200, 100, 150, 200, 100]
})

# Calcul du chiffre d'affaires
ventes['CA'] = ventes['Quantite'] * ventes['Prix']
total_ca = ventes['CA'].sum()

# Produit le plus vendu
produit_plus_vendu = ventes.groupby('Produit')['Quantite'].sum().idxmax()

print(f"CA total: {total_ca}€")
print(f"Produit le plus vendu: {produit_plus_vendu}")`
        }
      ]
    },
    {
      id: 'visualization',
      title: 'Visualisation de données',
      content: `
        <div class="course-section">
          <h3>L'importance de la visualisation</h3>
          <p>"Une image vaut mille mots" - surtout en Data Science ! La visualisation permet de :</p>
          <ul>
            <li>Découvrir des patterns et tendances</li>
            <li>Communiquer efficacement les résultats</li>
            <li>Identifier les anomalies et valeurs aberrantes</li>
            <li>Rendre les données accessibles aux non-spécialistes</li>
          </ul>

          <h3>Types de graphiques essentiels</h3>
          <h4>Histogramme</h4>
          <p>Distribution d'une variable continue (âges, salaires, températures...)</p>

          <h4>Diagramme en barres</h4>
          <p>Comparaison de catégories (ventes par région, effectifs par département...)</p>

          <h4>Nuage de points (Scatter plot)</h4>
          <p>Relation entre deux variables continues (âge vs salaire, température vs consommation...)</p>

          <h4>Carte thermique (Heatmap)</h4>
          <p>Corrélations entre variables, matrices de confusion...</p>
        </div>
      `,
      order: 3,
      estimatedTime: '2h 30min',
      codeExamples: [
        {
          title: 'Visualisations avec Matplotlib et Seaborn',
          description: 'Créer des graphiques professionnels pour analyser les données',
          code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Configuration pour de beaux graphiques
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Jeu de données fictif
np.random.seed(42)
data = {
    'Age': np.random.normal(35, 10, 200),
    'Salaire': np.random.normal(45000, 10000, 200),
    'Experience': np.random.normal(8, 5, 200),
    'Departement': np.random.choice(['IT', 'Marketing', 'Finance', 'RH'], 200)
}
df = pd.DataFrame(data)

# Histogramme des âges
plt.figure(figsize=(10, 6))
plt.hist(df['Age'], bins=20, alpha=0.7, edgecolor='black')
plt.title('Distribution des âges dans l\'entreprise', fontsize=16, fontweight='bold')
plt.xlabel('Age (années)')
plt.ylabel('Nombre d\'employés')
plt.grid(True, alpha=0.3)
plt.show()

# Diagramme en barres des départements
dept_counts = df['Departement'].value_counts()
plt.figure(figsize=(10, 6))
bars = plt.bar(dept_counts.index, dept_counts.values, color=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'])
plt.title('Répartition par département', fontsize=16, fontweight='bold')
plt.xlabel('Département')
plt.ylabel('Nombre d\'employés')

# Ajouter les valeurs sur les barres
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height,
             f'{int(height)}', ha='center', va='bottom')

plt.show()

# Nuage de points : Salaire vs Expérience
plt.figure(figsize=(10, 6))
scatter = plt.scatter(df['Experience'], df['Salaire'], alpha=0.6, c=df['Age'], cmap='viridis')
plt.title('Salaire vs Expérience professionnelle', fontsize=16, fontweight='bold')
plt.xlabel('Années d\'expérience')
plt.ylabel('Salaire annuel (€)')
plt.colorbar(scatter, label='Age')
plt.grid(True, alpha=0.3)
plt.show()`,
          language: 'python',
          explanation: 'Cette série de graphiques montre comment explorer visuellement les relations dans les données.'
        }
      ]
    },
    {
      id: 'statistiques-descriptives',
      title: 'Statistiques descriptives avec Python',
      content: `
        <div class="course-section">
          <h2>Statistiques descriptives</h2>
          <p>Les statistiques descriptives sont essentielles pour comprendre et résumer les données. Elles nous aident à :</p>
          <ul>
            <li>Décrire les tendances centrales (moyenne, médiane, mode)</li>
            <li>Mesurer la dispersion (écart-type, variance, étendue)</li>
            <li>Identifier les valeurs aberrantes</li>
            <li>Comprendre la distribution des données</li>
          </ul>

          <h3>Métriques clés</h3>
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Métrique</th>
                <th class="px-4 py-2">Description</th>
                <th class="px-4 py-2">Quand l'utiliser</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Moyenne</td>
                <td class="border px-4 py-2">Somme des valeurs divisée par le nombre d'observations</td>
                <td class="border px-4 py-2">Données symétriques sans valeurs extrêmes</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Médiane</td>
                <td class="border px-4 py-2">Valeur qui sépare les données en deux parties égales</td>
                <td class="border px-4 py-2">Données asymétriques ou avec valeurs aberrantes</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Écart-type</td>
                <td class="border px-4 py-2">Mesure de la dispersion des données autour de la moyenne</td>
                <td class="border px-4 py-2">Pour évaluer la variabilité des données</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Coefficient de variation</td>
                <td class="border px-4 py-2">Écart-type / Moyenne (en %)</td>
                <td class="border px-4 py-2">Comparer la variabilité entre jeux de données d'échelles différentes</td>
              </tr>
            </tbody>
          </table>

          <h3>Analyse de distribution</h3>
          <p>Comprendre comment les données sont distribuées est crucial :</p>
          <ul>
            <li><strong>Asymétrie (skewness)</strong> : Mesure de l'asymétrie de la distribution</li>
            <li><strong>Aplatissement (kurtosis)</strong> : Mesure de la forme des queues de distribution</li>
            <li><strong>Test de normalité</strong> : Vérifier si les données suivent une distribution normale</li>
          </ul>
        </div>
      `,
      order: 4,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Analyse statistique avec pandas',
          description: 'Calcul des statistiques descriptives de base sur un jeu de données',
          code: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Création d'un jeu de données
data = {
    'age': np.random.normal(35, 8, 1000),
    'salaire': np.random.lognormal(10.5, 0.4, 1000),
    'experience': np.random.gamma(2, 3, 1000),
    'departement': np.random.choice(['IT', 'Marketing', 'Finance', 'RH'], 1000)
}

df = pd.DataFrame(data)

# Statistiques descriptives de base
description = df.describe()
print("Statistiques descriptives :")
print(description)

# Calcul de l'asymétrie et du kurtosis
print("\nAsymétrie :")
print(df.skew())
print("\nAplatissement :")
print(df.kurtosis())

# Visualisation des distributions
plt.figure(figsize=(15, 10))

plt.subplot(2, 2, 1)
sns.histplot(df['age'], kde=True)
plt.title('Distribution des âges')

plt.subplot(2, 2, 2)
sns.histplot(np.log(df['salaire']), kde=True)
plt.title('Distribution des salaires (échelle logarithmique)')

plt.subplot(2, 2, 3)
sns.boxplot(x='departement', y='salaire', data=df)
plt.title('Salaire par département')
plt.xticks(rotation=45)

plt.subplot(2, 2, 4)
sns.scatterplot(x='experience', y='salaire', hue='departement', data=df, alpha=0.6)
plt.title('Relation expérience-salaire')

plt.tight_layout()
plt.show()

# Test de corrélation
correlation = df.corr()
plt.figure(figsize=(8, 6))
sns.heatmap(correlation, annot=True, cmap='coolwarm', center=0)
plt.title('Matrice de corrélation')
plt.show()`,
          language: 'python',
          explanation: 'Ce code montre comment effectuer une analyse statistique complète avec visualisation des distributions et des relations entre variables.'
        }
      ],
      exercises: [
        {
          id: 'ex-stats-1',
          title: 'Analyse des salaires',
          description: 'À partir du jeu de données ci-dessus, répondez aux questions suivantes :\n1. Quel est le salaire médian ?\n2. Quel département a le salaire moyen le plus élevé ?\n3. Y a-t-il une corrélation entre l\'âge et le salaire ?\n4. Identifiez les valeurs aberrantes dans la distribution des salaires.',
          difficulty: 'moyen',
          solution: `# 1. Salaire médian
median_salary = df['salaire'].median()
print(f"1. Salaire médian: {median_salary:.2f}€")

# 2. Département avec le salaire moyen le plus élevé
dept_salaries = df.groupby('departement')['salaire'].mean().sort_values(ascending=False)
print("\n2. Salaire moyen par département :")
print(dept_salaries.to_string())

# 3. Corrélation âge-salaire
correlation = df['age'].corr(df['salaire'])
print(f"\n3. Corrélation âge-salaire: {correlation:.3f}")

# 4. Détection des valeurs aberrantes dans les salaires
Q1 = df['salaire'].quantile(0.25)
Q3 = df['salaire'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df['salaire'] < lower_bound) | (df['salaire'] > upper_bound)]
print(f"\n4. Nombre de valeurs aberrantes détectées: {len(outliers)}")

# Visualisation des valeurs aberrantes
plt.figure(figsize=(10, 6))
sns.boxplot(x=df['salaire'])
plt.title('Boîte à moustaches des salaires')
plt.show()`
        },
        {
          id: 'ex-stats-2',
          title: 'Test d\'hypothèse',
          description: 'Testez l\'hypothèse suivante : "Le salaire moyen dans le département IT est significativement différent du salaire moyen dans le département Marketing" en utilisant un test t de Student.',
          difficulty: 'difficile',
          solution: `from scipy import stats

# Extraction des salaires par département
salaires_it = df[df['departement'] == 'IT']['salaire']
salaires_marketing = df[df['departement'] == 'Marketing']['salaire']

# Test de normalité (Shapiro-Wilk)
_, p_value_it = stats.shapiro(salaires_it)
_, p_value_marketing = stats.shapiro(salaires_marketing)

print(f"Test de normalité (p-value) - IT: {p_value_it:.4f}")
print(f"Test de normalité (p-value) - Marketing: {p_value_marketing:.4f}")

# Test de Levene pour l'égalité des variances
_, p_levene = stats.levene(salaires_it, salaires_marketing)
print(f"\nTest d'égalité des variances (p-value): {p_levene:.4f}")

# Test t de Student (variances égales ou non selon le test de Levene)
equal_var = p_levene > 0.05  # Si p > 0.05, on considère les variances égales
t_stat, p_value = stats.ttest_ind(salaires_it, salaires_marketing, equal_var=equal_var)

print(f"\nTest t de Student (p-value): {p_value:.4f}")

# Interprétation
alpha = 0.05
if p_value < alpha:
    print("\nConclusion : On rejette l'hypothèse nulle.")
    print("Il y a une différence significative entre les salaires moyens des départements IT et Marketing.")
else:
    print("\nConclusion : On ne peut pas rejeter l'hypothèse nulle.")
    print("Il n'y a pas de différence significative entre les salaires moyens des départements IT et Marketing.")

# Calcul des intervalles de confiance à 95%
mean_it = np.mean(salaires_it)
mean_marketing = np.mean(salaires_marketing)

ci_it = stats.t.interval(0.95, len(salaires_it)-1, loc=mean_it, scale=stats.sem(salaires_it))
ci_marketing = stats.t.interval(0.95, len(salaires_marketing)-1, loc=mean_marketing, scale=stats.sem(salaires_marketing))

print(f"\nIntervalle de confiance 95% - IT: {ci_it[0]:.2f}€ - {ci_it[1]:.2f}€")
print(f"Intervalle de confiance 95% - Marketing: {ci_marketing[0]:.2f}€ - {ci_marketing[1]:.2f}€")`
        }
      ]
    }
  ],
  finalProject: {
    title: 'Analyse complète d\'un jeu de données',
    description: 'Réalisez une analyse complète sur un jeu de données réel de votre choix ou fourni par le formateur.',
    requirements: [
      'Nettoyage et préparation des données',
      'Analyse exploratoire avec statistiques descriptives',
      'Création d\'au moins 5 visualisations pertinentes',
      'Identification des insights principaux',
      'Présentation claire des résultats'
    ],
    deliverables: [
      'Notebook Jupyter complet et commenté',
      'Rapport d\'analyse (5-10 pages)',
      'Présentation orale de 10 minutes',
      'Jeu de données nettoyé et documenté'
    ]
  },
  resources: [
    {
      title: 'Documentation officielle Pandas',
      type: 'documentation',
      url: 'https://pandas.pydata.org/docs/'
    },
    {
      title: 'Tutoriel NumPy',
      type: 'article',
      url: 'https://numpy.org/doc/stable/user/quickstart.html'
    },
    {
      title: 'Guide Matplotlib',
      type: 'article',
      url: 'https://matplotlib.org/stable/contents.html'
    },
    {
      title: 'Documentation SciPy',
      type: 'documentation',
      url: 'https://docs.scipy.org/doc/'
    },
    {
      title: 'Vidéos de statistiques avec Python',
      type: 'video',
      url: 'https://www.coursera.org/learn/statistics-with-python'
    },
    {
      title: 'Kaggle - Plateforme de datasets',
      type: 'dataset',
      url: 'https://www.kaggle.com/datasets'
    },
    {
      title: 'Guide de visualisation avec Python',
      type: 'article',
      url: 'https://www.data-to-viz.com/'
    },
    {
      title: 'Vidéos avancées de Data Science',
      type: 'video',
      url: 'https://www.edx.org/learn/data-science'
    },
    {
      title: 'Documentation SciKit-Learn',
      type: 'documentation',
      url: 'https://scikit-learn.org/stable/'
    },
    {
      title: 'Jeux de données avancés',
      type: 'dataset',
      url: 'https://github.com/topics/data-science'
    }
  ],
  tags: ['python', 'pandas', 'matplotlib', 'seaborn', 'data-analysis', 'visualization']
};
