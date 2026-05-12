import Viewer3D from '../components/Viewer3D'

// Données mock — à remplacer par les vraies réalisations
const realisationsMock = [
  {
    id: 1,
    numero: '01',
    titre: 'Boîtier de protection sur mesure',
    contexte: 'PME industrielle — secteur électronique embarquée',
    description:
      "Conception d'un boîtier de protection pour carte électronique destiné à une utilisation en environnement vibratoire. Contraintes : résistance aux chocs, IP54, fixation sur rail DIN, accès technicien facilité.",
    livrables: ['Modèle 3D SolidWorks', 'Plans 2D cotés', 'Fichier STL pour impression FDM'],
    tags: ['Modélisation 3D', 'Plans 2D', 'Impression FDM'],
    imageSens: 'gauche' as const,
    fichier3d: true,
  },
  {
    id: 2,
    numero: '02',
    titre: "Système d'assemblage par encliquetage",
    contexte: 'Startup produit — prototype fonctionnel',
    description:
      "Conception d'un mécanisme d'assemblage sans outil pour deux sous-ensembles plastiques. Le système intègre un encliquetage à déverrouillage par languette, compatible injection plastique série.",
    livrables: ['Modèle 3D paramétrique', 'Analyse de dépouilles', 'Prototype imprimé validé'],
    tags: ['Conception mécanique', 'Prototypage', 'Injection plastique'],
    imageSens: 'droite' as const,
    fichier3d: true,
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
            {/* Visuel — viewer 3D si disponible, sinon placeholder */}
            <div className="real-projet-visuel">
              {projet.fichier3d ? (
                <Viewer3D
                  src={projet.fichier3dSrc ?? '/Support.glb'}
                  alt={`Modèle 3D — ${projet.titre}`}
                />
              ) : (
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
              )}
            </div>

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
