import { create } from 'zustand'

/**
 * Moral State Management Store
 *
 * Tracks the character's moral alignment from -3 (fully evil) to +3 (fully good)
 * and manages individual trait visibility for angelic and demonic transformations.
 *
 * Moral Level Scale:
 * +3: Fully angelic (robe + enhanced glow + floating halo)
 * +2: Holy (robe + enhanced glow)
 * +1: Virtuous (robe only)
 *  0: Neutral (baseline human)
 * -1: Corrupted (evil grin)
 * -2: Demonic (evil grin + horns)
 * -3: Fully evil (evil grin + horns + entire body red)
 */
export const useMoralState = create((set) => ({
  // Core moral level (-3 to +3)
  moralLevel: 0,

  // Individual trait visibility flags
  traits: {
    // Angelic traits (positive)
    whiteRobe: false,
    robeGlow: false,
    halo: false,

    // Demonic traits (negative)
    evilGrin: false,
    horns: false,
    bodyRed: false,
  },

  // Environment state
  environment: {
    backgroundColor: '#a8b2bb', // neutral gray
    lightColor: '#ffffff',
    ambientIntensity: 0.5,
    fogDensity: 0.02,
  },

  // Particle effects trigger
  particleEffect: null, // 'gold', 'red', 'ripple', or null

  /**
   * Make a GOOD choice (Flower)
   * Removes demonic traits first, then adds angelic traits
   */
  chooseGood: () => set((state) => {
    const newLevel = Math.min(state.moralLevel + 1, 3)
    const newTraits = { ...state.traits }

    // If currently evil, remove demonic traits in reverse order
    if (state.moralLevel < 0) {
      if (state.traits.bodyRed) {
        newTraits.bodyRed = false
      } else if (state.traits.horns) {
        newTraits.horns = false
      } else if (state.traits.evilGrin) {
        newTraits.evilGrin = false
      }
    }
    // If neutral or already good, add angelic traits sequentially
    else {
      if (!state.traits.whiteRobe) {
        newTraits.whiteRobe = true
      } else if (!state.traits.robeGlow) {
        newTraits.robeGlow = true
      } else if (!state.traits.halo) {
        newTraits.halo = true
      }
    }

    // Environment transitions to golden-white
    const envColors = [
      { bg: '#a8b2bb', light: '#ffffff', ambient: 0.5 }, // 0: neutral
      { bg: '#c4b59a', light: '#fff5e1', ambient: 0.5 }, // +1: warm
      { bg: '#d4c5a1', light: '#ffd700', ambient: 0.55 }, // +2: golden
      { bg: '#e4d5b4', light: '#ffeb99', ambient: 0.6 }, // +3: radiant
    ]
    const envIndex = Math.max(0, newLevel)
    const env = envColors[envIndex]

    return {
      moralLevel: newLevel,
      traits: newTraits,
      environment: {
        backgroundColor: env.bg,
        lightColor: env.light,
        ambientIntensity: env.ambient,
        fogDensity: 0.02,
      },
      particleEffect: 'gold',
    }
  }),

  /**
   * Make a BAD choice (Knife)
   * Removes angelic traits first, then adds demonic traits
   */
  chooseEvil: () => set((state) => {
    const newLevel = Math.max(state.moralLevel - 1, -3)
    const newTraits = { ...state.traits }

    // If currently good, remove angelic traits in reverse order
    if (state.moralLevel > 0) {
      if (state.traits.halo) {
        newTraits.halo = false
      } else if (state.traits.robeGlow) {
        newTraits.robeGlow = false
      } else if (state.traits.whiteRobe) {
        newTraits.whiteRobe = false
      }
    }
    // If neutral or already evil, add demonic traits sequentially
    else {
      if (!state.traits.evilGrin) {
        newTraits.evilGrin = true
      } else if (!state.traits.horns) {
        newTraits.horns = true
      } else if (!state.traits.bodyRed) {
        newTraits.bodyRed = true
      }
    }

    // Environment darkens to crimson
    const envColors = [
      { bg: '#a8b2bb', light: '#ffffff', ambient: 0.5 }, // 0: neutral
      { bg: '#8a7a7a', light: '#ffd4d4', ambient: 0.4 }, // -1: dim
      { bg: '#6a4545', light: '#ff9999', ambient: 0.3 }, // -2: dark red
      { bg: '#4a2020', light: '#ff5555', ambient: 0.25 }, // -3: crimson
    ]
    const envIndex = Math.abs(Math.min(0, newLevel))
    const env = envColors[envIndex]

    return {
      moralLevel: newLevel,
      traits: newTraits,
      environment: {
        backgroundColor: env.bg,
        lightColor: env.light,
        ambientIntensity: env.ambient,
        fogDensity: 0.03,
      },
      particleEffect: 'red',
    }
  }),

  /**
   * Make a NEUTRAL choice (Stone)
   * Resets environment but keeps character state
   */
  chooseNeutral: () => set((state) => ({
    ...state,
    environment: {
      backgroundColor: '#a8b2bb',
      lightColor: '#ffffff',
      ambientIntensity: 0.5,
      fogDensity: 0.02,
    },
    particleEffect: 'ripple',
  })),

  /**
   * Clear particle effect after animation completes
   */
  clearParticleEffect: () => set({ particleEffect: null }),
}))
