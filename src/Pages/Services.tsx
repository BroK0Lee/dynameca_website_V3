import { useEffect, useRef } from 'react'
import { initialiserAnimationServices } from '../Animations/animation_services.ts'

/**
 * Composant Services - Section des services
 */
function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationServices(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Nos Services Section</h1>
    </section>
  )
}

export default Services
