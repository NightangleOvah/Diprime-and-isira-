import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CharacterId = 'akhi-habibi' | 'naren' | 'achintha' | 'simon' | 'abu-famous'

export type Achievement = {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export type MasterProjectBible = {
  project: {
    title: string
    codename: string
    version: string
    theme: 'infinite-walima'
  }
  cast: Record<CharacterId, {
    name: string
    title: string
    lore: string
    active: boolean
  }>
  recurringGags: string[]
  plannedSections: string[]
  easterEggs: string[]
  soundEffects: string[]
  fictionalAds: string[]
  futureIdeas: string[]
}

type WalimaState = {
  brainrotLevel: number
  discoveries: number
  soundEnabled: boolean
  bootComplete: boolean
  activeCharacter: CharacterId | null
  konamiProgress: number
  achievements: Achievement[]
  bible: MasterProjectBible
  incrementBrainrot: (amount?: number) => void
  discover: () => void
  setSoundEnabled: (enabled: boolean) => void
  setBootComplete: (complete: boolean) => void
  setActiveCharacter: (character: CharacterId | null) => void
  setKonamiProgress: (progress: number) => void
  unlockAchievement: (id: string) => void
}

const initialAchievements: Achievement[] = [
  { id: 'abu-famous', title: 'Found Abu Famous', description: 'The legendary guest has entered the timeline.', unlocked: false },
  { id: 'simon-trap', title: "Survived Simon's Trap", description: 'Virus detected. Insufficient gainz survived.', unlocked: false },
  { id: 'sixteen-biceps', title: 'Attained 16-inch Biceps', description: 'A completely fictional achievement of maximum gym-bro lore.', unlocked: false },
  { id: 'zaffe', title: 'Zaffe Protocol', description: 'Activated the ceremonial beat-drop sequence.', unlocked: false },
  { id: 'konami', title: 'Infinite Dabke', description: 'Entered the legendary Zaffe Konami Code.', unlocked: false },
]

export const useWalimaStore = create<WalimaState>()(
  persist(
    (set) => ({
      brainrotLevel: 0,
      discoveries: 0,
      soundEnabled: true,
      bootComplete: false,
      activeCharacter: null,
      konamiProgress: 0,
      achievements: initialAchievements,
      bible: {
        project: {
          title: 'The Infinite Walima',
          codename: 'OMEGA-TIER BROMANCE DIRECTIVE',
          version: '11.0',
          theme: 'infinite-walima',
        },
        cast: {
          'akhi-habibi': { name: 'Akhi & Habibi', title: 'The Grooms of Brotherhood', lore: 'Legends of Sabr and pure gainz.', active: true },
          naren: { name: 'Naren', title: 'The Bench Press Sheikh', lore: 'Guardian of the Fajr Iron Temple.', active: false },
          achintha: { name: 'Achintha', title: 'The Mandi Master', lore: 'A hidden code-dweller who throws bouncing pixel rice bowls.', active: false },
          simon: { name: 'Simon', title: 'The Taqiyah Tactician', lore: 'A chaotic vaporwave assistant with suspicious pop-ups.', active: false },
          'abu-famous': { name: 'Abu Famous', title: 'The Legendary Guest', lore: 'Arrives with glowing particles and unnecessary breaking news.', active: false },
        },
        recurringGags: ['Insufficient Gainz', 'Habibi, trust the process!', 'Mandi physics', 'Fajr Iron Temple', 'random breaking news'],
        plannedSections: ['Boot Sequence', 'Hero', 'Soundboard', 'Our Dawat', 'Schedule Matrix', 'RSVP Portal', 'Achievements', 'Easter Eggs', 'Hidden Pages'],
        easterEggs: ['Zaffe Konami Code', 'Achintha keyboard summon', 'Simon random traps', 'Abu Famous surprise entrance'],
        soundEffects: ['zaffe airhorn', 'Dabke beat drop', 'dramatic boom', 'bass chant', 'UI glitch'],
        fictionalAds: ['Halal Protein Tub Deluxe', 'Fajr Iron Temple Membership', 'Premium Mandi Insurance'],
        futureIdeas: ['WebGL Dabke silhouettes', 'Matter.js feast physics', '3D shawarma rain', 'holographic guestbook', 'walima arcade', 'lore archive'],
      },
      incrementBrainrot: (amount = 1) => set((state) => ({ brainrotLevel: state.brainrotLevel + amount })),
      discover: () => set((state) => ({ discoveries: state.discoveries + 1, brainrotLevel: state.brainrotLevel + 5 })),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setBootComplete: (complete) => set({ bootComplete: complete }),
      setActiveCharacter: (character) => set({ activeCharacter: character }),
      setKonamiProgress: (progress) => set({ konamiProgress: progress }),
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map((achievement) => achievement.id === id ? { ...achievement, unlocked: true } : achievement),
      })),
    }),
    {
      name: 'infinite-walima-state',
      partialize: (state) => ({
        brainrotLevel: state.brainrotLevel,
        discoveries: state.discoveries,
        soundEnabled: state.soundEnabled,
        achievements: state.achievements,
      }),
    },
  ),
)
