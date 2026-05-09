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
      <div className="hero-contenu">
        <h1 id="hero_title" className="titre-section">DYNAMECA</h1>
        <p id="hero_text" className="sous-titre-section">Concevoir, structurer et concrétiser vos projets</p>
        <p id="hero_description" className="hero-description">De l'idée initiale à la réalisation finale, DYNAMECA vous accompagne à chaque étape de votre projet : cadrage technique, conception 3D, plans, fichiers de fabrication, dossier fournisseur et accompagnement dans la réalisation d'un prototype ou d'une mise en production.</p>
      </div>
      
      {/* Indicateur de découverte avec flèche */}
      <div id="hero_decouverte" className="hero-decouverte">
        <p className="decouverte-texte">Poursuivez la découverte</p>
        <ArrowDown className="decouverte-fleche" size={32} strokeWidth={2} />
      </div>
    </section>
  )
}

export default Hero
