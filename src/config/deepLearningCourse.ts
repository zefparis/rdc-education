import { Module } from './enhancedCourseConfig';

export const deepLearningCourse: Module = {
  id: '3',
  slug: 'deep-learning',
  title: 'Deep Learning avec TensorFlow',
  description: 'Plongez dans les réseaux de neurones profonds avec TensorFlow et Keras pour créer des modèles d\'IA avancés et résoudre des problèmes complexes.',
  duration: '12 semaines',
  level: 'Avancé',
  icon: '🧠',
  color: 'from-purple-500 to-pink-500',
  image: '/images/deep-learning.jpg',
  pdf: '/modules/deep-learning/README.md',
  notebook: '/modules/deep-learning/module-dl.ipynb',
  audio: '/audio/module-deep-learning.mp3',
  colabUrl: 'https://colab.research.google.com/github/ia-solution-rdc/dl/blob/main/module-dl.ipynb',
  objectives: [
    'Comprendre l\'architecture et le fonctionnement des réseaux de neurones',
    'Maîtriser TensorFlow et Keras pour le développement de modèles',
    'Construire des réseaux de neurones pour différents types de problèmes',
    'Traiter et préparer les données pour l\'apprentissage profond',
    'Éviter et diagnostiquer le surapprentissage',
    'Optimiser les performances des modèles',
    'Déployer des modèles de Deep Learning en production'
  ],
  prerequisites: [
    'Machine Learning solide (algorithmes, évaluation)',
    'Programmation Python avancée et orientée objet',
    'Mathématiques : algèbre linéaire, calcul différentiel, probabilités',
    'Expérience avec NumPy et Pandas'
  ],
  sections: [
    {
      id: 'neural-networks-fundamentals',
      title: 'Réseaux de neurones : concepts fondamentaux',
      content: `
        <div class="course-section">
          <h3>Introduction aux réseaux de neurones</h3>
          <p>Un réseau de neurones artificiel est inspiré du fonctionnement du cerveau humain. Il s'agit d'un système de traitement de l'information composé de neurones interconnectés organisés en couches.</p>

          <h4>Architecture d'un réseau de neurones :</h4>
          <ul>
            <li><strong>Couche d'entrée :</strong> Reçoit les données d'origine</li>
            <li><strong>Couches cachées :</strong> Traitement intermédiaire des informations</li>
            <li><strong>Couche de sortie :</strong> Produit le résultat final</li>
            <li><strong>Connexions pondérées :</strong> Forces des liens entre neurones</li>
          </ul>

          <h3>Le perceptron : le neurone artificiel</h3>
          <p>Un perceptron est l'unité de base d'un réseau de neurones. Il calcule une combinaison linéaire de ses entrées, applique une fonction d'activation, et produit une sortie.</p>

          <h4>Fonctionnement du perceptron :</h4>
          <ol>
            <li><strong>Entrées pondérées :</strong> Chaque entrée est multipliée par un poids</li>
            <li><strong>Somme pondérée :</strong> Addition de toutes les entrées pondérées</li>
            <li><strong>Fonction d'activation :</strong> Transformation non-linéaire (ReLU, sigmoid, tanh)</li>
            <li><strong>Biais :</strong> Termes constants ajoutés à la somme</li>
          </ol>

          <h3>Fonctions d'activation courantes</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
            <div style="padding: 15px; background-color: #f0f8ff; border-radius: 8px; border-left: 4px solid #1e90ff;">
              <h5 style="color: #1e90ff; margin-top: 0;">🔷 Sigmoid</h5>
              <p>σ(x) = 1 / (1 + e^(-x))</p>
              <p><strong>Usage :</strong> Classification binaire, sortie de probabilité</p>
              <p><strong>Inconvénient :</strong> Vanishing gradient</p>
            </div>
            <div style="padding: 15px; background-color: #fff8dc; border-radius: 8px; border-left: 4px solid #ffa500;">
              <h5 style="color: #ffa500; margin-top: 0;">🟨 Tanh</h5>
              <p>tanh(x) = 2σ(2x) - 1</p>
              <p><strong>Usage :</strong> Centrage autour de zéro</p>
              <p><strong>Avantage :</strong> Meilleur que sigmoid pour certains cas</p>
            </div>
            <div style="padding: 15px; background-color: #f0fff0; border-radius: 8px; border-left: 4px solid #32cd32;">
              <h5 style="color: #32cd32; margin-top: 0;">🟩 ReLU</h5>
              <p>ReLU(x) = max(0, x)</p>
              <p><strong>Usage :</strong> Réseaux profonds, très populaire</p>
              <p><strong>Avantages :</strong> Rapide, pas de vanishing gradient</p>
            </div>
          </div>

          <div class="info-box">
            <strong>💡 Insight :</strong> Le choix de la fonction d'activation dépend du problème et de la position dans le réseau.
          </div>
        </div>
      `,
      order: 1,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Implémentation d\'un perceptron simple',
          description: 'Création et entraînement d\'un perceptron pour la classification binaire',
          code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Création d'un dataset simple pour classification binaire
X, y = make_blobs(n_samples=1000, centers=2, n_features=2,
                  random_state=42, cluster_std=2)

# Visualisation des données
plt.figure(figsize=(8, 6))
plt.scatter(X[y == 0][:, 0], X[y == 0][:, 1], c='blue', label='Classe 0', alpha=0.6)
plt.scatter(X[y == 1][:, 0], X[y == 1][:, 1], c='red', label='Classe 1', alpha=0.6)
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Dataset de classification binaire')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Préparation des données
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# Implémentation du perceptron
class Perceptron:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # Initialisation des poids
        self.weights = np.random.randn(n_features)
        self.bias = 0

        # Entraînement
        for _ in range(self.n_iterations):
            for idx, x_i in enumerate(X):
                # Calcul de la sortie
                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self._activation_function(linear_output)

                # Mise à jour des poids (règle du perceptron)
                update = self.learning_rate * (y[idx] - y_predicted)
                self.weights += update * x_i
                self.bias += update

    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        y_predicted = self._activation_function(linear_output)
        return y_predicted

    def _activation_function(self, x):
        return np.where(x >= 0, 1, 0)  # Fonction de seuil

# Entraînement du perceptron
perceptron = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron.fit(X_train, y_train)

# Évaluation
predictions = perceptron.predict(X_test)
accuracy = np.mean(predictions == y_test)
print(f"Précision du perceptron: {accuracy:.3f}")

# Visualisation de la frontière de décision
def plot_decision_boundary(X, y, model):
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.1),
                         np.arange(y_min, y_max, 0.1))

    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)

    plt.figure(figsize=(8, 6))
    plt.contourf(xx, yy, Z, alpha=0.4, cmap='RdYlBu')
    plt.scatter(X[y == 0][:, 0], X[y == 0][:, 1], c='blue', label='Classe 0')
    plt.scatter(X[y == 1][:, 0], X[y == 1][:, 1], c='red', label='Classe 1')
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.title('Frontière de décision du perceptron')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

