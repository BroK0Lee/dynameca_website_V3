import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Déposer un projet
 * @param section - L'élément HTML de la section DeposerUnProjet
 */
export function initialiserAnimationDeposerUnProjet(section: HTMLElement) {
  // Animation de la section lors du défilement
  gsap.fromTo(
    section,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    }
  )

  // Animer le titre à l'intérieur de la section
  const titre = section.querySelector('h1')
  if (titre) {
    gsap.fromTo(
      titre,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    )
  }

  // Synchronisation avec le store Zustand - définir la section active
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('deposer-projet'),
    onEnterBack: () => useStore.getState().definirSectionActive('deposer-projet'),
  })
}
