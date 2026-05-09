import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Comment ça marche
 * - En-tête animé à l'entrée
 * - Pin + scroll horizontal des 5 cartes d'étapes (desktop uniquement)
 * - Indicateur de progression mis à jour en temps réel
 * @param section - L'élément HTML de la section CommentCaMarche
 */
export function initialiserAnimationCommentCaMarche(section: HTMLElement) {
  const piste = section.querySelector<HTMLElement>('.ccm-piste')
  const cartesWrapper = section.querySelector<HTMLElement>('.ccm-cartes-wrapper')
  const points = section.querySelectorAll<HTMLElement>('.ccm-prog-point')

  if (!piste || !cartesWrapper) return

  // Synchronisation de la section active dans le store Zustand
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('comment-ca-marche'),
    onEnterBack: () => useStore.getState().definirSectionActive('comment-ca-marche'),
  })

  // Sur mobile : pas de pin horizontal
  if (window.innerWidth <= 768) return

  // Mise à jour de l'indicateur de progression
  // Math.round(progression * 4) : 5 cartes = 4 intervalles, actif quand la carte est au centre
  const mettreAJourProgression = (progression: number) => {
    const indexActif = Math.round(progression * 4)
    points.forEach((point, i) => {
      point.classList.toggle('actif', i === indexActif)
    })
  }
  mettreAJourProgression(0)

  // Position de départ : centre de la carte 01 aligné sur le centre du viewport
  const xDepart = () => {
    const premiereCarte = cartesWrapper.querySelector<HTMLElement>('.ccm-carte')
    if (!premiereCarte) return 0
    return piste.clientWidth / 2 - (premiereCarte.offsetLeft + premiereCarte.offsetWidth / 2)
  }

  // Position d'arrivée : centre de la carte 05 aligné sur le centre du viewport
  const xArrivee = () => {
    const cartes = cartesWrapper.querySelectorAll<HTMLElement>('.ccm-carte')
    const derniereCarte = cartes[cartes.length - 1]
    if (!derniereCarte) return 0
    return piste.clientWidth / 2 - (derniereCarte.offsetLeft + derniereCarte.offsetWidth / 2)
  }

  const distanceTotale = () => Math.abs(xDepart() - xArrivee())

  // UNE SEULE animation avec pin — gère à la fois l'opacité et le scroll horizontal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distanceTotale()}`,
      pin: true,
      pinType: 'transform',
      scrub: 1,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      id: 'CCM-pin',
      onUpdate: (self) => mettreAJourProgression(self.progress),
    },
  })

  tl.fromTo(cartesWrapper, { x: xDepart }, { x: xArrivee, ease: 'none' })
}
