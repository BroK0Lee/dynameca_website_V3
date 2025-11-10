import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Get all slide sections
  const slides = document.querySelectorAll('.slide')
  
  // Animate each section on scroll
  slides.forEach((slide, index) => {
    // Initial state - slightly scaled down and transparent
    gsap.set(slide, {
      opacity: 0,
      scale: 0.9
    })
    
    // Animate in when scrolling into view
    gsap.to(slide, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: slide,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false // Set to true to debug scroll positions
      }
    })
    
    // Animate the heading inside each section
    const heading = slide.querySelector('h1')
    if (heading) {
      gsap.from(heading, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: slide,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      })
    }
  })
  
  // Add a subtle parallax effect to headings
  slides.forEach((slide) => {
    const heading = slide.querySelector('h1')
    if (heading) {
      gsap.to(heading, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: slide,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          markers: false
        }
      })
    }
  })
})

