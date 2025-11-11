import gsap from 'gsap'

/**
 * Initialise l'animation d'ouverture de la modale Mon Compte
 * - Fade in de l'overlay avec blur
 * - Scale + fade in de la boîte de dialogue
 * 
 * @param overlay - L'élément overlay (fond flouté)
 * @param modale - L'élément contenu de la modale
 */
export function initialiserAnimationCompte(overlay: HTMLElement, modale: HTMLElement) {
  // Timeline pour synchroniser les animations
  const timeline = gsap.timeline()

  // État initial de l'overlay
  gsap.set(overlay, {
    opacity: 0,
  })

  // État initial de la modale
  gsap.set(modale, {
    opacity: 0,
    scale: 0.9,
    y: -20,
  })

  // Animation d'ouverture
  timeline
    .to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(
      modale,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.2)', // Effet élastique subtil
      },
      '-=0.1' // Commence légèrement avant la fin de l'overlay
    )
}

/**
 * Animation de fermeture de la modale Mon Compte
 * Inverse des animations d'ouverture
 * 
 * @param overlay - L'élément overlay
 * @param modale - L'élément contenu de la modale
 * @param callback - Fonction appelée après la fin de l'animation (fermeture du store)
 */
export function fermerAnimationCompte(
  overlay: HTMLElement,
  modale: HTMLElement,
  callback: () => void
) {
  const timeline = gsap.timeline({
    onComplete: callback, // Appeler le callback après l'animation
  })

  timeline
    .to(modale, {
      opacity: 0,
      scale: 0.9,
      y: -20,
      duration: 0.25,
      ease: 'power2.in',
    })
    .to(
      overlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      '-=0.1' // Chevauche légèrement avec l'animation de la modale
    )
}
