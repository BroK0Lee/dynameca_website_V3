import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Contact
 * Cascade similaire à la Hero section
 * @param section - L'élément HTML de la section Contact
 */
export function initialiserAnimationContact(section: HTMLElement) {
  const contactTitre = document.getElementById('contact_titre')
  const contactTexte = document.getElementById('contact_texte')
  const contactDescription = document.getElementById('contact_description')
  const contactInfos = document.getElementById('contact_infos')
  const contactBouton = document.getElementById('contact_bouton')

  // Configuration commune du ScrollTrigger pour cette section
  const declencheur = {
    trigger: section,
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  }

  // Animation de la section (fondu + légère montée)
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
  if (contactTitre) {
    gsap.fromTo(
      contactTitre,
      { opacity: 0, y: -40, rotationX: 45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: declencheur,
      }
    )
  }

  // Animation du sous-titre (légèrement décalée)
  if (contactTexte) {
    gsap.fromTo(
      contactTexte,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: declencheur,
        onComplete: () => gsap.set(contactTexte, { clearProps: 'transform' }),
      }
    )
  }

  // Animation de la description
  if (contactDescription) {
    gsap.fromTo(
      contactDescription,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: declencheur,
        onComplete: () => gsap.set(contactDescription, { clearProps: 'transform' }),
      }
    )
  }

  // Animation des infos de contact
  if (contactInfos) {
    gsap.fromTo(
      contactInfos,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: declencheur,
        onComplete: () => gsap.set(contactInfos, { clearProps: 'transform' }),
      }
    )
  }

  // Animation du bouton CTA
  if (contactBouton) {
    gsap.fromTo(
      contactBouton,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out',
        scrollTrigger: declencheur,
        onComplete: () => gsap.set(contactBouton, { clearProps: 'transform' }),
      }
    )
  }

  // Synchronisation avec le store Zustand - définir la section active
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('contact'),
    onEnterBack: () => useStore.getState().definirSectionActive('contact'),
  })
}