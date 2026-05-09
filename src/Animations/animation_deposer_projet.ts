import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Déposer un projet
 * - Apparition de l'en-tête au scroll
 * - Entrée en cascade des 3 cartes
 * @param section - L'élément HTML de la section DeposerUnProjet
 */
export function initialiserAnimationDeposerUnProjet(section: HTMLElement) {
  const declencheur = {
    trigger: section,
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  }

  // Animation de la section (fondu)
  gsap.fromTo(
    section,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
    }
  )

  // Animation du titre
  const titre = document.getElementById('deposer_titre')
  if (titre) {
    gsap.fromTo(
      titre,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: declencheur }
    )
  }

  // Animation du sous-titre
  const sousTitre = document.getElementById('deposer_sous_titre')
  if (sousTitre) {
    gsap.fromTo(
      sousTitre,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out', scrollTrigger: declencheur }
    )
  }

  // Animation des cartes en cascade (chacune décalée de 0.15s)
  const cartes = section.querySelectorAll('.projet-carte')
  cartes.forEach((carte, index) => {
    gsap.fromTo(
      carte,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.3 + index * 0.15,
        ease: 'power3.out',
        scrollTrigger: declencheur,
        onComplete: () => gsap.set(carte, { clearProps: 'transform' }),
      }
    )
  })

  // Synchronisation avec le store Zustand
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('deposer-projet'),
    onEnterBack: () => useStore.getState().definirSectionActive('deposer-projet'),
  })
}
