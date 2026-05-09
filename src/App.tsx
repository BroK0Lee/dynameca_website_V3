import { useEffect } from 'react'
import Header from './components/Header.tsx'
import Hero from './Pages/Hero.tsx'
import DeposerUnProjet from './Pages/DeposerUnProjet.tsx'
import CommentCaMarche from './Pages/CommentCaMarche.tsx'
import OffresEtTarifs from './Pages/OffresEtTarifs.tsx'
import Realisations from './Pages/Realisations.tsx'
import Contact from './Pages/Contact.tsx'
import Compte from './Pages/Compte.tsx'
import { initialiserAnimationsApp } from './Animations/animation_app.ts'
import { initialiserAnimationDeposerUnProjet } from './Animations/animation_deposer_projet.ts'
import { initialiserAnimationCommentCaMarche } from './Animations/animation_comment_ca_marche.ts'
import { initialiserAnimationOffresEtTarifs } from './Animations/animation_offres_tarifs.ts'
import { initialiserAnimationRealisations } from './Animations/animation_realisations.ts'
import { initialiserAnimationContact } from './Animations/animation_contact.ts'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composant principal de l'application.
 * Toutes les animations de scroll sont initialisées ici dans un seul useEffect
 * pour garantir que les positions ScrollTrigger sont calculées en séquence,
 * après que le pin de "Comment ça marche" a inséré son spacer dans le DOM.
 */
function App() {
  useEffect(() => {
    // 1. Initialisation globale GSAP (registerPlugin, Lucide, etc.)
    initialiserAnimationsApp()

    // 2. Récupération des sections par ID (toujours présentes au montage)
    const elDeposer = document.getElementById('deposer-projet') as HTMLElement | null
    const elCommentCaMarche = document.getElementById('comment-ca-marche') as HTMLElement | null
    const elOffres = document.getElementById('offres-tarifs') as HTMLElement | null
    const elRealisations = document.getElementById('realisations') as HTMLElement | null
    const elContact = document.getElementById('contact') as HTMLElement | null

    // 3. Enregistrement des animations dans l'ordre du DOM
    // L'ordre est crucial : le pin de CommentCaMarche insère un spacer
    // que les triggers suivants (Offres, Realisations, Contact) doivent voir
    if (elDeposer) initialiserAnimationDeposerUnProjet(elDeposer)
    if (elCommentCaMarche) initialiserAnimationCommentCaMarche(elCommentCaMarche)
    if (elOffres) initialiserAnimationOffresEtTarifs(elOffres)
    if (elRealisations) initialiserAnimationRealisations(elRealisations)
    if (elContact) initialiserAnimationContact(elContact)

    // 4. Refresh global APRÈS que tous les triggers sont enregistrés
    // Le délai garantit que React a fini de peindre le DOM complet
    const rafId = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 150)

    return () => clearTimeout(rafId)
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

      {/* Section Realisations - Réalisations */}
      <Realisations />

      {/* Section Contact - Nous contacter */}
      <Contact />

      {/* Modale Mon Compte - Authentification */}
      <Compte />
    </>
  )
}

export default App
