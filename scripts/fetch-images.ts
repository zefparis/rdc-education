import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// Configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const IMAGES_PER_THEME = 5;

const THEMES = [
  { name: 'education', query: 'education technology students learning classroom' },
  { name: 'ai', query: 'artificial intelligence technology robot machine learning' },
  { name: 'students', query: 'african students university college studying' },
  { name: 'africa', query: 'africa technology innovation digital modern' },
  { name: 'data-science', query: 'data science analytics visualization charts graphs' },
  { name: 'deep-learning', query: 'neural networks deep learning AI technology' },
];

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  user: {
    name: string;
  };
  description: string | null;
}

/**
 * Télécharge une image depuis une URL
 */
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000, // 30 secondes timeout
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(true));
      writer.on('error', (error) => {
        fs.unlinkSync(filepath); // Supprimer le fichier corrompu
        reject(error);
      });
    });
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Nettoyer en cas d'erreur
    }
    throw error;
  }
}

/**
 * Récupère des images depuis Unsplash pour un thème donné
 */
async function fetchImagesForTheme(
  theme: { name: string; query: string },
  count: number
): Promise<void> {
  console.log(`\n📸 Téléchargement des images pour le thème: "${theme.name}"`);

  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'votre_cle_unsplash_ici') {
    console.error('❌ Erreur: UNSPLASH_ACCESS_KEY non définie dans .env.local');
    console.error('   Obtenez votre clé sur: https://unsplash.com/developers');
    process.exit(1);
  }

  try {
    // Créer le dossier de destination AVANT de télécharger
    const themeDir = path.join(process.cwd(), 'public', 'images', theme.name);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
      console.log(`📁 Dossier créé: public/images/${theme.name}/`);
    }

    // Appel à l'API Unsplash
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: theme.query,
        per_page: count,
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      timeout: 10000,
    });

    const images: UnsplashImage[] = response.data.results;

    if (images.length === 0) {
      console.warn(`⚠️  Aucune image trouvée pour "${theme.name}"`);
      return;
    }

    console.log(`   Trouvé ${images.length} images`);

    // Télécharger chaque image
    let successCount = 0;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const filename = `${theme.name}_${i + 1}.jpg`;
      const filepath = path.join(themeDir, filename);

      // Vérifier si l'image existe déjà
      if (fs.existsSync(filepath)) {
        console.log(`  ⏭️  ${filename} existe déjà (ignoré)`);
        successCount++;
        continue;
      }

      try {
        await downloadImage(image.urls.regular, filepath);
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`  ✅ ${filename} (${sizeKB} KB) - par ${image.user.name}`);
        successCount++;
      } catch (error) {
        console.error(`  ⚠️  Erreur téléchargement ${filename}:`, error instanceof Error ? error.message : 'Erreur inconnue');
      }
    }

    console.log(`✨ ${successCount}/${images.length} images téléchargées pour "${theme.name}"`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`❌ Erreur API Unsplash pour "${theme.name}":`, error.message);
      if (error.response?.status === 401) {
        console.error('   🔑 Vérifiez votre clé API Unsplash dans .env.local');
      } else if (error.response?.status === 403) {
        console.error('   🚫 Limite de requêtes atteinte. Attendez 1 heure.');
      }
    } else {
      console.error(`❌ Erreur inattendue pour "${theme.name}":`, error);
    }
  }
}

/**
 * Crée un fichier de métadonnées pour les images
 */
function createImageMetadata(): void {
  const metadata = {
    themes: THEMES.map((theme) => theme.name),
    imagesPerTheme: IMAGES_PER_THEME,
    totalImages: THEMES.length * IMAGES_PER_THEME,
    generatedAt: new Date().toISOString(),
    source: 'Unsplash',
  };

  const metadataPath = path.join(process.cwd(), 'public', 'images', 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log('\n📄 Métadonnées créées: metadata.json');
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Démarrage du téléchargement des images depuis Unsplash\n');
  console.log(`📊 Configuration:`);
  console.log(`   - Thèmes: ${THEMES.length}`);
  console.log(`   - Images par thème: ${IMAGES_PER_THEME}`);
  console.log(`   - Total: ${THEMES.length * IMAGES_PER_THEME} images\n`);

  // Créer le dossier principal images s'il n'existe pas
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Télécharger les images pour chaque thème
  for (const theme of THEMES) {
    await fetchImagesForTheme(theme, IMAGES_PER_THEME);
    // Pause de 1 seconde entre chaque thème pour respecter les limites de l'API
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Créer les métadonnées
  createImageMetadata();

  console.log('\n✅ Téléchargement terminé avec succès !');
  console.log(`📁 Images sauvegardées dans: public/images/`);
  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifiez les images dans public/images/');
  console.log('   2. Lancez le serveur: npm run dev');
  console.log('   3. Les images seront automatiquement utilisées dans l\'application\n');
}

// Exécution
main().catch((error) => {
  console.error('\n❌ Erreur fatale:', error);
  process.exit(1);
});