plot_decision_boundary(X_scaled, y, perceptron)`,
          language: 'python',
          explanation: 'Cette implémentation montre le fonctionnement de base d\'un perceptron, l\'unité fondamentale des réseaux de neurones.'
        }
      ],
      exercises: [
        {
          id: 'ex-perceptron-logic',
          title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
          description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
          difficulty: 'moyen',
          solution: `# Dataset pour la fonction AND
X_and = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_and = np.array([0, 0, 0, 1])

# Entraînement du perceptron
perceptron_and = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron_and.fit(X_and, y_and)

# Test
predictions_and = perceptron_and.predict(X_and)
print("Fonction AND - Prédictions:", predictions_and)
print("Fonction AND - Réel:", y_and)
print(f"Précision: {np.mean(predictions_and == y_and):.3f}")`
        }
      ],
      resources: [
        {
          title: 'Neural Networks and Deep Learning - Michael Nielsen',
          type: 'article',
          url: 'http://neuralnetworksanddeeplearning.com/'
        },
        {
          title: 'TensorFlow - Réseaux de neurones',
          type: 'documentation',
          url: 'https://www.tensorflow.org/guide/keras/sequential_model'
        }
      ]
    },
    {
      id: 'tensorflow-keras',
      title: 'TensorFlow et Keras : développement de modèles',
      content: `
        <div class="course-section">
          <h3>TensorFlow et Keras : l'écosystème</h3>
          <p><strong>TensorFlow</strong> est la plateforme open-source de Google pour le Machine Learning, tandis que <strong>Keras</strong> est une API haut niveau qui simplifie la création de modèles de Deep Learning.</p>

          <h4>Avantages de Keras :</h4>
          <ul>
            <li><strong>Simplicité :</strong> Interface intuitive et concise</li>
            <li><strong>Flexibilité :</strong> Support de TensorFlow, Theano, CNTK</li>
            <li><strong>Modularité :</strong> Assemblage facile de composants</li>
            <li><strong>Extensibilité :</strong> Couches personnalisées possibles</li>
          </ul>

          <h3>Architecture des modèles séquentiels</h3>
          <p>Le modèle séquentiel est le plus simple : une pile linéaire de couches.</p>

          <h4>Types de couches :</h4>
          <ul>
            <li><strong>Dense :</strong> Couches entièrement connectées</li>
            <li><strong>Conv2D :</strong> Convolution pour images</li>
            <li><strong>LSTM/GRU :</strong> Récurrence pour séquences</li>
            <li><strong>Dropout :</strong> Régularisation</li>
          </ul>

          <div class="warning-box">
            <strong>⚠️ Important :</strong> L'ordre des couches est crucial pour les performances et la convergence.
          </div>
        </div>
      `,
      order: 2,
      estimatedTime: '4h',
      codeExamples: [
        {
          title: 'Premier réseau de neurones avec Keras',
          description: 'Classification MNIST avec un réseau fully-connected simple',
          code: `import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# Configuration pour la reproductibilité
