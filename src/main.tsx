import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrement du plugin ScrollTrigger globalement
gsap.registerPlugin(ScrollTrigger)

// Montage de l'application React
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
