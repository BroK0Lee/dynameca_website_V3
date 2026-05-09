import { useEffect } from 'react'
import Header from './components/Header.tsx'
import Hero from './Pages/Hero.tsx'
import DeposerUnProjet from './Pages/DeposerUnProjet.tsx'
import CommentCaMarche from './Pages/CommentCaMarche.tsx'
import OffresEtTarifs from './Pages/OffresEtTarifs.tsx'
import Exemples from './Pages/Exemples.tsx'
import Contact from './Pages/Contact.tsx'
import Compte from './Pages/Compte.tsx'
import { initialiserAnimationsApp } from './Animations/animation_app.ts'

/**
 * Composant principal de l'application
 * Contient le Header fixe et toutes les sections empilées verticalement pour le scroll GSAP
 */
function App() {
  useEffect(() => {
    // Initialiser les animations globales après le montage du composant
    initialiserAnimationsApp()
  }, [])

  return (
    <>
      {/* Header fixe - Navigation principale */}
      <Header />

      {/* Section Hero - Page d'accueil avec effet 3D */}
      <Hero />

      {/* Section DeposerUnProjet - Déposer un projet */}
      <DeposerUnProjet />

      {/* Section CommentCaMarche - Comment ça marche */}
      <CommentCaMarche />

      {/* Section OffresEtTarifs - Offres et tarifs */}
      <OffresEtTarifs />

      {/* Section Exemples - Exemples de réalisations */}
      <Exemples />

      {/* Section Contact - Nous contacter */}
      <Contact />

      {/* Modale Mon Compte - Authentification */}
      <Compte />
    </>
  )
}

export default App
