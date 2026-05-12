import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Réalisations.
 * - En-tête : fade-in + slide-up
 * - Chaque projet : visuel et texte arrivent en opposition (gauche/droite)
 *   selon la classe real-projet--inverse
 * @param section - L'élément HTML de la section Realisations
 */
export function initialiserAnimationRealisations(section: HTMLElement) {
  // Synchronisation avec le store
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('realisations'),
    onEnterBack: () => useStore.getState().definirSectionActive('realisations'),
  })

  // Apparition de la section
  gsap.fromTo(section, { opacity: 0 }, {
    opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
  })

  // En-tête
  const enTete = section.querySelector<HTMLElement>('.real-en-tete')
  if (enTete) {
    gsap.fromTo(enTete, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: enTete, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }

  // Chaque bloc de projet : visuel et texte arrivent en opposition
  const projets = section.querySelectorAll<HTMLElement>('.real-projet')
  projets.forEach((projet) => {
    const inverse = projet.classList.contains('real-projet--inverse')
    const visuel = projet.querySelector<HTMLElement>('.real-projet-visuel')
    const contenu = projet.querySelector<HTMLElement>('.real-projet-contenu')

    // Le visuel slide depuis le côté où il se trouve
    if (visuel) {
      gsap.fromTo(visuel,
        { x: inverse ? 60 : -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: projet, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
    }

    // Le contenu texte slide depuis le côté opposé
    if (contenu) {
      gsap.fromTo(contenu,
        { x: inverse ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: projet, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
    }
  })
}

