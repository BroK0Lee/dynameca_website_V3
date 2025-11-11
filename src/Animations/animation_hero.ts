import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Hero
 * - Animation du titre avec rotation 3D
 * - Animation du texte en cascade
 * - Synchronisation avec le store Zustand
 * 
 * @param section - L'élément HTML de la section Hero
 */
export function initialiserAnimationHero(section: HTMLElement) {
  const heroTitre = document.getElementById('hero_title')
  const heroTexte = document.getElementById('hero_text')
  const heroDecouverte = document.getElementById('hero_decouverte')

  // Rendre la section visible immédiatement (pas d'attente de scroll pour Hero)
  gsap.set(section, {
    opacity: 1,
  })

  // Animation du titre Hero avec effet 3D - se lance automatiquement au chargement
  if (heroTitre) {
    // État initial du titre
    gsap.set(heroTitre, {
      opacity: 0,
      scale: 0.3,
      rotationX: 180,
      rotationZ: -15,
      y: -100,
      transformOrigin: '50% 50%',
    })

    // Animation d'entrée du titre
    gsap.to(heroTitre, {
      duration: 2,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      rotationZ: 0,
      y: 0,
      ease: 'power3.out',
      delay: 0.5, // Petit délai pour laisser la page se charger
    })
  }

  // Animation en cascade du texte Hero
  if (heroTexte) {
    // État initial du texte
    gsap.set(heroTexte, {
      opacity: 0,
      y: 30,
      scale: 0.5,
      rotationY: 90,
      transformOrigin: 'center center',
    })

    // Animation d'entrée du texte (après le titre)
    gsap.to(heroTexte, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      ease: 'power3.out',
      delay: 2, // Se lance après l'animation du titre (0.5 + 1.5)
      onComplete: () => {
        // Nettoyage pour éviter tout offset résiduel
        gsap.set(heroTexte, { clearProps: 'transform' })
      },
    })
  }

  // Animation de l'indicateur de découverte avec flèche rebondissante
  if (heroDecouverte) {
    // Apparition de l'indicateur après les autres animations (3.5s)
    gsap.to(heroDecouverte, {
      opacity: 1,
      duration: 1,
      delay: 3.5, // Synchronisé avec le header
      ease: 'power2.out',
    })

    // Animation bounce infinie de la flèche
    gsap.to(heroDecouverte, {
      y: 20,
      duration: 1.4,
      ease: 'bounce.out',
      repeat: -1,
      yoyo: true,
      delay: 3.5, // Démarre en même temps que l'apparition
    })
  }

  // Définir la section active immédiatement
  useStore.getState().definirSectionActive('hero')

  // ScrollTrigger pour maintenir la section active si on scrolle
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('hero'),
    onEnterBack: () => useStore.getState().definirSectionActive('hero'),
  })
}
