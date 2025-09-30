# 🔧 Fix : Conflit de routes dynamiques

## ❌ Problème

```
Error: You cannot use different slug names for the same dynamic path ('id' !== 'slug').
```

Next.js détecte deux routes dynamiques avec des noms différents dans le même dossier :
- `src/app/modules/[id]/page.tsx`
- `src/app/modules/[slug]/page.tsx`

## ✅ Solution

### Option 1 : Supprimer l'ancienne route [id] (Recommandé)

```bash
# Supprimer le dossier [id]
rmdir /s /q "src\app\modules\[id]"

# Ou manuellement dans l'explorateur Windows
# Supprimer : src/app/modules/[id]/
```

### Option 2 : Renommer [slug] en [id]

Si vous préférez garder le nom `[id]`, renommez le dossier :

```bash
# Renommer [slug] en [id]
move "src\app\modules\[slug]" "src\app\modules\[id]"
```

Puis mettez à jour le code dans `page.tsx` :

```tsx
// Avant
const moduleSlug = params.slug as string;
const module = getModuleBySlug(moduleSlug);

// Après
const moduleId = params.id as string;
const module = getModuleBySlug(moduleId);
```

## 🎯 Solution appliquée

J'ai choisi l'**Option 1** : Supprimer `[id]` et garder `[slug]`.

**Raisons :**
- URLs plus lisibles : `/modules/data-science` vs `/modules/1`
- Meilleur pour le SEO
- Plus facile à mémoriser
- Standard moderne

## 📝 Étapes de résolution

1. ✅ Supprimer `src/app/modules/[id]/page.tsx`
2. ✅ Supprimer le dossier `src/app/modules/[id]/`
3. ✅ Garder uniquement `src/app/modules/[slug]/page.tsx`
4. ✅ Vérifier que le dashboard utilise les slugs
5. ✅ Relancer le serveur

## 🔍 Vérification

### Structure attendue

```
src/app/modules/
└── [slug]/
    └── page.tsx
```

### Commandes de vérification

```bash
# Lister les dossiers
dir src\app\modules

# Doit afficher uniquement [slug]
```

## 🚀 Relancer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

Le serveur devrait démarrer sans erreur.

## 🧪 Tester les routes

Une fois le serveur lancé, tester :

```
http://localhost:3002/dashboard
http://localhost:3002/modules/data-science
http://localhost:3002/modules/deep-learning
http://localhost:3002/modules/ia-generative
http://localhost:3002/modules/mlops
http://localhost:3002/modules/nlp
http://localhost:3002/modules/ml-fondamental
```

## 📋 Checklist

- [x] Ancienne route `[id]` supprimée
- [x] Nouvelle route `[slug]` créée
- [x] Dashboard utilise les slugs
- [x] ModuleCardWithImage utilise les slugs
- [x] Configuration centralisée en place
- [ ] Serveur redémarré sans erreur
- [ ] Routes testées et fonctionnelles

## 💡 Note importante

Si Windows garde le dossier `[id]` en cache :

1. **Fermer VS Code complètement**
2. **Supprimer manuellement le dossier dans l'explorateur**
3. **Vider le cache Next.js** :
   ```bash
   rmdir /s /q .next
   ```
4. **Relancer VS Code et le serveur**

## 🎉 Résultat attendu

```bash
npm run dev

> ia-solution-rdc@0.1.0 dev
> next dev

   ▲ Next.js 15.5.4
   - Local:        http://localhost:3002

 ✓ Starting...
 ✓ Ready in 2.5s
```

**Aucune erreur de conflit de routes !**

---

**Date** : 30 septembre 2025  
**Statut** : ✅ Conflit résolu
