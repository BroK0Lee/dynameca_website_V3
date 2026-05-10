import { scrollVerSection } from '../Animations/animation_app.ts'

function OffresEtTarifs() {
  return (
    <section id="offres-tarifs" className="section-plein-ecran slide">
      <div className="ot-grille">

        {/* Colonne gauche — titre + texte */}
        <div className="ot-colonne-gauche">
          <h2 className="ot-titre">Des tarifs adaptés à votre projet</h2>

          <p className="ot-paragraphe">
            Chaque projet est différent. Une simple modification de fichier, une pièce à refaire,
            une idée à concrétiser ou un prototype complet ne demandent pas le même niveau de
            conception, de précision ni d’accompagnement.
          </p>

          <p className="ot-paragraphe">
            Avant toute proposition, DYNAMECA analyse gratuitement votre demande afin de comprendre
            votre besoin, les éléments disponibles, les livrables attendus et le niveau
            d’accompagnement nécessaire.
          </p>

          <p className="ot-paragraphe">
            Le tarif dépend ensuite du périmètre réel du projet : complexité de la géométrie,
            nombre de pièces, qualité des fichiers ou croquis fournis, niveau de détail attendu,
            besoin de plans 2D, formats à livrer, contraintes techniques, esthétiques ou mécaniques,
            et accompagnement éventuel jusqu’à la fabrication ou la réalisation.
          </p>

          <p className="ot-paragraphe ot-objectif">
            Objectif : vous proposer un devis clair, adapté et sans mauvaise surprise.
          </p>
        </div>

        {/* Colonne droite — mise en évidence + actions */}
        <div className="ot-colonne-droite">
          {/* Mise en évidence du prix d’entrée */}
          <div className="ot-mise-en-evidence">
            <span className="ot-mev-label">Des interventions simples</span>
            <div className="ot-mev-prix-wrapper">
              <span className="ot-mev-depuis">à partir de</span>
              <span className="ot-mev-prix">
                <span className="ot-mev-chiffre">80</span>€ HT
              </span>
            </div>
          </div>

          <div className="ot-actions">
            <button
              className="ot-bouton-cta"
              onClick={() => scrollVerSection('deposer-projet', true)}
            >
              Demander une analyse gratuite
            </button>
            <button
              className="ot-lien-realisations"
              onClick={() => scrollVerSection('realisations')}
            >
              Voir les exemples de réalisation →
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default OffresEtTarifs
