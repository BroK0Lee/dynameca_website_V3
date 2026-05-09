import { useEffect, useRef } from 'react'
import { initialiserAnimationOffresEtTarifs } from '../Animations/animation_offres_tarifs.ts'

/**
 * Composant OffresEtTarifs - Section des offres et tarifs
 */
function OffresEtTarifs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationOffresEtTarifs(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="offres-tarifs"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Offres et tarifs Section</h1>
    </section>
  )
}

export default OffresEtTarifs
