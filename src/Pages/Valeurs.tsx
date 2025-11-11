import { useEffect, useRef } from 'react'
import { initialiserAnimationValeurs } from '../Animations/animation_valeurs.ts'

/**
 * Composant Valeurs - Section des valeurs
 */
function Valeurs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationValeurs(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="valeurs"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Nos Valeurs Section</h1>
    </section>
  )
}

export default Valeurs
