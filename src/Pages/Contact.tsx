import { useEffect, useRef } from 'react'
import { initialiserAnimationContact } from '../Animations/animation_contact.ts'

/**
 * Composant Contact - Section de contact
 */
function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationContact(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Contact Section</h1>
    </section>
  )
}

export default Contact
