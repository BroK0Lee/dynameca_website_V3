import { useEffect, useRef } from 'react'
import { initialiserAnimationConfigurator } from '../Animations/animation_configurator.ts'

/**
 * Composant Configurator - Section de configuration
 */
function Configurator() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationConfigurator(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="configurator"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Configurator Section</h1>
    </section>
  )
}

export default Configurator
