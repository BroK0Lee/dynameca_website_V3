import { create } from 'zustand'

/**
 * Interface définissant la structure du store global de l'application
 */
interface StoreApp {
  // === NAVIGATION ===
  /** Section actuellement visible (hero, configurator, services, etc.) */
  sectionActive: string
  /** Définir la section active lors du scroll */
  definirSectionActive: (section: string) => void

  // === ANIMATIONS GSAP ===
  /** Map stockant les références aux timelines GSAP de chaque section */
  timelinesGsap: Map<string, gsap.core.Timeline>
  /** Enregistrer une timeline GSAP pour pouvoir la contrôler depuis n'importe où */
  enregistrerTimeline: (nom: string, timeline: gsap.core.Timeline) => void
  /** Récupérer une timeline par son nom */
  obtenirTimeline: (nom: string) => gsap.core.Timeline | undefined

  // === UI ===
  /** État du menu mobile (ouvert/fermé) */
  menuOuvert: boolean
  /** Basculer l'état du menu */
  basculerMenu: () => void

  // === MODALE MON COMPTE ===
  /** État de la modale Mon Compte (ouverte/fermée) */
  modaleCompteOuverte: boolean
  /** Ouvrir la modale Mon Compte */
  ouvrirModaleCompte: () => void
  /** Fermer la modale Mon Compte */
  fermerModaleCompte: () => void
}

/**
 * Store Zustand principal de l'application
 * Gère l'état global : navigation, références aux animations GSAP, UI
 */
export const useStore = create<StoreApp>((set, get) => ({
  // Valeurs initiales
  sectionActive: 'hero',
  timelinesGsap: new Map(),
  menuOuvert: false,
  modaleCompteOuverte: false,

  // Actions
  definirSectionActive: (section: string) => {
    set({ sectionActive: section })
  },

  enregistrerTimeline: (nom: string, timeline: gsap.core.Timeline) => {
    const nouvellesTimelines = new Map(get().timelinesGsap)
    nouvellesTimelines.set(nom, timeline)
    set({ timelinesGsap: nouvellesTimelines })
  },

  obtenirTimeline: (nom: string) => {
    return get().timelinesGsap.get(nom)
  },

  basculerMenu: () => {
    set((state) => ({ menuOuvert: !state.menuOuvert }))
  },

  ouvrirModaleCompte: () => {
    set({ modaleCompteOuverte: true })
  },

  fermerModaleCompte: () => {
    set({ modaleCompteOuverte: false })
  },
}))
