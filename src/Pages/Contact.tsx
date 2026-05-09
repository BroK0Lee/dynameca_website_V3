import { initialiserAnimationContact } from '../Animations/animation_contact.ts'
import { scrollVerSection } from '../Animations/animation_app.ts'

/**
 * Composant Contact - Section de contact professionnelle
 * Même disposition que la Hero section (contenu positionné à droite)
 */
function Contact() {
  return (
    <section
      id="contact"
      className="section-plein-ecran slide"
    >
      <div className="hero-contenu">
        <h1 id="contact_titre" className="titre-section">Parlons de votre projet</h1>
        <p id="contact_texte" className="sous-titre-section">Une question ? Une idée ? Nous sommes à votre écoute.</p>
        <p id="contact_description" className="hero-description">
          Que vous soyez au stade de l'idée ou en phase de concrétisation, l'équipe DYNAMECA est disponible pour échanger sur vos besoins et vous orienter vers la meilleure approche.
        </p>
        <div id="contact_infos" className="contact-infos">
          <div className="contact-info-item">
            <span className="contact-info-label">Email</span>
            <span className="contact-info-valeur">contact@dynameca.fr</span>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">Téléphone</span>
            <span className="contact-info-valeur">+33 (0)X XX XX XX XX</span>
          </div>
        </div>
        <div id="contact_bouton" className="hero-boutons">
          <button
            className="hero-bouton hero-bouton-principal"
            onClick={() => scrollVerSection('deposer-projet')}
          >
            Déposer un projet
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
