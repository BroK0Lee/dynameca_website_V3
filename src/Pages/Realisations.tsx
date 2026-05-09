import { useEffect, useRef } from 'react'
import { initialiserAnimationRealisations } from '../Animations/animation_realisations.ts'

/**
 * Composant Realisations - Section des réalisations
 */
function Realisations() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationRealisations(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="realisations"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Réalisations Section</h1>
    </section>
  )
}

export default Realisations
