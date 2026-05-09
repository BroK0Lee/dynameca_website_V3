import { useEffect, useRef } from 'react'
import { Lightbulb, Wrench, Package } from 'lucide-react'
import { initialiserAnimationDeposerUnProjet } from '../Animations/animation_deposer_projet.ts'

/**
 * Données des 3 cartes de segmentation visiteur
 */
const cartesProjet = [
  {
    id: 'idee',
    icone: Lightbulb,
    titre: "J'ai une idée de produit",
    description: "Vous avez un croquis, une photo ou simplement une idée ? DYNAMECA vous aide à transformer votre concept en projet concret, exploitable et fabricable.",
    livrables: ["Modèle 3D", "Rendu visuel", "Fichier STEP/STL", "Préparation prototype"],
    bouton: "Concrétiser mon idée",
  },
  {
    id: 'piece',
    icone: Wrench,
    titre: "J'ai une pièce à refaire ou modifier",
    description: "Une pièce est cassée, introuvable ou doit être adaptée ? À partir d'une pièce existante, d'un plan, d'une photo ou d'un fichier, nous recréons une version 3D propre et prête à fabriquer.",
    livrables: ["Reconstruction 3D", "Plan technique", "Fichier de fabrication", "Modification ou amélioration"],
    bouton: "Refaire ou modifier ma pièce",
  },
  {
    id: 'configurable',
    icone: Package,
    titre: "Je veux vendre un produit configurable",
    description: "Vous souhaitez proposer un produit personnalisable à vos clients ? Nous vous accompagnons dans la création d'une base 3D configurable avec variantes, rendus, logique technique et préparation fabrication.",
    livrables: ["Modèle paramétrique", "Variantes produit", "Rendus 3D", "Préparation configurateur"],
    bouton: "Créer mon produit configurable",
  },
]

/**
 * Composant DeposerUnProjet - Section de dépôt de projet
 * Présente 3 cartes de segmentation pour orienter le visiteur
 */
function DeposerUnProjet() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      initialiserAnimationDeposerUnProjet(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="deposer-projet"
      className="section-plein-ecran slide"
    >
      {/* En-tête de section */}
      <div className="deposer-entete">
        <h1 id="deposer_titre" className="titre-section">Déposer un projet</h1>
        <p id="deposer_sous_titre" className="sous-titre-section">Quel est votre besoin ?</p>
      </div>

      {/* Grille des 3 cartes */}
      <div id="deposer_cartes" className="deposer-cartes">
        {cartesProjet.map((carte) => {
          const Icone = carte.icone
          return (
            <div key={carte.id} className="projet-carte">
              {/* Icône */}
              <div className="projet-carte-icone">
                <Icone size={32} strokeWidth={1.5} />
              </div>

              {/* Titre */}
              <h2 className="projet-carte-titre">{carte.titre}</h2>

              {/* Description */}
              <p className="projet-carte-description">{carte.description}</p>

              {/* Livrables */}
              <ul className="projet-carte-livrables">
                {carte.livrables.map((livrable) => (
                  <li key={livrable} className="projet-carte-livrable">
                    <span className="livrable-puce">▸</span>
                    {livrable}
                  </li>
                ))}
              </ul>

              {/* Bouton CTA */}
              <button className="projet-carte-bouton">
                {carte.bouton}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default DeposerUnProjet
