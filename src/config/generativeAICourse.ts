import { Module } from './enhancedCourseConfig';

export const generativeAICourse: Module = {
  id: '4',
  slug: 'ia-generative',
  title: 'Intelligence Artificielle Générative',
  description: 'Créez du contenu avec l\'IA : texte (GPT), images (DALL·E), audio (TTS) et combinez les modalités pour des applications innovantes.',
  duration: '8 semaines',
  level: 'Intermédiaire',
  icon: '🎨',
  color: 'from-orange-500 to-red-500',
  image: '/images/ia-generative.jpg',
  pdf: '/modules/ia-generative/README.md',
  notebook: '/modules/ia-generative/module-ia-generative.ipynb',
  audio: '/audio/module_ia-generative.mp3',
  colabUrl: 'https://colab.research.google.com/github/ia-solution-rdc/genai/blob/main/module-genai.ipynb',
  objectives: [
    'Comprendre les principes de l\'IA générative',
    'Maîtriser les modèles de génération de texte (GPT)',
    'Créer des images avec l\'IA (DALL·E, Stable Diffusion)',
    'Générer de l\'audio et de la musique',
    'Combiner plusieurs modalités (texte, image, audio)',
    'Développer des applications créatives avec l\'IA',
    'Comprendre les enjeux éthiques et légaux'
  ],
  prerequisites: [
    'Bases solides en Python et Machine Learning',
    'Compréhension du Deep Learning (TensorFlow/Keras)',
    'Notions de traitement du langage naturel',
    'Connaissance de l\'algèbre linéaire'
  ],
  sections: [
    {
      id: 'generative-ai-fundamentals',
      title: 'Principes fondamentaux de l\'IA générative',
      content: `
        <div class="course-section">
          <h3>Qu'est-ce que l'IA générative ?</h3>
          <p>L'IA générative désigne les systèmes d'intelligence artificielle capables de créer du contenu original : texte, images, audio, vidéos, code, etc. Contrairement aux modèles discriminatifs qui classifient ou prédisent, les modèles génératifs apprennent les patterns des données pour créer du nouveau contenu.</p>

          <h4>Paradigmes de génération :</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
            <div style="padding: 15px; background-color: #e6f3ff; border-radius: 8px; border-left: 4px solid #0066cc;">
              <h5 style="color: #0066cc; margin-top: 0;">📝 Génération de texte</h5>
              <p>Modèles de langage comme GPT</p>
              <ul>
                <li>Traduction automatique</li>
                <li>Rédaction d'articles</li>
                <li>Chatbots conversationnels</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #fff0f5; border-radius: 8px; border-left: 4px solid #ff69b4;">
              <h5 style="color: #ff69b4; margin-top: 0;">🎨 Génération d'images</h5>
              <p>Modèles de diffusion comme DALL·E</p>
              <ul>
                <li>Création artistique</li>
                <li>Design graphique</li>
                <li>Illustration automatique</li>
              </ul>
            </div>
            <div style="padding: 15px; background-color: #f0fff0; border-radius: 8px; border-left: 4px solid #32cd32;">
              <h5 style="color: #32cd32; margin-top: 0;">🎵 Génération audio</h5>
              <p>Synthèse vocale et musicale</p>
              <ul>
                <li>Text-to-Speech (TTS)</li>
                <li>Composition musicale</li>
                <li>Clonage de voix</li>
              </ul>
            </div>
          </div>

          <h3>Fonctionnement des modèles génératifs</h3>
          <h4>1. Apprentissage des distributions</h4>
          <p>Les modèles génératifs apprennent la distribution de probabilité des données d'entraînement pour pouvoir échantillonner de nouvelles données réalistes.</p>

          <h4>2. Maximum de vraisemblance</h4>
          <p>L'objectif est de maximiser la probabilité que le modèle génère des données similaires à celles d'entraînement.</p>

          <h4>3. Techniques d'échantillonnage</h4>
          <ul>
            <li><strong>Greedy decoding :</strong> Choix du token le plus probable</li>
            <li><strong>Beam search :</strong> Exploration de plusieurs séquences</li>
            <li><strong>Top-k sampling :</strong> Échantillonnage parmi les k tokens les plus probables</li>
            <li><strong>Nucleus sampling :</strong> Échantillonnage dynamique selon la masse de probabilité</li>
          </ul>

          <div class="warning-box">
            <strong>⚠️ Considérations éthiques :</strong> L'IA générative soulève des questions importantes sur la propriété intellectuelle, les deepfakes, et l'impact sur l'emploi.
          </div>
        </div>
      `,
      order: 1,
      estimatedTime: '2h',
      codeExamples: [
        {
          title: 'Introduction à la génération de texte avec GPT-2',
          description: 'Premiers pas avec un modèle de langage pour générer du texte',
          code: `import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import warnings
warnings.filterwarnings('ignore')

print("🤖 Initialisation du modèle GPT-2...")

# Chargement du modèle et du tokenizer
model_name = "gpt2"  # Version légère pour débuter
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Configuration pour l'évaluation
model.eval()

def generate_text(prompt, max_length=100, temperature=0.7):
    """
    Génère du texte à partir d'un prompt

    Args:
        prompt: Texte de départ
        max_length: Longueur maximale du texte généré
        temperature: Contrôle de la créativité (0.1 = conservateur, 1.0 = créatif)
    """
    # Tokenization du prompt
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Génération avec contrôle de température
    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=max_length,
            temperature=temperature,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            pad_token_id=tokenizer.eos_token_id,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )

    # Décodage du texte généré
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    return generated_text

# Tests de génération
print("\\n📝 Test 1 - Génération créative")
prompt1 = "L'intelligence artificielle va révolutionner"
result1 = generate_text(prompt1, max_length=150, temperature=0.8)
print(f"Prompt: {prompt1}")
print(f"Généré: {result1}\\n")

print("📝 Test 2 - Suite d'histoire")
prompt2 = "Dans un monde où les robots vivent parmi les humains"
result2 = generate_text(prompt2, max_length=120, temperature=0.7)
print(f"Prompt: {prompt2}")
print(f"Généré: {result2}\\n")

print("📝 Test 3 - Réponse technique")
prompt3 = "Comment créer un modèle de machine learning ?"
result3 = generate_text(prompt3, max_length=180, temperature=0.6)
print(f"Prompt: {prompt3}")
print(f"Généré: {result3}\\n")

# Comparaison des températures
print("🌡️ Comparaison des températures:")
for temp in [0.1, 0.5, 0.9]:
    result = generate_text("Le futur de l'IA", max_length=80, temperature=temp)
    print(f"Température {temp}: {result}")`,
          language: 'python',
          explanation: 'Ce code montre comment utiliser un modèle GPT-2 pré-entraîné pour générer du texte de manière contrôlée avec différents niveaux de créativité.'
        }
      ],
      exercises: [
        {
          id: 'ex-gpt-prompt-engineering',
          title: 'Ingénierie des prompts',
          description: 'Expérimentez différents types de prompts pour améliorer la qualité de génération de texte.',
          difficulty: 'facile',
          solution: `# Différentes techniques de prompt engineering

prompts = [
    "Écris une histoire courte sur un robot bienveillant",
    "Raconte-moi une histoire courte. Thème: robot bienveillant. Style: conte pour enfants",
    "Histoire courte:\\nProtagoniste: Robot bienveillant\\nIntrigue: Découverte d'un jardin secret\\nFin: Leçon d'amitié",
    "Tu es un auteur de contes pour enfants. Écris une histoire de 100 mots sur un robot qui découvre un jardin magique avec des fleurs qui chantent."
]

for i, prompt in enumerate(prompts, 1):
    print(f"\\n--- Prompt {i} ---")
    print(f"Prompt: {prompt}")
    result = generate_text(prompt, max_length=150, temperature=0.7)
    print(f"Résultat: {result}")`
        }
      ],
      resources: [
        {
          title: 'Attention Is All You Need - Paper fondateur des transformers',
          type: 'article',
          url: 'https://arxiv.org/abs/1706.03762'
        },
        {
          title: 'The Illustrated GPT-2',
          type: 'article',
          url: 'https://jalammar.github.io/illustrated-gpt2/'
        },
        {
          title: 'Hugging Face Transformers',
          type: 'documentation',
          url: 'https://huggingface.co/docs/transformers/'
        }
      ]
    },
    {
      id: 'text-generation-models',
      title: 'Modèles avancés de génération de texte',
      content: `
        <div class="course-section">
          <h3>L'architecture Transformer</h3>
          <p>Les transformers sont devenus l'architecture dominante pour le traitement du langage naturel grâce à leur mécanisme d'attention qui permet de traiter les dépendances à longue portée efficacement.</p>

          <h4>Composants clés d'un Transformer :</h4>
          <ul>
            <li><strong>Attention multi-tête :</strong> Plusieurs mécanismes d'attention en parallèle</li>
            <li><strong>Encodeur-Décodeur :</strong> Architecture séquence-à-séquence</li>
            <li><strong>Positionnal encoding :</strong> Encodage de l'ordre des mots</li>
            <li><strong>Feed-forward networks :</strong> Transformation non-linéaire</li>
          </ul>

          <h3>GPT : Generative Pre-trained Transformer</h3>
          <p>GPT est un modèle génératif basé uniquement sur le décodeur du transformer original, pré-entraîné sur d'énormes quantités de texte.</p>

          <h4>Évolution de GPT :</h4>
          <ul>
            <li><strong>GPT-1 (2018) :</strong> 117M paramètres</li>
            <li><strong>GPT-2 (2019) :</strong> 1.5B paramètres</li>
            <li><strong>GPT-3 (2020) :</strong> 175B paramètres</li>
            <li><strong>GPT-4 (2023) :</strong> Paramètres non divulgués (estimés >1T)</li>
          </ul>

          <h3>Techniques avancées</h3>
          <h4>Fine-tuning</h4>
          <p>Adaptation d'un modèle pré-entraîné à une tâche spécifique avec un petit dataset.</p>

          <h4>Prompt engineering</h4>
          <p>Art de concevoir des prompts efficaces pour obtenir de meilleurs résultats.</p>

          <h4>Few-shot learning</h4>
          <p>Apprentissage avec très peu d'exemples grâce au pré-entraînement massif.</p>
        </div>
      `,
      order: 2,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Fine-tuning d\'un modèle de langage',
          description: 'Adaptation d\'un modèle GPT à une tâche spécifique avec un petit dataset',
          code: `import torch
from torch.utils.data import Dataset, DataLoader
from transformers import GPT2LMHeadModel, GPT2Tokenizer, AdamW, get_linear_schedule_with_warmup
import pandas as pd
import numpy as np

# 1. Préparation d'un petit dataset pour le fine-tuning
class TextDataset(Dataset):
    def __init__(self, texts, tokenizer, max_length=128):
        self.texts = texts
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]

        encoding = self.tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=self.max_length,
            return_tensors='pt'
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten()
        }

# Dataset d'exemple : génération de descriptions de produits
product_descriptions = [
    "Smartphone dernière génération avec caméra 108MP et batterie 5000mAh",
    "Ordinateur portable ultraléger parfait pour les développeurs",
    "Casque audio sans fil avec réduction de bruit active",
    "Montre connectée avec suivi de santé et GPS intégré",
    "Tablette graphique professionnelle pour artistes numériques"
]

# Ajout de prompts pour l'entraînement
training_texts = []
for desc in product_descriptions:
    # Format : "Produit : [description]"
    training_texts.append(f"Produit : {desc}")

print(f"📚 Dataset d'entraînement: {len(training_texts)} exemples")

# 2. Configuration du modèle
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Ajout du token de padding
tokenizer.pad_token = tokenizer.eos_token

# 3. Préparation des données
dataset = TextDataset(training_texts, tokenizer)
dataloader = DataLoader(dataset, batch_size=2, shuffle=True)

# 4. Configuration de l'optimisation
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

optimizer = AdamW(model.parameters(), lr=5e-5)
scheduler = get_linear_schedule_with_warmup(
    optimizer, num_warmup_steps=0, num_training_steps=len(dataloader) * 3
)

# 5. Entraînement (version simplifiée)
model.train()
epochs = 3

for epoch in range(epochs):
    total_loss = 0

    for batch in dataloader:
        optimizer.zero_grad()

        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)

        outputs = model(input_ids, attention_mask=attention_mask, labels=input_ids)
        loss = outputs.loss

        loss.backward()
        optimizer.step()
        scheduler.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(dataloader)
    print(f"Époque {epoch + 1}/{epochs} - Loss: {avg_loss:.4f}")

print("\\n✅ Fine-tuning terminé!")

# 6. Test du modèle fine-tuné
def generate_product_description(prompt, model, tokenizer, max_length=100):
    model.eval()

    input_text = f"Produit : {prompt}"
    input_ids = tokenizer.encode(input_text, return_tensors='pt').to(device)

    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=max_length,
            temperature=0.7,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            pad_token_id=tokenizer.eos_token_id
        )

    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text

# Tests
test_prompts = [
    "Caméra professionnelle",
    "Véhicule électrique autonome",
    "Intelligence artificielle"
]

print("\\n🛍️ Génération de descriptions de produits:")
for prompt in test_prompts:
    description = generate_product_description(prompt, model, tokenizer)
    print(f"\\nPrompt: {prompt}")
    print(f"Généré: {description}")`,
          language: 'python',
          explanation: 'Ce code montre comment fine-tuner un modèle GPT-2 sur un petit dataset spécifique pour générer des descriptions de produits personnalisées.'
        }
      ],
      exercises: [
        {
          id: 'ex-fine-tuning-custom',
          title: 'Fine-tuning pour génération de poésie',
          description: 'Adaptez un modèle GPT pour générer des poèmes dans un style spécifique.',
          difficulty: 'moyen',
          solution: `# Dataset de poèmes simples
poems = [
    "Roses are red, violets are blue,",
    "The sky is vast, the ocean deep,",
    "Stars twinkle bright in the night sky,",
    "Rivers flow gently to the sea,",
    "Mountains stand tall against the wind,"
]

# Fine-tuning avec des données de poésie
# Même approche que précédemment mais avec un style différent

# Test de génération de poésie
def generate_poem(prompt, model, tokenizer):
    model.eval()
    input_ids = tokenizer.encode(prompt, return_tensors='pt').to(device)

    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=50,
            temperature=0.8,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id
        )

    return tokenizer.decode(output[0], skip_special_tokens=True)

# Exemples de génération
poem_prompts = ["The moon shines", "Love is like", "Time flows"]
for prompt in poem_prompts:
    poem = generate_poem(prompt, model, tokenizer)
    print(f"\\nPoème généré:\\n{poem}")`
        }
      ]
    },
    {
      id: 'image-generation',
      title: 'Génération d\'images avec l\'IA',
      content: `
        <div class="course-section">
          <h3>DALL·E et la génération d\'images</h3>
          <p>DALL·E est un modèle d\'IA développé par OpenAI capable de générer des images à partir de descriptions textuelles. Il combine les capacités de GPT pour comprendre le langage naturel avec celles d'un modèle de génération d'images.</p>

          <h4>Fonctionnement de DALL·E :</h4>
          <ol>
            <li><strong>Encodage du texte :</strong> Le prompt textuel est transformé en embedding</li>
            <li><strong>Génération d'image :</strong> Un modèle de diffusion génère l'image</li>
            <li><strong>Affinement :</strong> Itérations pour améliorer la qualité</li>
            <li><strong>Variation :</strong> Possibilité de générer des variantes</li>
          </ol>

          <h3>Modèles de diffusion</h3>
          <p>Les modèles de diffusion sont l'approche dominante pour la génération d'images réalistes :</p>
          <ul>
            <li><strong>Forward process :</strong> Ajout progressif de bruit à une image</li>
            <li><strong>Reverse process :</strong> Apprentissage à retirer le bruit</li>
            <li><strong>Stable Diffusion :</strong> Modèle open-source populaire</li>
          </ul>

          <h3>Techniques de prompt engineering pour les images</h3>
          <ul>
            <li><strong>Détail descriptif :</strong> Plus le prompt est précis, mieux c'est</li>
            <li><strong>Style artistique :</strong> Spécifier le style (peinture à l'huile, photo réaliste)</li>
            <li><strong>Composition :</strong> Indiquer la disposition des éléments</li>
            <li><strong>Couleurs et éclairage :</strong> Contrôler l'ambiance visuelle</li>
          </ul>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <h5 style="color: #856404; margin-top: 0;">🎨 Conseils pour des prompts efficaces</h5>
            <ul>
              <li>Utilisez des adjectifs descriptifs</li>
              <li>Spécifiez le medium artistique</li>
              <li>Indiquez la composition souhaitée</li>
              <li>Ajoutez des détails sur l'éclairage</li>
            </ul>
          </div>
        </div>
      `,
      order: 3,
      estimatedTime: '3h',
      codeExamples: [
        {
          title: 'Génération d\'images avec Stable Diffusion',
          description: 'Utilisation de Stable Diffusion via l\'API Hugging Face pour générer des images',
          code: `import requests
import json
from PIL import Image
import io
import matplotlib.pyplot as plt

# Configuration de l'API Hugging Face (nécessite un token)
API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4"
HEADERS = {"Authorization": f"Bearer {'YOUR_HF_TOKEN'}"}

def generate_image(prompt, negative_prompt="", width=512, height=512):
    """
    Génère une image à partir d'un prompt textuel

    Args:
        prompt: Description de l'image souhaitée
        negative_prompt: Ce qu'il faut éviter dans l'image
        width, height: Dimensions de l'image
    """
    payload = {
        "inputs": prompt,
        "parameters": {
            "negative_prompt": negative_prompt,
            "width": width,
            "height": height,
            "num_inference_steps": 50,
            "guidance_scale": 7.5
        },
        "options": {"wait_for_model": True}
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code == 200:
        image = Image.open(io.BytesIO(response.content))
        return image
    else:
        print(f"Erreur API: {response.status_code}")
        print(response.text)
        return None

# Fonction pour afficher les images
def display_images(image_dict, cols=2):
    """Affiche plusieurs images générées"""
    rows = (len(image_dict) + cols - 1) // cols

    fig, axes = plt.subplots(rows, cols, figsize=(12, 8))

    if rows == 1:
        axes = axes.reshape(1, -1)
    elif cols == 1:
        axes = axes.reshape(-1, 1)

    for i, (title, img) in enumerate(image_dict.items()):
        row, col = i // cols, i % cols

        if img is not None:
            axes[row, col].imshow(img)
            axes[row, col].set_title(title, fontsize=10)
            axes[row, col].axis('off')
        else:
            axes[row, col].text(0.5, 0.5, f"Erreur génération\\n{title}",
                              ha='center', va='center', transform=axes[row, col].transAxes)

    plt.tight_layout()
    plt.show()

# Tests de génération d'images
print("🎨 Génération d'images avec Stable Diffusion...")

test_prompts = [
    "Un chat robotique dans un jardin futuriste, style cyberpunk, détails haute résolution",
    "Portrait d'un scientifique IA dans un laboratoire high-tech, éclairage dramatique",
    "Paysage urbain nocturne avec des tours lumineuses, style artistique numérique"
]

generated_images = {}

for i, prompt in enumerate(test_prompts, 1):
    print(f"\\n🖼️ Génération {i}/3: {prompt[:50]}...")
    image = generate_image(prompt)
    generated_images[f"Image {i}"] = image

# Affichage des résultats
print("\\n📸 Affichage des images générées:")
display_images(generated_images)

# Test avec des prompts plus créatifs
print("\\n🎭 Test avec différents styles artistiques:")

style_prompts = [
    "Un dragon médiéval volant au-dessus d'un château, style peinture à l'huile classique",
    "Portrait abstrait d'une femme, style cubiste Picasso, couleurs vives",
    "Paysage marin avec des vagues géantes, style impressionniste Monet"
]

style_images = {}
for i, prompt in enumerate(style_prompts, 1):
    print(f"\\n🎨 Style {i}: {prompt[:50]}...")
    image = generate_image(prompt)
    style_images[f"Style {i}"] = image

display_images(style_images)

# Comparaison avec et sans prompt négatif
print("\\n⚖️ Test avec prompt négatif:")

test_image = generate_image(
    prompt="Un chevalier en armure brillante dans une forêt enchantée",
    negative_prompt="flou, déformé, couleurs ternes, qualité médiocre"
)

comparison = {
    "Avec prompt négatif": test_image,
    "Sans prompt négatif": generate_image("Un chevalier en armure brillante dans une forêt enchantée")
}

display_images(comparison, cols=1)`,
          language: 'python',
          explanation: 'Ce code montre comment utiliser l\'API Hugging Face pour générer des images avec Stable Diffusion en contrôlant la qualité et le style.'
        }
      ],
      exercises: [
        {
          id: 'ex-image-prompts',
          title: 'Maîtrise des prompts pour les images',
          description: 'Expérimentez différents types de prompts pour améliorer la qualité des images générées.',
          difficulty: 'moyen',
          solution: `# Stratégies de prompt engineering pour les images

strategies = [
    {
        "nom": "Basique",
        "prompt": "Un chat dans un jardin"
    },
    {
        "nom": "Descriptif",
        "prompt": "Un chat siamois aux yeux bleus, assis gracieusement dans un jardin japonais zen, fleurs de cerisier en arrière-plan, style photographie professionnelle, éclairage naturel doux"
    },
    {
        "nom": "Artistique",
        "prompt": "Un chat mystique aux pouvoirs magiques, style fantasy art, couleurs vibrantes, détails complexes, inspiré de Studio Ghibli, haute qualité artistique"
    },
    {
        "nom": "Technique",
        "prompt": "Chat photographié en macro, détails du pelage visible, profondeur de champ faible, arrière-plan flou, éclairage studio professionnel, résolution 8K"
    }
]

print("🖼️ Comparaison des stratégies de prompting:")
for strategy in strategies:
    print(f"\\n--- {strategy['nom']} ---")
    print(f"Prompt: {strategy['prompt']}")
    # Note: Dans un environnement réel, vous généreriez l'image ici
    print("Génération d'image... (simulé)")

print("\\n📚 Leçon: Plus le prompt est détaillé et spécifique, meilleure est l'image générée!")`
        }
      ]
    },
    {
      id: 'audio-generation',
      title: 'Génération audio et synthèse vocale',
      content: `
        <div class="course-section">
          <h3>Text-to-Speech (TTS) : de texte à parole</h3>
          <p>La synthèse vocale transforme le texte écrit en parole naturelle. Les modèles modernes produisent une voix très réaliste avec l'intonation, le rythme et les émotions appropriés.</p>

          <h4>Applications du TTS :</h4>
          <ul>
            <li><strong>Accessibilité :</strong> Aide aux personnes malvoyantes</li>
            <li><strong>Assistants virtuels :</strong> Siri, Alexa, Google Assistant</li>
            <li><strong>Audiolivres :</strong> Conversion automatique de texte en audio</li>
            <li><strong>Éducation :</strong> Support d'apprentissage personnalisé</li>
          </ul>

          <h3>Modèles de synthèse vocale avancés</h3>
          <h4>WaveNet</h4>
          <p>Développé par DeepMind, génère de l'audio en prédisant les formes d'onde directement.</p>

          <h4>Tacotron</h4>
          <p>Combine un modèle séquence-à-séquence avec un vocodeur pour produire une parole naturelle.</p>

          <h4>VALL-E</h4>
          <p>Modèle Microsoft capable de reproduire n'importe quelle voix avec seulement 3 secondes d'échantillon.</p>

          <h3>Génération musicale avec l'IA</h3>
          <p>Les modèles comme MusicGen ou MuseNet peuvent composer de la musique originale dans différents styles.</p>

          <h4>Applications créatives :</h4>
          <ul>
            <li><strong>Composition automatique :</strong> Création de mélodies et harmonies</li>
            <li><strong>Accompagnement musical :</strong> Génération de backing tracks</li>
            <li><strong>Remix et variation :</strong> Transformation de musique existante</li>
          </ul>
        </div>
      `,
      order: 4,
      estimatedTime: '2h 30min',
      codeExamples: [
        {
          title: 'Synthèse vocale avec Tortoise TTS',
          description: 'Génération de parole à partir de texte avec contrôle de la voix et des émotions',
          code: `import torch
import torchaudio
import IPython.display as ipd
import numpy as np

# Note: Installation requise: pip install tortoise-tts
try:
    from tortoise.api import TextToSpeech
except ImportError:
    print("Installation de Tortoise TTS nécessaire:")
    print("pip install tortoise-tts")
    print("Ou utilisez une alternative comme pyttsx3 pour ce démo")

# Alternative avec pyttsx3 (plus simple à installer)
import pyttsx3

def text_to_speech_simple(text, voice_id=0, rate=150):
    """
    Synthèse vocale simple avec pyttsx3
    """
    engine = pyttsx3.init()

    # Configuration de la voix
    voices = engine.getProperty('voices')
    if voice_id < len(voices):
        engine.setProperty('voice', voices[voice_id].id)

    engine.setProperty('rate', rate)

    # Sauvegarde en fichier audio
    output_file = "generated_speech.wav"
    engine.save_to_file(text, output_file)
    engine.runAndWait()

    return output_file

# Tests de synthèse vocale
texts = [
    "Bonjour et bienvenue dans ce cours sur l'intelligence artificielle générative.",
    "L'IA peut créer du texte, des images, et même de la musique de manière autonome.",
    "Imaginez un monde où les ordinateurs composent des symphonies entières.",
    "C'est exactement ce que nous allons explorer ensemble dans cette formation."
]

print("🎤 Génération d'exemples audio...")

for i, text in enumerate(texts, 1):
    print(f"\\n📝 Texte {i}: {text[:50]}...")
    audio_file = text_to_speech_simple(text, rate=180)
    print(f"✅ Audio sauvegardé: {audio_file}")

# Démonstration de différentes voix et vitesses
print("\\n🎭 Variations de style:")

variations = [
    {"text": "Bonjour le monde", "rate": 120, "name": "Lente et posée"},
    {"text": "Bonjour le monde", "rate": 200, "name": "Rapide et dynamique"},
    {"text": "Bonjour le monde !", "rate": 160, "name": "Enthousiaste"}
]

for var in variations:
    audio_file = text_to_speech_simple(var["text"], rate=var["rate"])
    print(f"{var['name']}: {audio_file}")

# Génération de dialogues
print("\\n💬 Génération de dialogue:")

dialogue = [
    "Bonjour, je suis votre assistant IA personnel.",
    "Comment puis-je vous aider aujourd'hui ?",
    "Je peux répondre à vos questions, générer du texte, ou même créer des images.",
    "Quelle tâche souhaitez-vous que j'accomplisse ?"
]

for line in dialogue:
    audio_file = text_to_speech_simple(line, rate=170)
    print(f"Assistant: {line[:40]}... → {audio_file}")

print("\\n🎵 Tous les fichiers audio ont été générés avec succès!")
print("Vous pouvez les écouter pour entendre les différences de style et de débit.")`,
          language: 'python',
          explanation: 'Ce code montre comment utiliser la synthèse vocale pour transformer du texte en audio parlé avec différents styles et débits.'
        }
      ],
      exercises: [
        {
          id: 'ex-tts-story',
          title: 'Narration d\'histoire avec TTS',
          description: 'Créez un petit récit et générez son équivalent audio avec différentes voix.',
          difficulty: 'facile',
          solution: `# Histoire à narrer
story = """
Chapitre 1: La découverte

Dans un petit village niché au cœur des montagnes,
vivait un jeune inventeur nommé Alex.
Passionné par la science et la technologie,
il passait ses journées dans son atelier,
entouré d'engrenages, de circuits électroniques,
et de rêves d'innovation.

Un jour, en explorant les greniers de sa maison familiale,
il découvrit un ancien manuscrit poussiéreux.
Les pages jaunies contenaient des formules mathématiques complexes
et des schémas d'appareils étranges.

Intrigué, Alex commença à décrypter le document...
"""

# Génération de l'audio de l'histoire
print("📖 Génération de la narration...")
audio_file = text_to_speech_simple(story, rate=160)
print(f"✅ Histoire narrée sauvegardée: {audio_file}")

# Variantes avec différents styles
styles = [
    {"name": "Narrateur mystère", "rate": 140},
    {"name": "Narrateur dynamique", "rate": 180},
    {"name": "Narrateur solennel", "rate": 120}
]

for style in styles:
    audio_file = text_to_speech_simple(story, rate=style["rate"])
    print(f"{style['name']}: {audio_file}")`
        }
      ]
    }
  ],
  finalProject: {
    title: 'Application IA Générative Complète',
    description: 'Développez une application web qui combine génération de texte, d\'images et d\'audio pour créer des expériences multimédias uniques.',
    requirements: [
      'Interface web moderne avec sections pour chaque type de génération',
      'Génération de texte avec GPT (prompt engineering avancé)',
      'Génération d\'images avec Stable Diffusion (intégration API)',
      'Synthèse vocale avec contrôle des voix et émotions',
      'Fonctionnalité de combinaison : texte → image → audio',
      'Galerie des créations avec possibilité de sauvegarde',
      'Système de favoris et d\'historique des prompts',
      'Optimisation des performances (cache, file d\'attente)',
      'Interface responsive et accessible',
      'Documentation complète de l\'API et du code'
    ],
    deliverables: [
      'Application web complète et fonctionnelle',
      'Code source organisé avec architecture modulaire',
      'API REST pour la génération de contenu',
      'Interface utilisateur intuitive avec prévisualisations',
      'Base de données pour sauvegarder les créations',
      'Rapport technique détaillé (15-20 pages)',
      'Présentation vidéo de démonstration',
      'Guide d\'utilisateur et tutoriels',
      'Tests automatisés et benchmarks de performance',
      'Plan de déploiement et d\'hébergement'
    ]
  },
  resources: [
    {
      title: 'OpenAI API Documentation',
      type: 'documentation',
      url: 'https://platform.openai.com/docs'
    },
    {
      title: 'Hugging Face Diffusers',
      type: 'documentation',
      url: 'https://huggingface.co/docs/diffusers'
    },
    {
      title: 'Stable Diffusion WebUI',
      type: 'article',
      url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui'
    },
    {
      title: 'Tortoise TTS GitHub',
      type: 'article',
      url: 'https://github.com/neonbjb/tortoise-tts'
    },
    {
      title: 'The DALL·E 2 Prompt Book',
      type: 'article',
      url: 'https://dalle2-prompt-book.com/'
    }
  ],
  tags: ['ia-generative', 'gpt', 'dall-e', 'stable-diffusion', 'text-to-speech', 'prompt-engineering', 'ai-art', 'multimodal']
};