np.random.seed(42)
tf.random.set_seed(42)

# 1. Chargement et préparation du dataset MNIST
(X_train_full, y_train_full), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalisation et validation
X_train_full = X_train_full / 255.0
X_test = X_test / 255.0

X_valid, X_train = X_train_full[:5000], X_train_full[5000:]
y_valid, y_train = y_train_full[:5000], y_train_full[5000:]

print(f"Entraînement: {X_train.shape}")
print(f"Validation: {X_valid.shape}")
print(f"Test: {X_test.shape}")
print(f"Classes: {np.unique(y_train_full)}")

# 2. Création du modèle séquentiel
model = keras.models.Sequential([
    keras.layers.Flatten(input_shape=[28, 28]),  # Couche d'aplatissement
    keras.layers.Dense(300, activation="relu"),    # Couche cachée 1
    keras.layers.Dense(100, activation="relu"),    # Couche cachée 2
    keras.layers.Dense(10, activation="softmax")   # Couche de sortie
])

# 3. Compilation du modèle
model.compile(
    loss="sparse_categorical_crossentropy",  # Fonction de perte
    optimizer="adam",                        # Optimiseur
    metrics=["accuracy"]                     # Métriques à suivre
)

# 4. Affichage de l'architecture
model.summary()

# 5. Entraînement du modèle
history = model.fit(
    X_train, y_train,
    epochs=20,
    validation_data=(X_valid, y_valid),
    batch_size=32,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True),
        keras.callbacks.ModelCheckpoint("best_mnist_model.h5", save_best_only=True)
    ]
)

# 6. Évaluation sur le test set
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\n🎯 Performance sur le test set:")
print(f"Loss: {test_loss:.4f}")
print(f"Accuracy: {test_acc:.4f}")

# 7. Analyse des courbes d'apprentissage
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Évolution de la précision')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.title('Évolution de la perte')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 8. Prédictions sur quelques exemples
predictions = model.predict(X_test[:5])
predicted_labels = np.argmax(predictions, axis=1)

print("\\n🔍 Prédictions sur les 5 premiers exemples:")
print(f"Prédit: {predicted_labels}")
print(f"Réel:   {y_test[:5]}")

# Affichage des images avec prédictions
plt.figure(figsize=(10, 4))
for i in range(5):
    plt.subplot(1, 5, i+1)
    plt.imshow(X_test[i], cmap='gray')
    plt.title(f"Prédit: {predicted_labels[i]}\\nRéel: {y_test[i]}")
    plt.axis('off')
plt.tight_layout()
plt.show()`,
          language: 'python',
          explanation: 'Ce premier réseau de neurones avec Keras montre comment résoudre un problème classique de reconnaissance de chiffres manuscrits (MNIST).'
        }
      ],
      exercises: [
        {
          id: 'ex-keras-fashion',
          title: 'Classification Fashion MNIST',
          description: 'Adaptez le code précédent pour classifier des vêtements avec le dataset Fashion MNIST.',
          difficulty: 'moyen',
          solution: `# Adaptation pour Fashion MNIST
