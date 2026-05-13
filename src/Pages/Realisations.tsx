import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Viewer3D from '../components/Viewer3D'

// Type d'une réalisation
interface Realisation {
  id: number
  numero: string
  titre: string
  contexte: string
  description: string
  livrables: string[]
  tags: string[]
  imageSens: 'gauche' | 'droite'
  fichier3d: boolean
  fichier3dSrc?: string
  orientation3d?: string
  galerie?: string[]
}

// Données mock — à remplacer par les vraies réalisations
const realisationsMock: Realisation[] = [
  {
    id: 1,
    numero: '01',
    titre: 'Bâti mécano-soudé pour banc de test',
    contexte: 'Outillage aéronautique',
    description:
      "Conception et réalisation d'un bâti mécano-soudé pour banc de test secteur aéronautique. Dimension hors-tout : 400x400x450 mm\nBâti Aluminium repris en usinage après soudure.\nAnodisation et thermolaquage.\nLivraison d'un dossier complet pour fabrication et contrôle qualité.",
    livrables: ['Modèle 3D complet', 'Plan 2D avant/après soudure', 'Fichier pour usinage CNC'],
    tags: ['CAO', 'dossier technique', 'usinage CNC'],
    imageSens: 'gauche' as const,
    fichier3d: true,
    orientation3d: '45deg -90deg 0deg',
    galerie: ['/realisation_1_1.png', '/realisation_1_2.png'],
  },
  {
    id: 2,
    numero: '02',
    titre: "Buse Injection chaudière industrielle",
    contexte: 'Maintenance industrielle',
    description:
      "Reprise d’un plan existant annoté, mise à jour des détails techniques et reconstruction 3D de l’ensemble.\nClarification des modifications, fiabilisation de la définition et production d'un dossier exploitable pour fabrication.",
    livrables: ['Indice de plan à jour', 'nomenclature', 'fichiers de fabrication 2D et 3D'],
    tags: ['Rétro-ingénierie', 'pièce de rechange', 'capitalisation technique'],
    imageSens: 'droite' as const,
    fichier3d: true,
    fichier3dSrc: '/9999.13.89.64G.002_-_BUSE_INJECTION.glb',
    orientation3d: '0deg 0deg 0deg',
    galerie: ['/realisation_2_1.png', '/realisation_2_2.png', '/realisation_2_3.png'],
  },
  {
    id: 3,
    numero: '03',
    titre: "Pièce d'adaptation et reprise d'usinage",
    contexte: 'Artisan / petite série — secteur agroalimentaire',
    description:
      "Reconception d'une pièce d'adaptation entre deux équipements de marques différentes. Reprise à partir d'un croquis papier et de cotes relevées sur site. Livraison en STEP pour usinage.",
    livrables: ['Modèle 3D STEP', 'Plan de définition', 'Fichier natif SolidWorks'],
    tags: ['Rétro-ingénierie', 'Usinage', 'STEP / IGES'],
    imageSens: 'gauche' as const,
    fichier3d: false,
  },
]

// Modale image — rendue via portal dans document.body pour échapper
// aux contextes d'empilement créés par les transforms GSAP
function ModalImage({ src, alt, onFermer }: { src: string; alt: string; onFermer: () => void }) {
  // Bloque le scroll en arrière-plan pendant que la modale est ouverte
  // Le scroll est défini sur <html> (pas <body>) donc on cible documentElement
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  return createPortal(
    <div className="modal-image-fond" onClick={onFermer}>
      <div className="modal-image-cadre" onClick={e => e.stopPropagation()}>
        <button className="modal-image-fermer" onClick={onFermer} aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img src={src} alt={alt} className="modal-image-img" />
      </div>
    </div>,
    document.body
  )
}

