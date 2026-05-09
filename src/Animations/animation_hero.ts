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
  const heroDescription = document.getElementById('hero_description')
  const heroBoutons = document.getElementById('hero_boutons')
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

  // Animation de la description Hero (après le sous-titre)
  if (heroDescription) {
    // État initial de la description
    gsap.set(heroDescription, {
      opacity: 0,
      y: 30,
    })

    // Animation d'entrée de la description
    gsap.to(heroDescription, {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      delay: 3, // Se lance après le sous-titre (2 + 1)
      onComplete: () => {
        gsap.set(heroDescription, { clearProps: 'transform' })
      },
    })
  }

  // Animation des boutons d'action (après la description)
  if (heroBoutons) {
    // État initial des boutons
    gsap.set(heroBoutons, {
      opacity: 0,
      y: 20,
    })

    // Animation d'entrée des boutons
    gsap.to(heroBoutons, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      delay: 4, // Se lance après la description (3 + 1)
      onComplete: () => {
        gsap.set(heroBoutons, { clearProps: 'transform' })
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
