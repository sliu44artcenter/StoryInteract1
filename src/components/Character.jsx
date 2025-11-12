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
 * Angelic traits: White robe → Enhanced robe glow → Floating halo
 * Demonic traits: Evil grin → Horns → Entire body turns red
 */
function Character() {
  // Zustand moral state
  const { traits, moralLevel } = useMoralState()

  // Character mesh references
  const characterGroupRef = useRef()

  // Skin material references (for bodyRed transformation)
  const headMaterialRef = useRef()
  const neckMaterialRef = useRef()
  const leftUpperArmMaterialRef = useRef()
  const leftLowerArmMaterialRef = useRef()
  const rightUpperArmMaterialRef = useRef()
  const rightLowerArmMaterialRef = useRef()
  const leftHandMaterialRef = useRef()
  const rightHandMaterialRef = useRef()

  // Body/clothing material references (for bodyRed transformation)
  const torsoMaterialRef = useRef()
  const leftShoulderMaterialRef = useRef()
  const rightShoulderMaterialRef = useRef()
  const hipsMaterialRef = useRef()
  const leftUpperLegMaterialRef = useRef()
  const leftLowerLegMaterialRef = useRef()
  const rightUpperLegMaterialRef = useRef()
  const rightLowerLegMaterialRef = useRef()
  const leftFootMaterialRef = useRef()
  const rightFootMaterialRef = useRef()

  // Trait mesh references
  const robeRef = useRef()
  const robeMaterialRef = useRef()
  const haloRef = useRef()
  const evilGrinRef = useRef()
  const leftHornRef = useRef()
  const rightHornRef = useRef()

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

    // ROBE GLOW (enhanced emissive intensity on robe)
    if (traits.robeGlow && !prev.robeGlow) {
      if (robeMaterialRef.current) {
        animateEmissive(robeMaterialRef, new THREE.Color('#ffd700'), 0.8, 1.0)
      }
    } else if (!traits.robeGlow && prev.robeGlow) {
      if (robeMaterialRef.current) {
        animateEmissive(robeMaterialRef, new THREE.Color('#fef9e7'), 0.3, 0.8)
      }
    }

    // HALO (final angelic stage - floating ring above head)
    if (traits.halo && !prev.halo) {
      animateTraitAppear(haloRef, 1.2)
    } else if (!traits.halo && prev.halo) {
      animateTraitDisappear(haloRef, 0.9)
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

    // BODY RED (final demonic stage - entire body turns red)
    if (traits.bodyRed && !prev.bodyRed) {
      // Turn all skin parts red
      const skinRed = new THREE.Color('#cc0000')
      animateColorTransition(headMaterialRef, skinRed, 1.5)
      animateColorTransition(neckMaterialRef, skinRed, 1.5)
      animateColorTransition(leftUpperArmMaterialRef, skinRed, 1.5)
      animateColorTransition(leftLowerArmMaterialRef, skinRed, 1.5)
      animateColorTransition(rightUpperArmMaterialRef, skinRed, 1.5)
      animateColorTransition(rightLowerArmMaterialRef, skinRed, 1.5)
      animateColorTransition(leftHandMaterialRef, skinRed, 1.5)
      animateColorTransition(rightHandMaterialRef, skinRed, 1.5)

      // Turn all body/clothing parts dark red
      const bodyRed = new THREE.Color('#8b0000')
      animateColorTransition(torsoMaterialRef, bodyRed, 1.5)
      animateColorTransition(leftShoulderMaterialRef, bodyRed, 1.5)
      animateColorTransition(rightShoulderMaterialRef, bodyRed, 1.5)
      animateColorTransition(hipsMaterialRef, bodyRed, 1.5)
      animateColorTransition(leftUpperLegMaterialRef, bodyRed, 1.5)
      animateColorTransition(leftLowerLegMaterialRef, bodyRed, 1.5)
      animateColorTransition(rightUpperLegMaterialRef, bodyRed, 1.5)
      animateColorTransition(rightLowerLegMaterialRef, bodyRed, 1.5)
      animateColorTransition(leftFootMaterialRef, bodyRed, 1.5)
      animateColorTransition(rightFootMaterialRef, bodyRed, 1.5)

      // Add red emissive glow to torso
      if (torsoMaterialRef.current) {
        animateEmissive(torsoMaterialRef, new THREE.Color('#ff0000'), 0.5, 1.5)
      }
    } else if (!traits.bodyRed && prev.bodyRed) {
      // Restore original colors
      const skinNeutral = new THREE.Color('#ffdbac')
      animateColorTransition(headMaterialRef, skinNeutral, 1.2)
      animateColorTransition(neckMaterialRef, skinNeutral, 1.2)
      animateColorTransition(leftUpperArmMaterialRef, skinNeutral, 1.2)
      animateColorTransition(leftLowerArmMaterialRef, skinNeutral, 1.2)
      animateColorTransition(rightUpperArmMaterialRef, skinNeutral, 1.2)
      animateColorTransition(rightLowerArmMaterialRef, skinNeutral, 1.2)
      animateColorTransition(leftHandMaterialRef, skinNeutral, 1.2)
      animateColorTransition(rightHandMaterialRef, skinNeutral, 1.2)

      const bodyNeutral = new THREE.Color('#4a5568')
      animateColorTransition(torsoMaterialRef, bodyNeutral, 1.2)
      animateColorTransition(leftShoulderMaterialRef, bodyNeutral, 1.2)
      animateColorTransition(rightShoulderMaterialRef, bodyNeutral, 1.2)

      const hipsNeutral = new THREE.Color('#2d3748')
      animateColorTransition(hipsMaterialRef, hipsNeutral, 1.2)
      animateColorTransition(leftUpperLegMaterialRef, hipsNeutral, 1.2)
      animateColorTransition(leftLowerLegMaterialRef, hipsNeutral, 1.2)
      animateColorTransition(rightUpperLegMaterialRef, hipsNeutral, 1.2)
      animateColorTransition(rightLowerLegMaterialRef, hipsNeutral, 1.2)

      const feetNeutral = new THREE.Color('#1a202c')
      animateColorTransition(leftFootMaterialRef, feetNeutral, 1.2)
      animateColorTransition(rightFootMaterialRef, feetNeutral, 1.2)

      // Remove emissive glow
      if (torsoMaterialRef.current) {
        animateEmissive(torsoMaterialRef, new THREE.Color('#000000'), 0, 1.2)
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
          ref={headMaterialRef}
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
        <meshStandardMaterial ref={neckMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.6, 4, 16]} />
        <meshStandardMaterial
          ref={torsoMaterialRef}
          color="#4a5568"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial ref={leftShoulderMaterialRef} color="#4a5568" roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial ref={rightShoulderMaterialRef} color="#4a5568" roughness={0.6} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial ref={leftUpperArmMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial ref={leftLowerArmMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial ref={rightUpperArmMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.55, 0.35, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial ref={rightLowerArmMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial ref={leftHandMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial ref={rightHandMaterialRef} color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial ref={hipsMaterialRef} color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial ref={leftUpperLegMaterialRef} color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[-0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial ref={leftLowerLegMaterialRef} color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial ref={rightUpperLegMaterialRef} color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial ref={rightLowerLegMaterialRef} color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial ref={leftFootMaterialRef} color="#1a202c" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial ref={rightFootMaterialRef} color="#1a202c" roughness={0.8} />
      </mesh>

      {/* ========== ANGELIC TRAITS ========== */}

      {/* White Robe (Level +1) */}
      <mesh ref={robeRef} position={[0, 0.5, 0]} visible={false} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
        <meshStandardMaterial
          ref={robeMaterialRef}
          color="#ffffff"
          emissive="#fef9e7"
          emissiveIntensity={0.3}
          transparent
          opacity={0}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Halo (Level +3 - FINAL ANGELIC STAGE) */}
      <mesh ref={haloRef} position={[0, 1.85, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffeb99"
          emissiveIntensity={1.2}
          transparent
          opacity={0}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* ========== DEMONIC TRAITS ========== */}

      {/* Evil Grin (Level -1) */}
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

      {/* Horns (Level -2) */}
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

      {/* Level -3 bodyRed is handled by material color changes above (no mesh needed) */}
    </group>
  )
}

export default Character
