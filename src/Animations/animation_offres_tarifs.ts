import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/useStore.ts'

/**
 * Initialise les animations GSAP pour la section Offres et tarifs.
 * - Colonne gauche (titre + paragraphes) : slide depuis la gauche
 * - Colonne droite (mise en évidence + actions) : slide depuis la droite
 * - Le chiffre "80" s'anime de 0 à 80 lors de l'entrée dans la section
 * @param section - L'élément HTML de la section OffresEtTarifs
 */
export function initialiserAnimationOffresEtTarifs(section: HTMLElement) {
  // Synchronisation avec le store — définit la section active au scroll
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => useStore.getState().definirSectionActive('offres-tarifs'),
    onEnterBack: () => useStore.getState().definirSectionActive('offres-tarifs'),
  })

  const colonneGauche = section.querySelector<HTMLElement>('.ot-colonne-gauche')
  const titre = section.querySelector<HTMLElement>('.ot-titre')
  const paragraphes = section.querySelectorAll<HTMLElement>('.ot-paragraphe')
  const colonneDroite = section.querySelector<HTMLElement>('.ot-colonne-droite')
  const miseEnEvidence = section.querySelector<HTMLElement>('.ot-mise-en-evidence')
  const chiffre = section.querySelector<HTMLElement>('.ot-mev-chiffre')
  const actions = section.querySelector<HTMLElement>('.ot-actions')

  const declencheur = { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' as const }

  // Apparition de la section
  gsap.fromTo(section, { opacity: 0 }, {
    opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
  })

  // Colonne gauche : slide depuis la gauche
  if (colonneGauche) {
    gsap.fromTo(colonneGauche, { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: declencheur,
    })
  }

  // Titre en léger décalage par rapport à la colonne
  if (titre) {
    gsap.fromTo(titre, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none reverse' },
    })
  }

  // Paragraphes en cascade
  if (paragraphes.length) {
    gsap.fromTo(paragraphes, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: section, start: 'top 68%', toggleActions: 'play none none reverse' },
    })
  }

  // Colonne droite : slide depuis la droite
  if (colonneDroite) {
    gsap.fromTo(colonneDroite, { x: 50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: declencheur,
    })
  }

  // Mise en évidence : apparition élastique + compteur animé
  if (miseEnEvidence) {
    gsap.fromTo(miseEnEvidence, { scale: 0.82, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
    })

    if (chiffre) {
      const compteur = { valeur: 0 }
      gsap.to(compteur, {
        valeur: 80,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        onUpdate: () => { chiffre.textContent = String(Math.round(compteur.valeur)) },
      })
    }
  }

  // Actions : apparition en dernier
  if (actions) {
    gsap.fromTo(actions, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none reverse' },
    })
  }
}

