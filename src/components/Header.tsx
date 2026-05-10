import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { initialiserAnimationHeader } from '../Animations/animation_header.ts'
import { scrollVerSection } from '../Animations/animation_app.ts'
import { useStore } from '../store/useStore.ts'

/**
 * Composant Header - Navigation principale fixe
 * Affiche le nom de l'entreprise et les liens de navigation
 * Inclut un menu hamburger pour mobile
 */
function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const sectionActive = useStore((etat) => etat.sectionActive)

  // Retourne 'nav-lien nav-lien--actif' si la section est active, sinon 'nav-lien'
  const classeNavLien = (sectionId: string) =>
    sectionActive === sectionId ? 'nav-lien nav-lien--actif' : 'nav-lien'

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (headerRef.current) {
      initialiserAnimationHeader(headerRef.current)
    }
  }, [])

  /**
   * Gère le clic sur un lien de navigation
   * Scroll fluide vers la section ciblée et ferme le menu mobile
   */
  const gererClicNavigation = (sectionId: string) => {
    scrollVerSection(sectionId)
    setMenuOuvert(false)
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

      {/* Navigation desktop */}
      <nav className="header-navigation">
        <button onClick={() => gererClicNavigation('hero')} className={classeNavLien('hero')}>Accueil</button>
        <button onClick={() => gererClicNavigation('deposer-projet')} className={classeNavLien('deposer-projet')}>Déposer un projet</button>
        <button onClick={() => gererClicNavigation('comment-ca-marche')} className={classeNavLien('comment-ca-marche')}>Comment ça marche</button>
        <button onClick={() => gererClicNavigation('offres-tarifs')} className={classeNavLien('offres-tarifs')}>Offres et tarifs</button>
        <button onClick={() => gererClicNavigation('realisations')} className={classeNavLien('realisations')}>Réalisations</button>
        <button onClick={() => gererClicNavigation('contact')} className={classeNavLien('contact')}>Contact</button>
      </nav>

      {/* Bouton hamburger - visible uniquement sur mobile */}
      <button
        className="hamburger-bouton"
        onClick={() => setMenuOuvert(!menuOuvert)}
        aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuOuvert}
      >
        {menuOuvert ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile overlay */}
      {menuOuvert && (
        <nav className="nav-mobile">
          <button onClick={() => gererClicNavigation('hero')} className="nav-mobile-lien">Accueil</button>
          <button onClick={() => gererClicNavigation('deposer-projet')} className="nav-mobile-lien">Déposer un projet</button>
          <button onClick={() => gererClicNavigation('comment-ca-marche')} className="nav-mobile-lien">Comment ça marche</button>
          <button onClick={() => gererClicNavigation('offres-tarifs')} className="nav-mobile-lien">Offres et tarifs</button>
          <button onClick={() => gererClicNavigation('realisations')} className="nav-mobile-lien">Réalisations</button>
          <button onClick={() => gererClicNavigation('contact')} className="nav-mobile-lien">Contact</button>
        </nav>
      )}
    </header>
  )
}

export default Header
