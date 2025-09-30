# Chapitre 1 : Introduction à Python pour la Data Science

## Module Data Science - RDC Education

**Niveau :** Débutant  
**Durée estimée :** 4-6 heures  
**Prérequis :** Aucun

---

## 🎯 Objectifs pédagogiques

À la fin de ce chapitre, vous serez capable de :

- ✅ Comprendre ce qu'est Python et pourquoi il est utilisé en Data Science
- ✅ Manipuler les variables et les types de données de base
- ✅ Utiliser les structures de contrôle (boucles, conditions)
- ✅ Créer et utiliser des fonctions simples
- ✅ Appliquer ces concepts à des exemples concrets du contexte congolais

---

## Table des matières

1. [Qu'est-ce que Python ?](#1-quest-ce-que-python)
2. [Premiers pas avec Python](#2-premiers-pas-avec-python)
3. [Opérations mathématiques](#3-opérations-mathématiques)
4. [Les listes](#4-les-listes)
5. [Les conditions](#5-les-conditions)
6. [Les boucles](#6-les-boucles)
7. [Les fonctions](#7-les-fonctions)
8. [Exercices pratiques](#8-exercices-pratiques)
9. [Solutions](#9-solutions)
10. [Résumé et ressources](#10-résumé-et-ressources)

---

## 1. Qu'est-ce que Python ?

### 1.1 Introduction

Python est un **langage de programmation** créé en 1991 par Guido van Rossum. Il est devenu l'un des langages les plus populaires au monde, particulièrement dans le domaine de la Data Science et de l'Intelligence Artificielle.

### 1.2 Caractéristiques principales

Python est :

- **Simple à apprendre** : Sa syntaxe est claire et ressemble au langage naturel
- **Puissant** : Utilisé par Google, Netflix, NASA, Instagram, Spotify
- **Polyvalent** : Développement web, data science, IA, automatisation, jeux vidéo
- **Gratuit et open-source** : Accessible à tous, partout dans le monde
- **Multi-plateforme** : Fonctionne sur Windows, Mac, Linux

### 1.3 Pourquoi Python pour la Data Science ?

1. **Bibliothèques riches et spécialisées**
   - **Pandas** : Manipulation de données tabulaires
   - **NumPy** : Calculs numériques et matrices
   - **Matplotlib/Seaborn** : Visualisation de données
   - **Scikit-learn** : Machine Learning
   - **TensorFlow/PyTorch** : Deep Learning

2. **Communauté active**
   - Plus de 15 millions de développeurs dans le monde
   - Documentation abondante en français
   - Forums d'entraide actifs

3. **Facilité d'intégration**
   - Compatible avec d'autres langages (C, Java, R)
   - Nombreuses API disponibles
   - Déploiement facile

### 1.4 Applications en République Démocratique du Congo

Python peut être utilisé pour résoudre des problèmes concrets en RDC :

#### 📊 **Éducation**
- Analyse des résultats scolaires
- Suivi des performances des étudiants
- Prédiction du taux de réussite
- Optimisation des ressources éducatives

#### 🌾 **Agriculture**
- Prévision des récoltes
- Analyse des données météorologiques
- Optimisation de l'irrigation
- Suivi des prix des produits agricoles

#### 🏥 **Santé**
- Suivi des épidémies (paludisme, Ebola, COVID-19)
- Analyse des données hospitalières
- Prédiction des besoins en médicaments
- Cartographie des zones à risque

#### 💰 **Commerce et Économie**
- Analyse des ventes
- Prévision des prix
- Étude du comportement des consommateurs
- Optimisation des stocks

---

## 2. Premiers pas avec Python

### 2.1 Afficher du texte avec `print()`

La fonction `print()` permet d'afficher du texte à l'écran.

```python
# Notre premier programme Python
print("Bienvenue en Data Science !")
print("Bonjour depuis Kinshasa, RDC")
```

**Résultat :**
```
Bienvenue en Data Science !
Bonjour depuis Kinshasa, RDC
```

> **Note :** Les lignes commençant par `#` sont des commentaires. Ils ne sont pas exécutés par Python et servent à expliquer le code.

### 2.2 Les variables

Une **variable** est comme une boîte qui contient une valeur. On peut la nommer et l'utiliser plus tard dans le programme.

#### Syntaxe

```python
nom_variable = valeur
```

#### Exemples

```python
# Créer des variables
nom_etudiant = "Amani"
age = 22
ville = "Lubumbashi"

# Afficher les variables
print("Nom:", nom_etudiant)
print("Âge:", age)
print("Ville:", ville)
```

**Résultat :**
```
Nom: Amani
Âge: 22
Ville: Lubumbashi
```

#### Règles de nommage

✅ **Autorisé :**
- Lettres (a-z, A-Z)
- Chiffres (0-9), mais pas au début
- Underscore (_)

❌ **Interdit :**
- Espaces
- Caractères spéciaux (@, !, %, etc.)
- Mots réservés Python (if, for, while, etc.)

**Exemples :**
```python
# Bon
nom_etudiant = "Grace"
age_2023 = 20
_variable = 10

# Mauvais
nom etudiant = "Grace"  # Espace
2age = 20               # Commence par un chiffre
nom-etudiant = "Grace"  # Tiret
```

### 2.3 Les types de données

Python a plusieurs types de données de base :

| Type | Description | Exemples |
|------|-------------|----------|
| `int` | Nombre entier | `25`, `-10`, `1000` |
| `float` | Nombre décimal | `3.14`, `19.99`, `-0.5` |
| `str` | Texte (chaîne de caractères) | `"Bonjour"`, `"RDC"` |
| `bool` | Booléen (Vrai ou Faux) | `True`, `False` |
| `list` | Liste (collection ordonnée) | `[1, 2, 3]`, `["a", "b"]` |

#### Exemples

```python
# Différents types de données
nombre_etudiants = 45              # int
moyenne_classe = 13.5              # float
nom_ecole = "Lycée Bosangani"     # str
est_reussi = True                  # bool

# Vérifier le type avec type()
print(type(nombre_etudiants))      # <class 'int'>
print(type(moyenne_classe))        # <class 'float'>
print(type(nom_ecole))             # <class 'str'>
print(type(est_reussi))            # <class 'bool'>
```

#### Conversion de types

```python
# Convertir un type en un autre
nombre_texte = "123"
nombre_entier = int(nombre_texte)  # "123" → 123

prix = 1500
prix_texte = str(prix)             # 1500 → "1500"

note = 14
note_decimale = float(note)        # 14 → 14.0
```

---

## 3. Opérations mathématiques

Python peut effectuer des calculs comme une calculatrice.

### 3.1 Opérateurs de base

| Opérateur | Description | Exemple | Résultat |
|-----------|-------------|---------|----------|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Soustraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.333...` |
| `//` | Division entière | `10 // 3` | `3` |
| `%` | Modulo (reste) | `10 % 3` | `1` |
| `**` | Puissance | `10 ** 3` | `1000` |

### 3.2 Exemples pratiques

```python
# Opérations de base
a = 10
b = 3

print("Addition:", a + b)           # 13
print("Soustraction:", a - b)       # 7
print("Multiplication:", a * b)     # 30
print("Division:", a / b)           # 3.333...
print("Division entière:", a // b)  # 3
print("Reste (modulo):", a % b)     # 1
print("Puissance:", a ** b)         # 1000
```

### 3.3 Ordre des opérations

Python respecte l'ordre mathématique standard (PEMDAS) :

1. **P**arenthèses `()`
2. **E**xposants `**`
3. **M**ultiplication et **D**ivision `*`, `/`, `//`, `%`
4. **A**ddition et **S**oustraction `+`, `-`

```python
resultat = 2 + 3 * 4        # 14 (pas 20)
resultat = (2 + 3) * 4      # 20
resultat = 10 + 5 / 2       # 12.5
```

### 3.4 Exemple pratique : Calcul de moyenne

**Contexte :** Calculons la moyenne des notes d'un étudiant congolais.

```python
# Notes d'un étudiant (sur 20)
note_maths = 15
note_francais = 13
note_sciences = 16
note_histoire = 14

# Calcul de la moyenne
moyenne = (note_maths + note_francais + note_sciences + note_histoire) / 4

print("Notes:")
print("- Mathématiques:", note_maths)
print("- Français:", note_francais)
print("- Sciences:", note_sciences)
print("- Histoire:", note_histoire)
print("\nMoyenne de l'étudiant:", moyenne)

# Vérifier si l'étudiant a réussi (moyenne >= 10)
if moyenne >= 10:
    print("✅ Étudiant admis !")
else:
    print("❌ Étudiant non admis")
```

**Résultat :**
```
Notes:
- Mathématiques: 15
- Français: 13
- Sciences: 16
- Histoire: 14

Moyenne de l'étudiant: 14.5
✅ Étudiant admis !
```

---

## 4. Les listes

Une **liste** permet de stocker plusieurs valeurs dans une seule variable.

### 4.1 Créer une liste

```python
# Liste de villes
villes_rdc = ["Kinshasa", "Lubumbashi", "Goma", "Kisangani", "Bukavu"]

# Liste de nombres
temperatures = [28, 30, 29, 31, 27]

# Liste mixte
etudiant = ["Amani", 22, "Kinshasa", True]
```

### 4.2 Accéder aux éléments

Les éléments d'une liste sont numérotés à partir de **0** (index).

```python
villes_rdc = ["Kinshasa", "Lubumbashi", "Goma", "Kisangani", "Bukavu"]

print(villes_rdc[0])   # Premier élément : Kinshasa
print(villes_rdc[1])   # Deuxième élément : Lubumbashi
print(villes_rdc[-1])  # Dernier élément : Bukavu
print(villes_rdc[-2])  # Avant-dernier : Kisangani
```

### 4.3 Opérations sur les listes

```python
villes_rdc = ["Kinshasa", "Lubumbashi", "Goma"]

# Longueur de la liste
print(len(villes_rdc))  # 3

# Ajouter un élément
villes_rdc.append("Matadi")
print(villes_rdc)  # ["Kinshasa", "Lubumbashi", "Goma", "Matadi"]

# Modifier un élément
villes_rdc[0] = "Kinshasa (capitale)"
print(villes_rdc)

# Supprimer un élément
villes_rdc.remove("Goma")
print(villes_rdc)
```

### 4.4 Fonctions utiles

```python
notes = [12, 15, 8, 14, 11]

print("Somme:", sum(notes))        # 60
print("Maximum:", max(notes))      # 15
print("Minimum:", min(notes))      # 8
print("Moyenne:", sum(notes) / len(notes))  # 12.0
```

### 4.5 Exemple pratique : Températures à Kinshasa

```python
# Températures à Kinshasa (en °C) sur une semaine
temperatures = [28, 30, 29, 31, 27, 28, 30]

# Calculer la température moyenne
temperature_moyenne = sum(temperatures) / len(temperatures)
print(f"Température moyenne: {temperature_moyenne:.1f}°C")

# Trouver la température maximale et minimale
temp_max = max(temperatures)
temp_min = min(temperatures)
print(f"Température maximale: {temp_max}°C")
print(f"Température minimale: {temp_min}°C")
```

**Résultat :**
```
Température moyenne: 29.0°C
Température maximale: 31°C
Température minimale: 27°C
```

---

## 5. Les conditions

Les conditions permettent de prendre des décisions dans le code.

### 5.1 Structure `if`

```python
if condition:
    # Code exécuté si la condition est vraie
```

**Exemple :**
```python
age = 18

if age >= 18:
    print("Vous êtes majeur")
```

### 5.2 Structure `if-else`

```python
if condition:
    # Code si vrai
else:
    # Code si faux
```

**Exemple :**
```python
note = 8

if note >= 10:
    print("Réussi")
else:
    print("Échoué")
```

### 5.3 Structure `if-elif-else`

```python
if condition1:
    # Code si condition1 est vraie
elif condition2:
    # Code si condition2 est vraie
else:
    # Code si aucune condition n'est vraie
```

**Exemple :**
```python
note = 14

if note >= 16:
    print("Excellent !")
elif note >= 12:
    print("Bien")
elif note >= 10:
    print("Passable")
else:
    print("Insuffisant")
```

### 5.4 Opérateurs de comparaison

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| `==` | Égal à | `a == b` |
| `!=` | Différent de | `a != b` |
| `>` | Supérieur à | `a > b` |
| `<` | Inférieur à | `a < b` |
| `>=` | Supérieur ou égal | `a >= b` |
| `<=` | Inférieur ou égal | `a <= b` |

### 5.5 Opérateurs logiques

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| `and` | ET logique | `a > 0 and b > 0` |
| `or` | OU logique | `a > 0 or b > 0` |
| `not` | NON logique | `not a > 0` |

**Exemple :**
```python
age = 20
a_carte = True

if age >= 18 and a_carte:
    print("Vous pouvez voter")
else:
    print("Vous ne pouvez pas voter")
```

### 5.6 Exemple pratique : Prix du marché avec réduction

**Contexte :** Calculons le prix total avec réduction selon la quantité achetée au marché de Kinshasa.

```python
# Prix d'un sac de riz (en FC - Francs Congolais)
prix_unitaire = 50000
quantite = 5

# Calcul du prix total
prix_total = prix_unitaire * quantite

# Application de réduction selon la quantité
if quantite >= 10:
    reduction = 0.15  # 15% de réduction
    print("🎉 Réduction de 15% appliquée !")
elif quantite >= 5:
    reduction = 0.10  # 10% de réduction
    print("🎉 Réduction de 10% appliquée !")
else:
    reduction = 0
    print("Pas de réduction")

prix_final = prix_total * (1 - reduction)
economie = prix_total - prix_final

print(f"\nDétails de l'achat:")
print(f"- Quantité: {quantite} sacs")
print(f"- Prix unitaire: {prix_unitaire:,} FC")
print(f"- Prix total: {prix_total:,} FC")
print(f"- Prix final: {prix_final:,.0f} FC")
print(f"- Économie: {economie:,.0f} FC")
```

**Résultat :**
```
🎉 Réduction de 10% appliquée !

Détails de l'achat:
- Quantité: 5 sacs
- Prix unitaire: 50,000 FC
- Prix total: 250,000 FC
- Prix final: 225,000 FC
- Économie: 25,000 FC
```

---

## 6. Les boucles

Les boucles permettent de répéter des actions plusieurs fois.

### 6.1 Boucle `for`

La boucle `for` parcourt une séquence (liste, chaîne, etc.).

#### Syntaxe

```python
for element in sequence:
    # Code à répéter
```

#### Exemples

```python
# Parcourir une liste
provinces = ["Kinshasa", "Kongo Central", "Kwilu", "Kwango"]

print("Provinces de la RDC:")
for province in provinces:
    print(f"- {province}")
```

**Résultat :**
```
Provinces de la RDC:
- Kinshasa
- Kongo Central
- Kwilu
- Kwango
```

#### Utiliser `range()`

La fonction `range()` génère une séquence de nombres.

```python
# range(début, fin, pas)
for i in range(1, 6):
    print(i)  # Affiche 1, 2, 3, 4, 5
```

```python
# Table de multiplication
nombre = 7
print(f"Table de multiplication de {nombre}:")
for i in range(1, 11):
    print(f"{nombre} x {i} = {nombre * i}")
```

### 6.2 Boucle `while`

La boucle `while` répète tant qu'une condition est vraie.

#### Syntaxe

```python
while condition:
    # Code à répéter
```

#### Exemple

```python
compteur = 1

while compteur <= 5:
    print(f"Compteur: {compteur}")
    compteur += 1

print("Fin de la boucle")
```

**Résultat :**
```
Compteur: 1
Compteur: 2
Compteur: 3
Compteur: 4
Compteur: 5
Fin de la boucle
```

### 6.3 Contrôle de boucle

- **`break`** : Arrête la boucle
- **`continue`** : Passe à l'itération suivante

```python
# Exemple avec break
for i in range(1, 11):
    if i == 5:
        break  # Arrête la boucle
    print(i)  # Affiche 1, 2, 3, 4

# Exemple avec continue
for i in range(1, 6):
    if i == 3:
        continue  # Saute l'itération
    print(i)  # Affiche 1, 2, 4, 5
```

### 6.4 Exemple pratique : Production agricole

**Contexte :** Analysons la production de manioc dans plusieurs champs en RDC.

```python
# Production de manioc par champ (en tonnes)
productions = [12.5, 15.3, 10.8, 14.2, 13.7, 16.1]

print("📊 Analyse de la production de manioc\n")
print("Production par champ:")
print("-" * 40)

total_production = 0
meilleur_champ = 0
meilleure_production = 0

for i, production in enumerate(productions, 1):
    print(f"Champ {i}: {production} tonnes")
    total_production += production
    
    if production > meilleure_production:
        meilleure_production = production
        meilleur_champ = i

production_moyenne = total_production / len(productions)

print("-" * 40)
print(f"\n📈 Résumé:")
print(f"- Production totale: {total_production:.1f} tonnes")
print(f"- Production moyenne: {production_moyenne:.1f} tonnes")
print(f"- Meilleur champ: Champ {meilleur_champ} ({meilleure_production} tonnes)")
```

**Résultat :**
```
📊 Analyse de la production de manioc

Production par champ:
----------------------------------------
Champ 1: 12.5 tonnes
Champ 2: 15.3 tonnes
Champ 3: 10.8 tonnes
Champ 4: 14.2 tonnes
Champ 5: 13.7 tonnes
Champ 6: 16.1 tonnes
----------------------------------------

📈 Résumé:
- Production totale: 82.6 tonnes
- Production moyenne: 13.8 tonnes
- Meilleur champ: Champ 6 (16.1 tonnes)
```

---

## 7. Les fonctions

Une **fonction** est un bloc de code réutilisable qui effectue une tâche spécifique.

### 7.1 Définir une fonction

#### Syntaxe

```python
def nom_fonction(parametres):
    """Documentation de la fonction"""
    # Code de la fonction
    return resultat
```

#### Exemple simple

```python
def saluer(nom):
    """Affiche un message de salutation"""
    print(f"Bonjour {nom} !")

# Utiliser la fonction
saluer("Amani")
saluer("Grace")
saluer("Patrick")
```

**Résultat :**
```
Bonjour Amani !
Bonjour Grace !
Bonjour Patrick !
```

### 7.2 Fonction avec retour de valeur

```python
def calculer_moyenne(notes):
    """Calcule la moyenne d'une liste de notes"""
    if len(notes) == 0:
        return 0
    return sum(notes) / len(notes)

# Utilisation
notes_etudiant1 = [14, 15, 13, 16]
notes_etudiant2 = [10, 12, 11, 13]

moyenne1 = calculer_moyenne(notes_etudiant1)
moyenne2 = calculer_moyenne(notes_etudiant2)

print(f"Moyenne étudiant 1: {moyenne1:.1f}")
print(f"Moyenne étudiant 2: {moyenne2:.1f}")
```

### 7.3 Paramètres par défaut

```python
def saluer(nom, langue="français"):
    """Salue dans différentes langues"""
    if langue == "français":
        print(f"Bonjour {nom} !")
    elif langue == "lingala":
        print(f"Mbote {nom} !")
    elif langue == "swahili":
        print(f"Jambo {nom} !")

saluer("Amani")                    # Bonjour Amani !
saluer("Grace", "lingala")         # Mbote Grace !
saluer("Patrick", "swahili")       # Jambo Patrick !
```

### 7.4 Exemple pratique : Conversion de devises

**Contexte :** Créons des fonctions pour convertir entre Francs Congolais (FC) et Dollars US (USD).

```python
def convertir_fc_vers_usd(montant_fc, taux_change=2500):
    """Convertit des Francs Congolais en Dollars US
    
    Args:
        montant_fc: Montant en FC
        taux_change: Taux de change FC/USD (défaut: 2500)
    
    Returns:
        Montant en USD
    """
    return montant_fc / taux_change

def convertir_usd_vers_fc(montant_usd, taux_change=2500):
    """Convertit des Dollars US en Francs Congolais
    
    Args:
        montant_usd: Montant en USD
        taux_change: Taux de change FC/USD (défaut: 2500)
    
    Returns:
        Montant en FC
    """
    return montant_usd * taux_change

def afficher_conversion(montant, devise_origine, devise_cible, taux=2500):
    """Affiche une conversion de devise formatée"""
    if devise_origine == "FC":
        resultat = convertir_fc_vers_usd(montant, taux)
        print(f"{montant:,} FC = ${resultat:.2f} USD")
    else:
        resultat = convertir_usd_vers_fc(montant, taux)
        print(f"${montant} USD = {resultat:,} FC")

# Exemples d'utilisation
print("💱 Conversions de devises\n")
afficher_conversion(100000, "FC", "USD")
afficher_conversion(50, "USD", "FC")
afficher_conversion(250000, "FC", "USD")
afficher_conversion(100, "USD", "FC")
```

**Résultat :**
```
💱 Conversions de devises

100,000 FC = $40.00 USD
$50 USD = 125,000 FC
250,000 FC = $100.00 USD
$100 USD = 250,000 FC
```

---

## 8. Exercices pratiques

Maintenant, c'est à vous de pratiquer ! Essayez de résoudre ces exercices avant de regarder les solutions.

### Exercice 1 : Informations personnelles ⭐

**Objectif :** Manipuler les variables et l'affichage

Créez des variables pour stocker :
- Votre nom
- Votre âge
- Votre ville
- Votre université

Affichez ensuite ces informations dans des phrases complètes.

**Exemple de sortie attendue :**
```
Je m'appelle Amani Kabongo, j'ai 22 ans.
J'habite à Kinshasa et j'étudie à l'Université de Kinshasa.
```

---

### Exercice 2 : Calcul de TVA ⭐

**Objectif :** Utiliser les opérations mathématiques

Créez un programme qui calcule le prix TTC (toutes taxes comprises) d'un produit.

**Données :**
- Prix HT (hors taxe) : 25000 FC
- Taux de TVA : 16%

**Calculez et affichez :**
- Le montant de la TVA
- Le prix TTC

---

### Exercice 3 : Analyse de notes ⭐⭐

**Objectif :** Manipuler les listes et utiliser les fonctions

Vous avez les notes de 5 étudiants : `[12, 15, 8, 14, 11]`

Calculez et affichez :
1. La moyenne de la classe
2. La note maximale
3. La note minimale
4. Le nombre d'étudiants ayant réussi (note >= 10)
5. Le taux de réussite (en pourcentage)

---

### Exercice 4 : Catégorisation de température ⭐⭐

**Objectif :** Utiliser les conditions

Créez un programme qui classe une température selon ces critères :
- Moins de 20°C : "Frais"
- 20-25°C : "Agréable"
- 26-30°C : "Chaud"
- Plus de 30°C : "Très chaud"

Testez avec plusieurs températures : `[18, 23, 28, 32]`

---

### Exercice 5 : Table de multiplication ⭐⭐

**Objectif :** Utiliser les boucles

Créez un programme qui affiche la table de multiplication d'un nombre donné (par exemple 7).

**Exemple de sortie attendue :**
```
Table de multiplication de 7:
------------------------------
7 x  1 =   7
7 x  2 =  14
7 x  3 =  21
...
7 x 10 =  70
```

---

### Exercice 6 : Fonction de calcul d'IMC ⭐⭐⭐

**Objectif :** Créer et utiliser des fonctions

Créez une fonction `calculer_imc(poids, taille)` qui :

1. Calcule l'IMC (Indice de Masse Corporelle) : **IMC = poids / (taille²)**
2. Retourne l'IMC et une catégorie :
   - IMC < 18.5 : "Sous-poids"
   - 18.5 <= IMC < 25 : "Normal"
   - 25 <= IMC < 30 : "Surpoids"
   - IMC >= 30 : "Obésité"

Testez avec : **poids = 70 kg, taille = 1.75 m**

---

### Exercice 7 : Gestion de stock ⭐⭐⭐

**Objectif :** Combiner plusieurs concepts

Créez un programme de gestion de stock pour un magasin.

**Données initiales :**
```python
produits = ["Riz", "Huile", "Sucre", "Farine", "Sel"]
quantites = [50, 30, 40, 25, 60]
prix_unitaires = [50000, 15000, 8000, 12000, 3000]  # en FC
```

Le programme doit :
1. Afficher le stock actuel (produit, quantité, prix)
2. Calculer la valeur totale du stock
3. Identifier le produit le plus cher
4. Identifier le produit avec le stock le plus faible
5. Calculer le prix moyen des produits

---

### Exercice 8 : Simulation de ventes ⭐⭐⭐

**Objectif :** Utiliser les boucles et les conditions

Créez un programme qui simule les ventes d'une semaine.

**Données :**
```python
ventes_semaine = [120000, 95000, 150000, 80000, 110000, 200000, 175000]  # FC
jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
```

Le programme doit :
1. Afficher les ventes par jour
2. Calculer le total des ventes
3. Calculer la moyenne des ventes
4. Identifier le meilleur jour (ventes maximales)
5. Identifier le pire jour (ventes minimales)
6. Compter le nombre de jours avec des ventes supérieures à 100000 FC

---

## 9. Solutions

### Solution Exercice 1

```python
# Informations personnelles
nom = "Amani Kabongo"
age = 22
ville = "Kinshasa"
universite = "Université de Kinshasa"

print(f"Je m'appelle {nom}, j'ai {age} ans.")
print(f"J'habite à {ville} et j'étudie à l'{universite}.")
```

---

### Solution Exercice 2

```python
# Calcul de TVA
prix_ht = 25000
taux_tva = 0.16

montant_tva = prix_ht * taux_tva
prix_ttc = prix_ht + montant_tva

print("Détails du prix:")
print(f"- Prix HT: {prix_ht:,} FC")
print(f"- TVA (16%): {montant_tva:,} FC")
print(f"- Prix TTC: {prix_ttc:,} FC")
```

**Résultat :**
```
Détails du prix:
- Prix HT: 25,000 FC
- TVA (16%): 4,000.0 FC
- Prix TTC: 29,000.0 FC
```

---

### Solution Exercice 3

```python
# Analyse de notes
notes = [12, 15, 8, 14, 11]

# 1. Moyenne
moyenne = sum(notes) / len(notes)
print(f"Moyenne de la classe: {moyenne:.1f}")

# 2. Note maximale
note_max = max(notes)
print(f"Note maximale: {note_max}")

# 3. Note minimale
note_min = min(notes)
print(f"Note minimale: {note_min}")

# 4. Nombre d'étudiants ayant réussi
nb_reussis = 0
for note in notes:
    if note >= 10:
        nb_reussis += 1

print(f"Nombre d'étudiants ayant réussi: {nb_reussis}/{len(notes)}")

# 5. Taux de réussite
taux_reussite = (nb_reussis / len(notes)) * 100
print(f"Taux de réussite: {taux_reussite:.1f}%")
```

**Résultat :**
```
Moyenne de la classe: 12.0
Note maximale: 15
Note minimale: 8
Nombre d'étudiants ayant réussi: 4/5
Taux de réussite: 80.0%
```

---

### Solution Exercice 4

```python
# Catégorisation de température
def categoriser_temperature(temp):
    """Catégorise une température"""
    if temp < 20:
        return "Frais"
    elif temp <= 25:
        return "Agréable"
    elif temp <= 30:
        return "Chaud"
    else:
        return "Très chaud"

# Tests
temperatures = [18, 23, 28, 32]

print("Catégorisation des températures:")
for temp in temperatures:
    categorie = categoriser_temperature(temp)
    print(f"{temp}°C : {categorie}")
```

**Résultat :**
```
Catégorisation des températures:
18°C : Frais
23°C : Agréable
28°C : Chaud
32°C : Très chaud
```

---

### Solution Exercice 5

```python
# Table de multiplication
nombre = 7

print(f"Table de multiplication de {nombre}:")
print("-" * 30)

for i in range(1, 11):
    resultat = nombre * i
    print(f"{nombre} x {i:2d} = {resultat:3d}")
```

**Résultat :**
```
Table de multiplication de 7:
------------------------------
7 x  1 =   7
7 x  2 =  14
7 x  3 =  21
7 x  4 =  28
7 x  5 =  35
7 x  6 =  42
7 x  7 =  49
7 x  8 =  56
7 x  9 =  63
7 x 10 =  70
```

---

### Solution Exercice 6

```python
# Fonction de calcul d'IMC
def calculer_imc(poids, taille):
    """Calcule l'IMC et retourne la catégorie
    
    Args:
        poids: Poids en kg
        taille: Taille en mètres
    
    Returns:
        Tuple (IMC, catégorie)
    """
    imc = poids / (taille ** 2)
    
    if imc < 18.5:
        categorie = "Sous-poids"
    elif imc < 25:
        categorie = "Normal"
    elif imc < 30:
        categorie = "Surpoids"
    else:
        categorie = "Obésité"
    
    return imc, categorie

# Test
poids = 70
taille = 1.75

imc, categorie = calculer_imc(poids, taille)

print("Calcul de l'IMC:")
print(f"- Poids: {poids} kg")
print(f"- Taille: {taille} m")
print(f"- IMC: {imc:.1f}")
print(f"- Catégorie: {categorie}")
```

**Résultat :**
```
Calcul de l'IMC:
- Poids: 70 kg
- Taille: 1.75 m
- IMC: 22.9
- Catégorie: Normal
```

---

### Solution Exercice 7

```python
# Gestion de stock
produits = ["Riz", "Huile", "Sucre", "Farine", "Sel"]
quantites = [50, 30, 40, 25, 60]
prix_unitaires = [50000, 15000, 8000, 12000, 3000]  # en FC

print("📦 GESTION DE STOCK")
print("=" * 60)

# 1. Afficher le stock actuel
print("\n1. Stock actuel:")
print("-" * 60)
print(f"{'Produit':<15} {'Quantité':>10} {'Prix unitaire':>15} {'Valeur':>15}")
print("-" * 60)

valeur_totale = 0
for i in range(len(produits)):
    valeur_produit = quantites[i] * prix_unitaires[i]
    valeur_totale += valeur_produit
    print(f"{produits[i]:<15} {quantites[i]:>10} {prix_unitaires[i]:>15,} FC {valeur_produit:>15,} FC")

# 2. Valeur totale du stock
print("-" * 60)
print(f"{'TOTAL':>41} {valeur_totale:>15,} FC")

# 3. Produit le plus cher
index_plus_cher = prix_unitaires.index(max(prix_unitaires))
print(f"\n3. Produit le plus cher: {produits[index_plus_cher]} ({prix_unitaires[index_plus_cher]:,} FC)")

# 4. Produit avec stock le plus faible
index_stock_faible = quantites.index(min(quantites))
print(f"4. Stock le plus faible: {produits[index_stock_faible]} ({quantites[index_stock_faible]} unités)")

# 5. Prix moyen
prix_moyen = sum(prix_unitaires) / len(prix_unitaires)
print(f"5. Prix moyen: {prix_moyen:,.0f} FC")
```

**Résultat :**
```
📦 GESTION DE STOCK
============================================================

1. Stock actuel:
------------------------------------------------------------
Produit         Quantité   Prix unitaire          Valeur
------------------------------------------------------------
Riz                   50          50,000 FC      2,500,000 FC
Huile                 30          15,000 FC        450,000 FC
Sucre                 40           8,000 FC        320,000 FC
Farine                25          12,000 FC        300,000 FC
Sel                   60           3,000 FC        180,000 FC
------------------------------------------------------------
                                 TOTAL      3,750,000 FC

3. Produit le plus cher: Riz (50,000 FC)
4. Stock le plus faible: Farine (25 unités)
5. Prix moyen: 17,600 FC
```

---

### Solution Exercice 8

```python
# Simulation de ventes
ventes_semaine = [120000, 95000, 150000, 80000, 110000, 200000, 175000]
jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

print("📊 RAPPORT DE VENTES HEBDOMADAIRES")
print("=" * 50)

# 1. Ventes par jour
print("\n1. Ventes par jour:")
print("-" * 50)
for i in range(len(jours)):
    print(f"{jours[i]:<12} : {ventes_semaine[i]:>10,} FC")

# 2. Total des ventes
total_ventes = sum(ventes_semaine)
print("-" * 50)
print(f"{'TOTAL':<12} : {total_ventes:>10,} FC")

# 3. Moyenne des ventes
moyenne_ventes = total_ventes / len(ventes_semaine)
print(f"\n3. Moyenne des ventes: {moyenne_ventes:,.0f} FC")

# 4. Meilleur jour
vente_max = max(ventes_semaine)
index_meilleur = ventes_semaine.index(vente_max)
print(f"4. Meilleur jour: {jours[index_meilleur]} ({vente_max:,} FC)")

# 5. Pire jour
vente_min = min(ventes_semaine)
index_pire = ventes_semaine.index(vente_min)
print(f"5. Pire jour: {jours[index_pire]} ({vente_min:,} FC)")

# 6. Jours avec ventes > 100000 FC
nb_jours_bons = 0
for vente in ventes_semaine:
    if vente > 100000:
        nb_jours_bons += 1

print(f"6. Jours avec ventes > 100,000 FC: {nb_jours_bons}/{len(ventes_semaine)}")
```

**Résultat :**
```
📊 RAPPORT DE VENTES HEBDOMADAIRES
==================================================

1. Ventes par jour:
--------------------------------------------------
Lundi        :    120,000 FC
Mardi        :     95,000 FC
Mercredi     :    150,000 FC
Jeudi        :     80,000 FC
Vendredi     :    110,000 FC
Samedi       :    200,000 FC
Dimanche     :    175,000 FC
--------------------------------------------------
TOTAL        :    930,000 FC

3. Moyenne des ventes: 132,857 FC
4. Meilleur jour: Samedi (200,000 FC)
5. Pire jour: Jeudi (80,000 FC)
6. Jours avec ventes > 100,000 FC: 5/7
```

---

## 10. Résumé et ressources

### 🎯 Ce que vous avez appris

Dans ce chapitre, vous avez découvert :

1. **Python et la Data Science**
   - Pourquoi Python est le langage de choix pour la Data Science
   - Applications concrètes en RDC

2. **Concepts fondamentaux**
   - Variables et types de données (`int`, `float`, `str`, `bool`, `list`)
   - Opérations mathématiques et logiques
   - Affichage avec `print()` et formatage

3. **Structures de contrôle**
   - Conditions : `if`, `elif`, `else`
   - Boucles : `for`, `while`
   - Contrôle de flux : `break`, `continue`

4. **Fonctions**
   - Définition et appel de fonctions
   - Paramètres et valeurs de retour
   - Documentation avec docstrings

5. **Applications pratiques**
   - Calcul de moyennes scolaires
   - Analyse de températures
   - Gestion de stock
   - Conversion de devises
   - Production agricole

### 📚 Ressources supplémentaires

#### Documentation officielle
- [Python.org](https://www.python.org/) - Site officiel de Python
- [Documentation Python en français](https://docs.python.org/fr/3/)
- [Tutoriel officiel Python](https://docs.python.org/fr/3/tutorial/)

#### Cours en ligne
- [OpenClassrooms - Apprenez les bases de Python](https://openclassrooms.com/fr/courses/7168871-apprenez-les-bases-du-langage-python)
- [France IOI - Cours et exercices](http://www.france-ioi.org/)
- [W3Schools Python Tutorial](https://www.w3schools.com/python/)

#### Livres recommandés
- "Python pour les nuls" - John Paul Mueller
- "Automate the Boring Stuff with Python" - Al Sweigart (gratuit en ligne)
- "Python Crash Course" - Eric Matthes

#### Plateformes d'exercices
- [HackerRank](https://www.hackerrank.com/domains/python)
- [Codewars](https://www.codewars.com/)
- [LeetCode](https://leetcode.com/)

### 🎓 Prochaines étapes

Dans le **Chapitre 2 : Manipulation de données avec Pandas**, vous découvrirez :

- 📊 **Pandas** : Travailler avec des tableaux de données
- 📈 **Visualisation** : Créer des graphiques avec Matplotlib
- 🔢 **NumPy** : Calculs numériques avancés
- 📁 **Fichiers** : Lire et écrire des fichiers CSV, Excel

### ✅ Auto-évaluation

Avant de passer au chapitre suivant, assurez-vous de pouvoir :

- [ ] Créer et manipuler des variables
- [ ] Utiliser les différents types de données
- [ ] Effectuer des calculs mathématiques
- [ ] Écrire des conditions avec `if`, `elif`, `else`
- [ ] Créer des boucles `for` et `while`
- [ ] Définir et utiliser des fonctions
- [ ] Résoudre des problèmes pratiques avec Python

### 💡 Conseils pour progresser

1. **Pratiquez régulièrement** : 30 minutes par jour valent mieux que 3 heures une fois par semaine
2. **Lisez du code** : Étudiez les solutions des exercices et le code d'autres développeurs
3. **Créez vos propres projets** : Appliquez Python à vos problèmes quotidiens
4. **Rejoignez une communauté** : Échangez avec d'autres apprenants
5. **Soyez patient** : La programmation s'apprend progressivement

---

## 📝 Notes personnelles

Utilisez cet espace pour noter vos questions, remarques ou idées :

```
_____________________________________________________________

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
```

---

**Félicitations ! Vous avez terminé le Chapitre 1 ! 🎉**

*Continuez à pratiquer et rendez-vous au Chapitre 2 pour découvrir Pandas et la manipulation de données !*

---

## Informations sur le document

**Auteur :** RDC Education - Plateforme IA  
**Version :** 1.0  
**Date :** 2025  
**Licence :** Creative Commons BY-NC-SA 4.0  
**Contact :** support@rdc-education.cd

---

*Ce document fait partie du module "Data Science" de la plateforme RDC Education.*
