import { useEffect, useRef } from 'react'
import { initialiserAnimationHeader } from '../Animations/animation_header.ts'
import { scrollVerSection } from '../Animations/animation_app.ts'

/**
 * Composant Header - Navigation principale fixe
 * Affiche le nom de l'entreprise et les liens de navigation
 */
function Header() {
  const headerRef = useRef<HTMLElement>(null)


  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (headerRef.current) {
      initialiserAnimationHeader(headerRef.current)
    }
  }, [])

  /**
   * Gère le clic sur un lien de navigation
   * Scroll fluide vers la section ciblée
   */
  const gererClicNavigation = (sectionId: string) => {
    scrollVerSection(sectionId)
  }

  return (
    <header ref={headerRef} id="header" className="header-principal">
      {/* Logo / Nom de l'entreprise */}
      <div className="header-logo">
        <button
          onClick={() => gererClicNavigation('hero')}
          className="logo-bouton"
          aria-label="Retour à l'accueil"
        >
          DYNAMECA
        </button>
      </div>

      {/* Navigation */}
      <nav className="header-navigation">
        <button
          onClick={() => gererClicNavigation('hero')}
          className="nav-lien"
        >
          Accueil
        </button>
        <button
          onClick={() => gererClicNavigation('deposer-projet')}
          className="nav-lien"
        >
          Déposer un projet
        </button>
        <button
          onClick={() => gererClicNavigation('comment-ca-marche')}
          className="nav-lien"
        >
          Comment ça marche
        </button>
        <button
          onClick={() => gererClicNavigation('offres-tarifs')}
          className="nav-lien"
        >
          Offres et tarifs
        </button>
        <button
          onClick={() => gererClicNavigation('exemples')}
          className="nav-lien"
        >
          Exemples
        </button>
        <button
          onClick={() => gererClicNavigation('contact')}
          className="nav-lien"
        >
          Contact
        </button>
      </nav>
    </header>
  )
}

export default Header
