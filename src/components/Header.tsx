import { useEffect, useRef } from 'react'
import { initialiserAnimationHeader } from '../Animations/animation_header.ts'
import { scrollVerSection } from '../Animations/animation_app.ts'
import { useStore } from '../store/useStore.ts'

/**
 * Composant Header - Navigation principale fixe
 * Affiche le nom de l'entreprise et les liens de navigation
 */
function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const ouvrirModaleCompte = useStore((state) => state.ouvrirModaleCompte)

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
          ClicnCut
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
          onClick={() => gererClicNavigation('configurator')}
          className="nav-lien"
        >
          Configurator
        </button>
        <button
          onClick={() => gererClicNavigation('services')}
          className="nav-lien"
        >
          Services
        </button>
        <button
          onClick={() => gererClicNavigation('boutique')}
          className="nav-lien"
        >
          Boutique
        </button>
        <button
          onClick={() => gererClicNavigation('valeurs')}
          className="nav-lien"
        >
          Valeurs
        </button>
        <button
          onClick={() => gererClicNavigation('contact')}
          className="nav-lien"
        >
          Contact
        </button>
        <button
          onClick={ouvrirModaleCompte}
          className="nav-lien nav-lien-compte"
        >
          Mon Compte
        </button>
      </nav>
    </header>
  )
}

export default Header
