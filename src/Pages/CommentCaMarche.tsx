import { initialiserAnimationCommentCaMarche } from '../Animations/animation_comment_ca_marche.ts'

/**
 * Données des 5 étapes du parcours client
 */
const etapes = [
  {
    numero: '01',
    label: 'Dépôt',
    titre: 'Déposez votre projet',
    description:
      "Ajoutez vos photos, croquis, fichiers, plans ou explications. Même une idée encore imprécise peut servir de point de départ.",
    resultat: "votre demande est transformée en premier brief projet.",
  },
  {
    numero: '02',
    label: 'Analyse',
    titre: 'Recevez une analyse technique',
    description:
      "Nous identifions les contraintes, les risques, le procédé adapté et les livrables nécessaires.",
    resultat: "vous savez si le projet est réalisable et comment avancer.",
  },
  {
    numero: '03',
    label: 'Cadrage',
    titre: "Validez l'approche",
    description:
      "Nous clarifions le périmètre, les objectifs, les hypothèses, les livrables et le budget avant de lancer la conception.",
    resultat: "le projet est cadré, clair et sans zone floue.",
  },
  {
    numero: '04',
    label: 'Conception',
    titre: "Suivez la conception 3D",
    description:
      "Vous commentez, ajustez et validez les versions importantes du modèle.",
    resultat: "votre idée devient un modèle 3D exploitable et pensé pour la fabrication.",
  },
  {
    numero: '05',
    label: 'Réalisation',
    titre: "Passez à la réalisation",
    description:
      "Nous préparons les fichiers STEP, STL, DXF, PDF, plans, rendus ou dossier fournisseur, avec accompagnement possible jusqu'au prototype ou à la fabrication.",
    resultat: "vous obtenez un dossier exploitable pour produire, prototyper ou lancer la suite.",
  },
]

/**
 * Composant CommentCaMarche - Parcours client en 5 étapes avec scroll horizontal GSAP
 */
function CommentCaMarche() {
  return (
    <section
      id="comment-ca-marche"
      className="section-plein-ecran"
    >
      {/* En-tête de la section */}
      <div className="ccm-en-tete">
        <h1 id="ccm_titre" className="titre-section">
          Un parcours clair, de l'idée à la réalisation
        </h1>
        <p id="ccm_sous_titre" className="sous-titre-section">
          Pas besoin d'un cahier des charges parfait pour commencer. DYNAMECA vous guide étape par étape pour transformer votre idée, votre croquis ou votre pièce existante en projet concret, exploitable et fabricable.
        </p>
      </div>

      {/* Piste de défilement horizontal */}
      <div className="ccm-piste">
        <div className="ccm-cartes-wrapper">
          {etapes.map((etape) => (
            <div key={etape.numero} className="ccm-carte">
              <div className="ccm-carte-numero">{etape.numero}</div>
              <span className="ccm-carte-label">{etape.label}</span>
              <h3 className="ccm-carte-titre">{etape.titre}</h3>
              <p className="ccm-carte-description">{etape.description}</p>
              <div className="ccm-carte-resultat">
                <span className="resultat-fleche">→</span>
                <p>{etape.resultat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de progression */}
      <div className="ccm-progression">
        {etapes.map((etape, i) => (
          <div
            key={i}
            className="ccm-prog-point"
            data-index={i}
            title={etape.label}
          />
        ))}
      </div>
    </section>
  )
}

export default CommentCaMarche
