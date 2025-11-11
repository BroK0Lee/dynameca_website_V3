import { useEffect, useRef, useState } from 'react'
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react'
import { useStore } from '../store/useStore.ts'
import { initialiserAnimationCompte, fermerAnimationCompte } from '../Animations/animation_compte.ts'

/**
 * Composant Compte - Modale d'authentification
 * Permet à l'utilisateur de se connecter ou créer un compte
 */
function Compte() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modaleRef = useRef<HTMLDivElement>(null)
  const modaleOuverte = useStore((state) => state.modaleCompteOuverte)
  const fermerModale = useStore((state) => state.fermerModaleCompte)

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)

  useEffect(() => {
    if (modaleOuverte && overlayRef.current && modaleRef.current) {
      // Ouvrir la modale avec animation GSAP
      initialiserAnimationCompte(overlayRef.current, modaleRef.current)
    }
  }, [modaleOuverte])

  useEffect(() => {
    // Gestion de la touche Échap pour fermer la modale
    const gererToucheEchap = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modaleOuverte) {
        gererFermeture()
      }
    }

    window.addEventListener('keydown', gererToucheEchap)
    return () => window.removeEventListener('keydown', gererToucheEchap)
  }, [modaleOuverte])

  /**
   * Gère la fermeture de la modale avec animation
   */
  const gererFermeture = () => {
    if (overlayRef.current && modaleRef.current) {
      fermerAnimationCompte(overlayRef.current, modaleRef.current, fermerModale)
    }
  }

  /**
   * Gère le clic sur l'overlay (fond flouté)
   */
  const gererClicOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    // Fermer uniquement si on clique sur l'overlay, pas sur la modale
    if (event.target === overlayRef.current) {
      gererFermeture()
    }
  }

  /**
   * Gestion de la soumission du formulaire (pour le moment juste console.log)
   */
  const gererConnexion = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Connexion:', { email, motDePasse })
  }

  /**
   * Gestion du clic sur "Créer un compte"
   */
  const gererCreationCompte = () => {
    console.log('Créer un compte')
  }

  /**
   * Gestion du clic sur "Mot de passe oublié"
   */
  const gererMotDePasseOublie = () => {
    console.log('Récupération mot de passe')
  }

  // Ne rien afficher si la modale n'est pas ouverte
  if (!modaleOuverte) return null

  return (
    <div
      ref={overlayRef}
      className="modale-overlay"
      onClick={gererClicOverlay}
    >
      <div ref={modaleRef} className="modale-contenu">
        {/* Bouton fermer */}
        <button
          onClick={gererFermeture}
          className="modale-bouton-fermer"
          aria-label="Fermer la modale"
        >
          <X size={24} />
        </button>

        {/* Titre */}
        <h2 className="modale-titre">Connexion</h2>

        {/* Formulaire */}
        <form onSubmit={gererConnexion} className="modale-formulaire">
          {/* Input Email */}
          <div className="input-groupe">
            <Mail className="input-icone" size={20} />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-champ"
              required
            />
          </div>

          {/* Input Mot de passe */}
          <div className="input-groupe">
            <Lock className="input-icone" size={20} />
            <input
              type={afficherMotDePasse ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="input-champ"
              required
            />
            <button
              type="button"
              onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
              className="input-toggle-password"
              aria-label={afficherMotDePasse ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {afficherMotDePasse ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Lien mot de passe oublié */}
          <button
            type="button"
            onClick={gererMotDePasseOublie}
            className="lien-utilitaire"
          >
            Mot de passe oublié ?
          </button>

          {/* Bouton Se connecter (désactivé pour le moment) */}
          <button
            type="submit"
            className="bouton-primaire"
            disabled
          >
            Se connecter
          </button>
        </form>

        {/* Section Créer un compte */}
        <div className="modale-separation">
          <span>Pas encore de compte ?</span>
        </div>

        <button
          onClick={gererCreationCompte}
          className="bouton-secondaire"
        >
          Créer un compte
        </button>
      </div>
    </div>
  )
}

export default Compte
