/**
 * Déclaration TypeScript pour le web component <model-viewer> de Google.
 * Évite les erreurs "Property does not exist on type JSX.IntrinsicElements".
 * Documentation complète : https://modelviewer.dev/docs/
 */
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        /** URL du fichier GLB/GLTF à afficher */
        src?: string
        /** URL d'une image de remplacement pendant le chargement */
        poster?: string
        /** Texte alternatif pour l'accessibilité */
        alt?: string
        /** Active la rotation automatique du modèle */
        'auto-rotate'?: boolean
        /** Active les contrôles de caméra (zoom, pan, rotation) */
        'camera-controls'?: boolean
        /** Active le mode AR sur mobile compatible */
        ar?: boolean
        /** Modes AR autorisés */
        'ar-modes'?: string
        /** Environnement d'éclairage (HDR) */
        'environment-image'?: string
        /** Intensité de l'ombre au sol */
        'shadow-intensity'?: string | number
        /** Douceur de l'ombre */
        'shadow-softness'?: string | number
        /** Exposition lumineuse */
        exposure?: string | number
        /** Orbite initiale de la caméra (theta phi radius) */
        'camera-orbit'?: string
        /** Limites de zoom */
        'min-camera-orbit'?: string
        'max-camera-orbit'?: string
        /** Vitesse de rotation automatique */
        'rotation-per-second'?: string
        /** Délai avant démarrage de la rotation automatique */
        'auto-rotate-delay'?: string | number
        /** Fond transparent */
        'skybox-image'?: string
        style?: React.CSSProperties
        className?: string
      },
      HTMLElement
    >
  }
}
