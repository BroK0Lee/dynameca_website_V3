import { useEffect, useRef } from 'react'
import { initialiserAnimationBoutique } from '../Animations/animation_boutique.ts'

/**
 * Composant Boutique - Section de la boutique
 */
function Boutique() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationBoutique(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="boutique"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Boutique Section</h1>
    </section>
  )
}

export default Boutique
