import { useEffect } from 'react'
import Header from './components/Header.tsx'
import Hero from './Pages/Hero.tsx'
import Configurator from './Pages/Configurator.tsx'
import Services from './Pages/Services.tsx'
import Boutique from './Pages/Boutique.tsx'
import Valeurs from './Pages/Valeurs.tsx'
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

      {/* Section Configurator - Configuration */}
      <Configurator />

      {/* Section Services - Nos services */}
      <Services />

      {/* Section Boutique - Notre boutique */}
      <Boutique />

      {/* Section Valeurs - Nos valeurs */}
      <Valeurs />

      {/* Section Contact - Nous contacter */}
      <Contact />

      {/* Modale Mon Compte - Authentification */}
      <Compte />
    </>
  )
}

export default App
