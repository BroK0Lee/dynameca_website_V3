import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Initialise les animations GSAP pour le Header
 * - Apparition en fondu après l'animation de la Hero section
 * - Animation déclenchée après le texte Hero (3.5s)
 * - Pas d'effet 3D, juste un fondu progressif
 * - Gère le blocage du scroll pendant l'animation d'introduction
 * 
 * @param header - L'élément HTML du header
 */
export function initialiserAnimationHeader(header: HTMLElement) {
  // 🔒 Bloquer le scroll au démarrage pour forcer l'utilisateur à voir l'animation
  document.body.classList.add('scroll-bloque')

  // État initial du header - complètement transparent
  gsap.set(header, {
    opacity: 0,
    y: -20, // Légèrement au-dessus pour effet subtil
  })

  // Animation d'apparition du header après la Hero section
  // Se déclenche après l'animation du texte Hero (qui se termine à 3.5s)
  gsap.to(header, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power2.out',
    delay: 3.5, // Après la fin de l'animation du texte Hero
    onComplete: () => {
      // 🔓 Débloquer le scroll quand l'animation est terminée (à 5s)
      // Pas de saut visuel grâce à scrollbar-gutter: stable
      document.body.classList.remove('scroll-bloque')
    }
  })

  // Animation au scroll - le header reste visible sans background
  // Pas de changement de style au scroll selon les specs
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    onUpdate: (self) => {
      // Le header reste avec background transparent
      // Pas de modification visuelle au scroll
      if (self.progress > 0) {
        // On pourrait ajouter des effets ici si nécessaire plus tard
      }
    },
  })
}
