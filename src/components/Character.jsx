import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMoralState } from '../utils/useMoralState'
import {
  animateTraitAppear,
  animateTraitDisappear,
  animateColorTransition,
  animateEmissive,
} from './Transitions'

/**
 * Character Component
 *
 * Central humanoid figure that transforms based on moral choices
 * Displays progressive angelic or demonic traits symbolically
 *
 * Angelic traits: White robe → Halo → Golden glow
 * Demonic traits: Evil grin → Horns → Red glow
 */
function Character() {
  // Zustand moral state
  const { traits, moralLevel } = useMoralState()

  // Character mesh references
  const characterGroupRef = useRef()
  const skinMaterialRef = useRef()
  const bodyMaterialRef = useRef()

  // Trait mesh references
  const robeRef = useRef()
  const haloRef = useRef()
  const goldenGlowRef = useRef()
  const evilGrinRef = useRef()
  const leftHornRef = useRef()
  const rightHornRef = useRef()
  const redGlowRef = useRef()

  // Previous trait states for animation detection
  const prevTraitsRef = useRef({ ...traits })

  /**
   * Subtle idle breathing animation
   */
  useFrame((state) => {
    if (characterGroupRef.current) {
      characterGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
    }
  })

  /**
   * Animate trait changes based on moral state
   */
  useEffect(() => {
    const prev = prevTraitsRef.current

    // WHITE ROBE
    if (traits.whiteRobe && !prev.whiteRobe) {
      animateTraitAppear(robeRef, 1.0)
    } else if (!traits.whiteRobe && prev.whiteRobe) {
      animateTraitDisappear(robeRef, 0.8)
    }

    // HALO
    if (traits.halo && !prev.halo) {
      animateTraitAppear(haloRef, 0.9)
    } else if (!traits.halo && prev.halo) {
      animateTraitDisappear(haloRef, 0.7)
    }

    // GOLDEN GLOW
    if (traits.goldenGlow && !prev.goldenGlow) {
      animateTraitAppear(goldenGlowRef, 1.2)
    } else if (!traits.goldenGlow && prev.goldenGlow) {
      animateTraitDisappear(goldenGlowRef, 0.8)
    }

    // EVIL GRIN
    if (traits.evilGrin && !prev.evilGrin) {
      animateTraitAppear(evilGrinRef, 0.6)
    } else if (!traits.evilGrin && prev.evilGrin) {
      animateTraitDisappear(evilGrinRef, 0.5)
    }

    // HORNS
    if (traits.horns && !prev.horns) {
      animateTraitAppear(leftHornRef, 0.9)
      animateTraitAppear(rightHornRef, 0.9)
    } else if (!traits.horns && prev.horns) {
      animateTraitDisappear(leftHornRef, 0.7)
      animateTraitDisappear(rightHornRef, 0.7)
    }

    // RED GLOW
    if (traits.redGlow && !prev.redGlow) {
      animateTraitAppear(redGlowRef, 1.0)
      // Animate skin to red
      if (skinMaterialRef.current && bodyMaterialRef.current) {
        animateColorTransition(skinMaterialRef, new THREE.Color('#ff6b6b'), 1.2)
        animateColorTransition(bodyMaterialRef, new THREE.Color('#8b0000'), 1.2)
        animateEmissive(bodyMaterialRef, new THREE.Color('#ff0000'), 0.4, 1.2)
      }
    } else if (!traits.redGlow && prev.redGlow) {
      animateTraitDisappear(redGlowRef, 0.8)
      // Restore neutral skin color
      if (skinMaterialRef.current && bodyMaterialRef.current) {
        animateColorTransition(skinMaterialRef, new THREE.Color('#ffdbac'), 1.0)
        animateColorTransition(bodyMaterialRef, new THREE.Color('#4a5568'), 1.0)
        animateEmissive(bodyMaterialRef, new THREE.Color('#000000'), 0, 1.0)
      }
    }

    prevTraitsRef.current = { ...traits }
  }, [traits])

  return (
    <group ref={characterGroupRef} position={[0, 0.5, 0]}>
      {/* ========== BODY BASE ========== */}

      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          ref={skinMaterialRef}
          color="#ffdbac"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.45, 0.2]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.08, 1.45, 0.2]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.6, 4, 16]} />
        <meshStandardMaterial
          ref={bodyMaterialRef}
          color="#4a5568"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.6} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.55, 0.35, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[-0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} />
      </mesh>

      {/* ========== ANGELIC TRAITS ========== */}

      {/* White Robe */}
      <mesh ref={robeRef} position={[0, 0.5, 0]} visible={false} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#fef9e7"
          emissiveIntensity={0.3}
          transparent
          opacity={0}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Halo */}
      <mesh ref={haloRef} position={[0, 1.85, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[0.35, 0.04, 16, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffeb99"
          emissiveIntensity={0.8}
          transparent
          opacity={0}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Golden Glow (large transparent sphere) */}
      <mesh ref={goldenGlowRef} position={[0, 0.8, 0]} visible={false}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#fff9e6"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          transparent
          opacity={0}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* ========== DEMONIC TRAITS ========== */}

      {/* Evil Grin (red emissive overlay on mouth area) */}
      <mesh ref={evilGrinRef} position={[0, 1.3, 0.24]} visible={false}>
        <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1.0}
          transparent
          opacity={0}
          roughness={0.3}
        />
      </mesh>

      {/* Horns */}
      <mesh
        ref={leftHornRef}
        position={[-0.15, 1.6, 0.05]}
        rotation={[-0.3, -0.4, -0.2]}
        visible={false}
        castShadow
      >
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#440000"
          emissiveIntensity={0.2}
          transparent
          opacity={0}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
      <mesh
        ref={rightHornRef}
        position={[0.15, 1.6, 0.05]}
        rotation={[-0.3, 0.4, 0.2]}
        visible={false}
        castShadow
      >
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#440000"
          emissiveIntensity={0.2}
          transparent
          opacity={0}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Red Glow (large red sphere) */}
      <mesh ref={redGlowRef} position={[0, 0.8, 0]} visible={false}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#4a0000"
          emissive="#ff0000"
          emissiveIntensity={0.4}
          transparent
          opacity={0}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

export default Character
