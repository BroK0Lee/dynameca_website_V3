# Instructions pour les assistants IA

## Langue

**IMPORTANT:** Toutes les interactions et le code doivent être en français.

- **Code:** Tous les commentaires, noms de variables, fonctions et classes doivent être en français
- **Conversations:** Toutes les réponses et discussions avec les assistants IA (GitHub Copilot, Claude, etc.) doivent être en français
- **Documentation:** Toute documentation (README, commentaires JSDoc, etc.) doit être rédigée en français

### Exemples de code conforme

```javascript
// ✅ BON - Commentaires et noms en français
/**
 * Anime les sections au défilement avec GSAP ScrollTrigger
 * @param {HTMLElement} section - La section à animer
 */
function animerSection(section) {
  const titre = section.querySelector('h1')

  // Configuration de l'animation d'apparition
  gsap.to(section, {
    opacite: 1,
    duree: 1
    // ... reste de l'animation
  })
}

// ❌ MAUVAIS - Commentaires et noms en anglais
/**
 * Animates sections on scroll with GSAP ScrollTrigger
 * @param {HTMLElement} section - The section to animate
 */
function animateSection(section) {
  const heading = section.querySelector('h1')
  // ...
}
```

### Conventions de nommage en français

- Variables: `utilisateur`, `listeProduits`, `compteurClics`
- Fonctions: `afficherMenu()`, `calculerTotal()`, `validerFormulaire()`
- Classes: `GestionnaireUtilisateurs`, `ServicePaiement`
- Constantes: `COULEUR_PRIMAIRE`, `DUREE_ANIMATION`

## Architecture du projet

Site web one-page avec 6 sections fullscreen animées par GSAP ScrollTrigger.

**Stack:**

- Vite 7.2.2 (serveur de développement)
- JavaScript vanilla (modules ES)
- GSAP 3.13.0 avec plugin ScrollTrigger
- CSS pur

**Commandes:**

```bash
npm run dev      # Démarre le serveur de dev (http://localhost:5173)
npm run build    # Build de production
npm run preview  # Prévisualise le build
```
