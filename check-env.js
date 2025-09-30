// Script de vérification des variables d'environnement
console.log('=== Vérification des variables d\'environnement ===\n');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

console.log('OPENAI_API_KEY présente:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY longueur:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
console.log('OPENAI_API_KEY commence par:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'N/A');

if (process.env.OPENAI_API_KEY) {
  console.log('\n✅ La clé API OpenAI est correctement configurée !');
} else {
  console.log('\n❌ La clé API OpenAI n\'est PAS configurée.');
  console.log('Vérifiez que le fichier .env.local existe et contient OPENAI_API_KEY=...');
}

console.log('\n=== Fin de la vérification ===');
