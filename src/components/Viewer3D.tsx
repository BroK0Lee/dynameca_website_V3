// Enregistre le web component <model-viewer> via le paquet npm
import '@google/model-viewer'
import { useEffect, useRef } from 'react'

interface PropsViewer3D {
  /** Chemin vers le fichier GLB (relatif à /public) */
  src: string
  /** Texte alternatif pour l'accessibilité */
  alt?: string
  /** Classe CSS supplémentaire */
  className?: string
}

/**
 * Composant Viewer3D — crée <model-viewer> via les APIs DOM directement.
 * On évite le rendu JSX du custom element pour contourner le traitement
 * de React 19 qui bloque la transmission de certains attributs natifs.
 */
function Viewer3D({ src, alt = 'Modèle 3D interactif', className = '' }: PropsViewer3D) {
  const refConteneur = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const conteneur = refConteneur.current
    if (!conteneur) return

    // Créer le web component via DOM pour garantir setAttribute
    const viewer = document.createElement('model-viewer') as HTMLElement
    viewer.setAttribute('alt', alt)
    viewer.setAttribute('camera-controls', '')
    viewer.setAttribute('auto-rotate', '')
    viewer.setAttribute('auto-rotate-delay', '1500')
    viewer.setAttribute('rotation-per-second', '20deg')
    viewer.setAttribute('shadow-intensity', '1')
    viewer.setAttribute('shadow-softness', '0.8')
    viewer.setAttribute('exposure', '0.9')
    viewer.style.cssText = 'width:100%;height:100%;display:block;background-color:transparent;'

    // Connecter au DOM EN PREMIER — model-viewer initialise son
    // IntersectionObserver à la connexion. Si src est posé avant,
    // l'observer ne se met pas en place et le GLB n'est jamais chargé.
    conteneur.appendChild(viewer)

    // Définir src après connexion (microtask) pour que l'observer
    // soit prêt à détecter la visibilité et déclencher le chargement
    Promise.resolve().then(() => {
      viewer.setAttribute('src', src)
    })

    return () => {
      viewer.remove()
    }
  }, [src, alt])

  return (
    <div className={`viewer3d-conteneur ${className}`}>
      <div ref={refConteneur} style={{ width: '100%', height: '100%' }} />
      <div className="viewer3d-indication">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
        Cliquez et faites glisser pour pivoter
      </div>
    </div>
  )
}

export default Viewer3D