(X_train_full, y_train_full), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()

# Même préprocessing
X_train_full = X_train_full / 255.0
X_test = X_test / 255.0
X_valid, X_train = X_train_full[:5000], X_train_full[5000:]
y_valid, y_train = y_train_full[:5000], y_train_full[5000:]

# Même modèle mais avec plus de capacité
model_fashion = keras.models.Sequential([
    keras.layers.Flatten(input_shape=[28, 28]),
    keras.layers.Dense(512, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation="softmax")
])

model_fashion.compile(loss="sparse_categorical_crossentropy",
                      optimizer="adam",
                      metrics=["accuracy"])

# Entraînement plus long
history_fashion = model_fashion.fit(X_train, y_train, epochs=30,
                                    validation_data=(X_valid, y_valid))

# Évaluation
test_loss, test_acc = model_fashion.evaluate(X_test, y_test)
print(f"Fashion MNIST - Accuracy: {test_acc:.3f}")`
        }
      ]
    },
    {
      id: 'convolutional-neural-networks',
      title: 'Réseaux de neurones convolutionnels (CNN)',
      content: `
        <div class="course-section">
          <h3>Convolution : extraction de features</h3>
          <p>Les CNN sont spécialement conçus pour traiter des données avec structure spatiale comme les images. Ils utilisent la convolution pour extraire automatiquement des caractéristiques hiérarchiques.</p>

          <h4>Couches convolutionnelles :</h4>
          <ul>
            <li><strong>Filtres/Kernels :</strong> Matrices apprises qui détectent des patterns</li>
            <li><strong>Stride :</strong> Pas de déplacement du filtre</li>
            <li><strong>Padding :</strong> Gestion des bordures de l'image</li>
            <li><strong>Pooling :</strong> Réduction de dimension et généralisation</li>
          </ul>

          <h3>Architecture CNN typique</h3>
          <ol>
            <li><strong>Couches Conv2D :</strong> Extraction de features locales</li>
            <li><strong>Couches Pooling :</strong> Réduction de complexité</li>
            <li><strong>Couches Dense :</strong> Classification finale</li>
            <li><strong>Dropout :</strong> Prévention du surapprentissage</li>
          </ol>

          <h3>Transfer Learning</h3>
          <p>Utiliser des modèles pré-entraînés (VGG16, ResNet, etc.) comme base et les adapter à votre problème spécifique.</p>

          <div style="background-color: #e6f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <h5 style="color: #0066cc; margin-top: 0;">🔄 Avantages du Transfer Learning</h5>
            <ul>
              <li><strong>Gain de temps :</strong> Pas besoin d'entraîner de zéro</li>
              <li><strong>Meilleures performances :</strong> Modèles pré-entraînés sur datasets massifs</li>
              <li><strong>Moins de données nécessaires :</strong> Fine-tuning sur petit dataset</li>
            </ul>
          </div>
        </div>
      `,
      order: 3,
      estimatedTime: '5h',
      codeExamples: [
        {
          title: 'CNN pour classification d\'images CIFAR-10',
          description: 'Création d\'un réseau convolutionnel pour reconnaître des objets dans des images',
          code: `import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# 1. Chargement du dataset CIFAR-10
(X_train_full, y_train_full), (X_test, y_test) = keras.datasets.cifar10.load_data()

# Normalisation
X_train_full = X_train_full / 255.0
X_test = X_test / 255.0

X_valid, X_train = X_train_full[:5000], X_train_full[5000:]
y_valid, y_train = y_train_full[:5000], y_train_full[5000:]

# Classes du dataset
class_names = ['avion', 'auto', 'oiseau', 'chat', 'cerf', 'chien', 'grenouille', 'cheval', 'bateau', 'camion']

print(f"Entraînement: {X_train.shape}")
print(f"Test: {X_test.shape}")
print(f"Classes: {len(class_names)}")

# 2. Création du modèle CNN
model = keras.models.Sequential([
    # Bloc convolutionnel 1
    keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=[32, 32, 3]),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Dropout(0.25),

    # Bloc convolutionnel 2
    keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Dropout(0.25),

    # Bloc convolutionnel 3
    keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Dropout(0.25),

    # Classification
    keras.layers.Flatten(),
    keras.layers.Dense(512, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

# 3. Compilation
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    metrics=['accuracy']
)

# 4. Callbacks pour améliorer l'entraînement
callbacks = [
    keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
    keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3, min_lr=0.00001),
    keras.callbacks.ModelCheckpoint('best_cifar_model.h5', save_best_only=True)
]

