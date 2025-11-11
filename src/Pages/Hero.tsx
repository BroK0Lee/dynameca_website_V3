import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { initialiserAnimationHero } from '../Animations/animation_hero.ts'

/**
 * Composant Hero - Section d'accueil avec animation 3D
 * Affiche le titre principal et le sous-titre avec des effets de rotation
 */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationHero(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-plein-ecran slide"
    >
      <h1 id="hero_title" className="titre-section">Hero Section</h1>
      <p id="hero_text" className="sous-titre-section">Avec effet 3D</p>
      
      {/* Indicateur de découverte avec flèche */}
      <div id="hero_decouverte" className="hero-decouverte">
        <p className="decouverte-texte">Poursuivez la découverte</p>
        <ArrowDown className="decouverte-fleche" size={32} strokeWidth={2} />
      </div>
    </section>
  )
}

export default Hero
