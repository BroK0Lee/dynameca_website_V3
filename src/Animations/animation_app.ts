import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { createIcons, icons } from 'lucide'

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * Initialise les animations globales de l'application
 * - Configuration de GSAP et ScrollTrigger
 * - Initialisation des icônes Lucide
 * - Paramètres globaux d'animation
 */
export function initialiserAnimationsApp() {
  // Initialiser Lucide pour remplacer automatiquement les balises data-lucide
  try {
    createIcons({ icons })
  } catch (e) {
    // Sécurise l'init même si aucune icône n'est présente
    console.warn('Lucide non initialisé:', e)
  }

  // Configuration globale de ScrollTrigger (optionnel)
  ScrollTrigger.config({
    // Ajuster la sensibilité si nécessaire
    // autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  })

  // Rafraîchir ScrollTrigger après le chargement complet
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })
}

/**
 * Fonction utilitaire pour scroller vers une section
 * @param cible - ID de la section cible (ex: 'hero', 'services')
 * @param instantane - Si true, jump immédiat sans durée (utile pour sauter par-dessus une section épinglée)
 */
export function scrollVerSection(cible: string, instantane = false) {
  gsap.to(window, {
    duration: instantane ? 0 : 0.2,
    scrollTo: { y: `#${cible}`, offsetY: 0 },
    ease: 'power2.inOut',
  })
}