# 5. Entraînement
history = model.fit(
    X_train, y_train,
    epochs=50,
    validation_data=(X_valid, y_valid),
    batch_size=64,
    callbacks=callbacks,
    verbose=1
)

# 6. Évaluation
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\n🎯 Performance sur CIFAR-10:")
print(f"Loss: {test_loss:.4f}")
print(f"Accuracy: {test_acc:.4f}")

# 7. Visualisation des prédictions
def plot_predictions(X, y_true, y_pred, class_names, n_samples=5):
    plt.figure(figsize=(15, 6))

    indices = np.random.choice(len(X), n_samples, replace=False)

    for i, idx in enumerate(indices):
        plt.subplot(2, n_samples, i + 1)
        plt.imshow(X[idx])
        plt.title(f"R: {class_names[y_true[idx][0]]}\\nP: {class_names[y_pred[idx]]}")
        plt.axis('off')

        plt.subplot(2, n_samples, i + n_samples + 1)
        # Création d'un heatmap simple des activations
        plt.imshow(np.random.rand(8, 8), cmap='hot', interpolation='nearest')
        plt.title('Activations (simulé)')
        plt.axis('off')

    plt.tight_layout()
    plt.show()

# Prédictions
y_pred = model.predict(X_test)
y_pred_classes = np.argmax(y_pred, axis=1)

plot_predictions(X_test, y_test, y_pred_classes, class_names)`,
          language: 'python',
          explanation: 'Ce CNN montre comment traiter des images couleur complexes avec une architecture convolutionnelle moderne utilisant BatchNormalization et Dropout.'
        }
      ],
      exercises: [
        {
          id: 'ex-cnn-custom',
          title: 'CNN personnalisé pour petits datasets',
          description: 'Créez un CNN simple pour le dataset MNIST avec data augmentation.',
          difficulty: 'difficile',
          solution: `from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Data augmentation pour éviter le surapprentissage
datagen = ImageDataGenerator(
    rotation_range=10,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1,
    fill_mode='nearest'
)

# Création du modèle CNN simple
model_simple = keras.models.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=[28, 28, 1]),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model_simple.compile(loss='sparse_categorical_crossentropy',
                     optimizer='adam',
                     metrics=['accuracy'])

# Entraînement avec data augmentation
history = model_simple.fit(
    datagen.flow(X_train.reshape(-1, 28, 28, 1), y_train, batch_size=32),
    epochs=20,
    validation_data=(X_valid.reshape(-1, 28, 28, 1), y_valid)
)

# Évaluation
test_loss, test_acc = model_simple.evaluate(X_test.reshape(-1, 28, 28, 1), y_test)
print(f"CNN simple - Accuracy: {test_acc:.3f}")`
        }
      ]
    },
    {
      id: 'recurrent-neural-networks',
      title: 'Réseaux de neurones récurrents (RNN)',
      content: `
        <div class="course-section">
          <h3>Traitement des données séquentielles</h3>
          <p>Les RNN sont conçus pour traiter des données séquentielles où l'ordre importe : séries temporelles, texte, audio, vidéos.</p>

          <h4>Principe de récurrence :</h4>
          <ul>
            <li><strong>Mémoire :</strong> Les RNN maintiennent un état interne (hidden state)</li>
            <li><strong>Dépendance temporelle :</strong> Chaque prédiction dépend des précédentes</li>
            <li><strong>Partage des poids :</strong> Même fonction appliquée à chaque pas de temps</li>
          </ul>

          <h3>Problèmes des RNN classiques</h3>
          <ul>
            <li><strong>Vanishing gradient :</strong> Gradients deviennent très petits</li>
            <li><strong>Exploding gradient :</strong> Gradients deviennent très grands</li>
            <li><strong>Dépendances à long terme :</strong> Difficulté à retenir l'information</li>
          </ul>

          <h3>LSTM et GRU : solutions avancées</h3>
          <p><strong>LSTM (Long Short-Term Memory)</strong> et <strong>GRU (Gated Recurrent Unit)</strong> résolvent ces problèmes avec des mécanismes de gating sophistiqués.</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="padding: 15px; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
              <h5 style="color: #856404; margin-top: 0;">🧠 LSTM</h5>
              <p>Plus complexe mais plus puissant</p>
              <ul>
                <li>Cell state séparé</li>
                <li>3 gates (forget, input, output)</li>
                <li>Meilleur pour séquences longues</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
              <h5 style="color: #155724; margin-top: 0;">⚡ GRU</h5>
              <p>Version simplifiée mais efficace</p>
              <ul>
                <li>2 gates seulement</li>
                <li>Plus rapide à entraîner</li>
                <li>Performance similaire au LSTM</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      order: 4,
      estimatedTime: '4h',
      codeExamples: [
        {
          title: 'Prédiction de séries temporelles avec LSTM',
          description: 'Utilisation d\'un LSTM pour prédire la valeur future d\'une série temporelle',
          code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from tensorflow import keras

# 1. Génération d'une série temporelle sinusoïdale avec tendance
np.random.seed(42)
n_points = 1000
t = np.linspace(0, 4*np.pi, n_points)

# Série avec tendance et bruit
trend = 0.5 * t
seasonal = 2 * np.sin(2*t) + np.sin(5*t)
noise = 0.3 * np.random.randn(n_points)
time_series = trend + seasonal + noise

# Préparation des données pour le RNN
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:(i + seq_length)])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

