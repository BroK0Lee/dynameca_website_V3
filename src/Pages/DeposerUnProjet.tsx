import { useEffect, useRef } from 'react'
import { initialiserAnimationDeposerUnProjet } from '../Animations/animation_deposer_projet.ts'

/**
 * Composant DeposerUnProjet - Section de dépôt de projet
 */
function DeposerUnProjet() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationDeposerUnProjet(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="deposer-projet"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Déposer un projet Section</h1>
    </section>
  )
}

export default DeposerUnProjet