// Sous-composant — zone visuelle en carousel (viewer 3D → plans/photos)
function VisuelProjet({ projet }: { projet: Realisation }) {
  const [indexActif, setIndexActif] = useState(0)
  const [lightboxOuvert, setLightboxOuvert] = useState(false)

  const aViewer3D = projet.fichier3d
  const galerie = projet.galerie ?? []
  const nbSlides = (aViewer3D ? 1 : 0) + galerie.length

  const allerPrecedent = () => setIndexActif(i => (i - 1 + nbSlides) % nbSlides)
  const allerSuivant = () => setIndexActif(i => (i + 1) % nbSlides)

  // Slide 0 = viewer 3D (si présent), slides suivantes = images
  const estSlideViewer = aViewer3D && indexActif === 0
  const indexImage = aViewer3D ? indexActif - 1 : indexActif
  const imageCourante = galerie[indexImage] ?? null

  // Pas de contenu disponible → placeholder
  if (nbSlides === 0) {
    return (
      <div className="real-projet-visuel">
        <div className="real-projet-placeholder">
          <div className="real-placeholder-icone">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span className="real-placeholder-texte">Visuel du projet</span>
          <span className="real-placeholder-numero">{projet.numero}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="real-projet-visuel">
      <div className="real-carousel">

        {/* Slide active */}
        {estSlideViewer ? (
          <Viewer3D
            src={projet.fichier3dSrc ?? '/Support.glb'}
            alt={`Modèle 3D — ${projet.titre}`}
            orientation={projet.orientation3d}
          />
        ) : (
          <img
            src={imageCourante!}
            alt={`${projet.titre} — plan ${indexImage + 1}`}
            className="real-carousel-image"
            onClick={() => setLightboxOuvert(true)}
          />
        )}

        {/* Flèches de navigation */}
        {nbSlides > 1 && (
          <>
            <button
              className="real-carousel-fleche real-carousel-fleche--gauche"
              onClick={allerPrecedent}
              aria-label="Slide précédente"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              className="real-carousel-fleche real-carousel-fleche--droite"
              onClick={allerSuivant}
              aria-label="Slide suivante"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}

      </div>

      {/* Points indicateurs — en dehors du carousel pour ne pas chevaucher le viewer */}
      {nbSlides > 1 && (
        <div className="real-carousel-points">
          {Array.from({ length: nbSlides }).map((_, i) => (
            <button
              key={i}
              className={`real-carousel-point${i === indexActif ? ' real-carousel-point--actif' : ''}`}
              onClick={() => setIndexActif(i)}
              aria-label={`Aller à la slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Modale image via portal — échappe aux transforms GSAP */}
      {lightboxOuvert && imageCourante && (
        <ModalImage
          src={imageCourante}
          alt={`${projet.titre} — plan ${indexImage + 1}`}
          onFermer={() => setLightboxOuvert(false)}
        />
      )}
    </div>
  )
}

function Realisations() {
  return (
    <section id="realisations" className="section-plein-ecran slide real-section">

      {/* En-tête */}
      <div className="real-en-tete">
        <h1 className="titre-section real-titre">Réalisations</h1>
        <p className="sous-titre-section real-sous-titre">
          Quelques exemples de projets menés avec DYNAMECA
        </p>
      </div>

      {/* Liste des projets */}
      <div className="real-liste">
        {realisationsMock.map((projet) => (
          <article
            key={projet.id}
            className={`real-projet${projet.imageSens === 'droite' ? ' real-projet--inverse' : ''}`}
            data-realisation={projet.id}
          >
            {/* Visuel — viewer 3D et/ou galerie photos selon le projet */}
            <VisuelProjet projet={projet} />

            {/* Contenu texte */}
            <div className="real-projet-contenu">
              <div className="real-projet-numero">{projet.numero}</div>
              <p className="real-projet-contexte">{projet.contexte}</p>
              <h2 className="real-projet-titre">{projet.titre}</h2>
              <p className="real-projet-description">{projet.description}</p>

              <ul className="real-projet-livrables">
                {projet.livrables.map((livrable, i) => (
                  <li key={i} className="real-projet-livrable">
                    <span className="livrable-puce">▸</span>
                    {livrable}
                  </li>
                ))}
              </ul>

              <div className="real-projet-tags">
                {projet.tags.map((tag, i) => (
                  <span key={i} className="real-tag">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}

export default Realisations