sequence_length = 50
X, y = create_sequences(time_series, sequence_length)

# Division train/test
train_size = int(0.8 * len(X))
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

print(f"Train: {X_train.shape}, Test: {X_test.shape}")

# Reshape pour LSTM [samples, time_steps, features]
X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))

# 2. Création du modèle LSTM
model = keras.models.Sequential([
    keras.layers.LSTM(50, activation='relu', return_sequences=True, input_shape=(sequence_length, 1)),
    keras.layers.LSTM(50, activation='relu'),
    keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse')

# 3. Entraînement
history = model.fit(X_train, y_train, epochs=50, batch_size=32,
                    validation_split=0.1, verbose=1)

# 4. Évaluation
y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"\\n📊 Performance du modèle LSTM:")
print(f"RMSE: {rmse:.4f}")

# 5. Visualisation des prédictions
plt.figure(figsize=(15, 8))

# Série complète
plt.subplot(2, 1, 1)
plt.plot(range(len(time_series)), time_series, label='Série réelle', alpha=0.7)
plt.axvline(x=train_size + sequence_length, color='red', linestyle='--', label='Début prédictions')
plt.xlabel('Temps')
plt.ylabel('Valeur')
plt.title('Série temporelle complète avec prédictions LSTM')
plt.legend()
plt.grid(True, alpha=0.3)

# Zoom sur les prédictions
plt.subplot(2, 1, 2)
test_indices = range(train_size + sequence_length, len(time_series))
plt.plot(test_indices, time_series[train_size + sequence_length:], label='Valeurs réelles', color='blue')
plt.plot(test_indices, y_pred.flatten(), label='Prédictions LSTM', color='red', linestyle='--')
plt.xlabel('Temps')
plt.ylabel('Valeur')
plt.title('Prédictions vs Réel (zone de test)')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 6. Prédiction future (forecasting)
def predict_future(model, last_sequence, n_steps):
    predictions = []
    current_sequence = last_sequence.copy()

    for _ in range(n_steps):
        # Prédiction du prochain point
        next_pred = model.predict(current_sequence.reshape(1, sequence_length, 1))
        predictions.append(next_pred[0, 0])

        # Mise à jour de la séquence
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[-1] = next_pred[0, 0]

    return np.array(predictions)

# Prédiction de 50 points futurs
last_sequence = time_series[-sequence_length:]
future_predictions = predict_future(model, last_sequence, 50)

# Visualisation avec prédictions futures
plt.figure(figsize=(12, 6))
plt.plot(range(len(time_series)), time_series, label='Données historiques', color='blue')
plt.plot(range(len(time_series), len(time_series) + 50), future_predictions,
         label='Prédictions futures', color='red', linestyle='--')
plt.axvline(x=len(time_series), color='red', linestyle='--', alpha=0.7)
plt.xlabel('Temps')
plt.ylabel('Valeur')
plt.title('Prédictions futures avec le modèle LSTM')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()`,
          language: 'python',
          explanation: 'Ce modèle LSTM montre comment prédire l\'évolution future d\'une série temporelle en apprenant les patterns passés.'
        }
      ],
      exercises: [
        {
          id: 'ex-lstm-text',
          title: 'Génération de texte avec LSTM',
          description: 'Créez un modèle LSTM simple pour générer du texte à partir d\'un corpus d\'entraînement.',
          difficulty: 'difficile',
          solution: `from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Texte d'exemple simple
text = "Bonjour le monde. Bonjour l'intelligence artificielle. Bonjour le deep learning."

# Tokenization
tokenizer = Tokenizer(char_level=True)  # Caractères plutôt que mots pour la simplicité
tokenizer.fit_on_texts([text])

# Conversion en séquences
sequences = []
for i in range(1, len(text)):
    seq = text[:i+1]
    sequences.append(seq)

# Préparation des données
max_sequence_len = max([len(seq) for seq in sequences])
vocab_size = len(tokenizer.word_index) + 1

# Création des séquences d'entrée/sortie
X = []
y = []
for seq in sequences:
    encoded = tokenizer.texts_to_sequences([seq])[0]
    X.append(encoded[:-1])
    y.append(encoded[-1])

X = pad_sequences(X, maxlen=max_sequence_len-1, padding='pre')
y = keras.utils.to_categorical(y, num_classes=vocab_size)

# Modèle LSTM simple
model_text = keras.models.Sequential([
    keras.layers.Embedding(vocab_size, 50, input_length=max_sequence_len-1),
    keras.layers.LSTM(100),
    keras.layers.Dense(vocab_size, activation='softmax')
])

model_text.compile(loss='categorical_crossentropy', optimizer='adam')

# Entraînement rapide
model_text.fit(X, y, epochs=100, verbose=0)

print("Modèle de génération de texte entraîné!")
print(f"Vocabulaire: {vocab_size} caractères")`
        }
      ]
    }
  ],
  finalProject: {
    title: 'Projet Deep Learning Avancé : Application complète',
    description: 'Développez une application de Deep Learning complète avec interface utilisateur pour un problème réel de votre choix.',
    requirements: [
      'Choix d\'un domaine spécifique (vision, NLP, séries temporelles, audio)',
      'Collecte et préparation d\'un dataset approprié (minimum 10,000 échantillons)',
      'Conception et implémentation d\'une architecture de réseau adaptée',
      'Entraînement poussé avec optimisation des hyperparamètres',
      'Évaluation rigoureuse avec métriques appropriées et analyse d\'erreurs',
      'Interface web moderne (React/Streamlit) pour démonstration',
      'Comparaison avec d\'autres approches (ML classique, autres architectures)',
      'Analyse de l\'interprétabilité et des limitations du modèle',
      'Optimisation pour le déploiement (quantization, pruning)',
      'Documentation complète et guide d\'utilisation'
    ],
    deliverables: [
      'Code source complet avec architecture modulaire',
      'Notebook d\'expérimentation et d\'analyse',
      'Application web fonctionnelle avec interface intuitive',
      'Modèle entraîné optimisé et sauvegardé',
      'Rapport technique détaillé (15-20 pages)',
      'Présentation orale de 20 minutes avec démonstration',
      'Code de déploiement (Docker, scripts d\'installation)',
      'Jeu de données nettoyé et documenté',
      'Guide d\'utilisateur et tutoriels',
      'Évaluation des performances et benchmarks'
    ]
  },
  resources: [
    {
      title: 'Deep Learning Specialization - Coursera (Andrew Ng)',
      type: 'video',
      url: 'https://www.coursera.org/specializations/deep-learning'
    },
    {
      title: 'TensorFlow Documentation complète',
      type: 'documentation',
      url: 'https://www.tensorflow.org/guide'
    },
    {
      title: 'CS231n - Convolutional Neural Networks',
      type: 'video',
      url: 'https://cs231n.github.io/'
    },
    {
      title: 'Attention Is All You Need - Paper fondateur',
      type: 'article',
      url: 'https://arxiv.org/abs/1706.03762'
    },
    {
      title: 'Papers with Code - État de l\'art',
      type: 'article',
      url: 'https://paperswithcode.com/'
    }
  ],
  tags: ['deep-learning', 'tensorflow', 'keras', 'neural-networks', 'cnn', 'rnn', 'lstm', 'python', 'ai']
};
