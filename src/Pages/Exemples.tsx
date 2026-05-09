import { useEffect, useRef } from 'react'
import { initialiserAnimationExemples } from '../Animations/animation_exemples.ts'

/**
 * Composant Exemples - Section des exemples de réalisations
 */
function Exemples() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationExemples(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="exemples"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Exemples Section</h1>
    </section>
  )
}

export default Exemples
