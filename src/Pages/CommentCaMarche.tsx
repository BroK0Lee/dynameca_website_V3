import { useEffect, useRef } from 'react'
import { initialiserAnimationCommentCaMarche } from '../Animations/animation_comment_ca_marche.ts'

/**
 * Composant CommentCaMarche - Section expliquant le fonctionnement
 */
function CommentCaMarche() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialiser les animations GSAP après le montage du composant
    if (sectionRef.current) {
      initialiserAnimationCommentCaMarche(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="comment-ca-marche"
      className="section-plein-ecran slide"
    >
      <h1 className="titre-section">Comment ça marche Section</h1>
    </section>
  )
}

export default CommentCaMarche
