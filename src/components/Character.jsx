import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

/**
 * Character Component
 * Represents a refined humanoid figure with realistic proportions
 * Transforms through material properties (color, emissive) based on moral choices
 * NO physical wings - transformation is purely symbolic and light-based
 */
function Character({ choice }) {
  const characterRef = useRef()
  const headRef = useRef()
  const torsoRef = useRef()
  const skinRefs = useRef([]) // References to all skin materials
  const clothRefs = useRef([]) // References to all clothing materials

  // Subtle idle animation (breathing effect)
  useFrame((state) => {
    if (characterRef.current) {
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }

    // Add subtle emissive pulsing based on choice
    if (choice === 'angel' && skinRefs.current.length > 0) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7
      skinRefs.current.forEach((mat) => {
        if (mat) mat.emissiveIntensity = pulse * 0.4
      })
    } else if (choice === 'devil' && clothRefs.current.length > 0) {
      const flicker = Math.sin(state.clock.elapsedTime * 4) * 0.4 + 0.6
      clothRefs.current.forEach((mat) => {
        if (mat) mat.emissiveIntensity = flicker * 0.6
      })
    }
  })

  /**
   * Handle material transformations based on moral choice
   * Animates color and emissive properties for cinematic effect
   */
  useEffect(() => {
    if (!choice) return

    let targetSkinColor
    let targetSkinEmissive
    let targetClothColor
    let targetClothEmissive
    let skinEmissiveIntensity
    let clothEmissiveIntensity

    switch (choice) {
      case 'angel':
        // Golden, bright, heavenly appearance
        targetSkinColor = new THREE.Color(0xffedb8) // Warm golden skin
        targetSkinEmissive = new THREE.Color(0xffd700) // Golden glow
        targetClothColor = new THREE.Color(0xf0f0f0) // Bright white clothing
        targetClothEmissive = new THREE.Color(0xffffff) // White emissive
        skinEmissiveIntensity = 0.3
        clothEmissiveIntensity = 0.2
        break

      case 'devil':
        // Dark, crimson, ominous appearance
        targetSkinColor = new THREE.Color(0xd4a088) // Reddish skin tone
        targetSkinEmissive = new THREE.Color(0x000000) // No skin glow
        targetClothColor = new THREE.Color(0x330000) // Deep crimson clothing
        targetClothEmissive = new THREE.Color(0xff0000) // Red emissive
        skinEmissiveIntensity = 0
        clothEmissiveIntensity = 0.5
        break

      case 'neutral':
        // Natural, balanced appearance
        targetSkinColor = new THREE.Color(0xffdbac) // Natural skin
        targetSkinEmissive = new THREE.Color(0x000000) // No glow
        targetClothColor = new THREE.Color(0x4a5568) // Neutral gray clothing
        targetClothEmissive = new THREE.Color(0x000000) // No emissive
        skinEmissiveIntensity = 0
        clothEmissiveIntensity = 0
        break

      default:
        return
    }

    // Animate all skin materials
    skinRefs.current.forEach((material) => {
      if (material) {
        gsap.to(material.color, {
          r: targetSkinColor.r,
          g: targetSkinColor.g,
          b: targetSkinColor.b,
          duration: 2,
          ease: 'power2.inOut',
        })
        gsap.to(material.emissive, {
          r: targetSkinEmissive.r,
          g: targetSkinEmissive.g,
          b: targetSkinEmissive.b,
          duration: 2,
          ease: 'power2.inOut',
        })
        gsap.to(material, {
          emissiveIntensity: skinEmissiveIntensity,
          duration: 2,
          ease: 'power2.inOut',
        })
      }
    })

    // Animate all clothing materials
    clothRefs.current.forEach((material) => {
      if (material) {
        gsap.to(material.color, {
          r: targetClothColor.r,
          g: targetClothColor.g,
          b: targetClothColor.b,
          duration: 2,
          ease: 'power2.inOut',
        })
        gsap.to(material.emissive, {
          r: targetClothEmissive.r,
          g: targetClothEmissive.g,
          b: targetClothEmissive.b,
          duration: 2,
          ease: 'power2.inOut',
        })
        gsap.to(material, {
          emissiveIntensity: clothEmissiveIntensity,
          duration: 2,
          ease: 'power2.inOut',
        })
      }
    })
  }, [choice])

  return (
    <group ref={characterRef} position={[0, 1, 0]}>
      {/* Head with more detail */}
      <mesh position={[0, 1.4, 0]} castShadow ref={headRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[0] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.45, 0.2]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.08, 1.45, 0.2]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[1] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Torso - More anatomical shape */}
      <mesh position={[0, 0.7, 0]} castShadow ref={torsoRef}>
        <capsuleGeometry args={[0.28, 0.6, 4, 16]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[0] = el)}
          color="#4a5568"
          roughness={0.6}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[1] = el)}
          color="#4a5568"
          roughness={0.6}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[0.35, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[2] = el)}
          color="#4a5568"
          roughness={0.6}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Arms - Upper and Lower */}
      {/* Left Arm */}
      <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[2] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[3] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[4] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[0.55, 0.35, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[5] = el)}
          color="#ffdbac"
          roughness={0.4}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[6] = el)}
          color="#ffdbac"
          roughness={0.5}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[0.6, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (skinRefs.current[7] = el)}
          color="#ffdbac"
          roughness={0.5}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[3] = el)}
          color="#2d3748"
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Legs - Upper and Lower */}
      {/* Left Leg */}
      <mesh position={[-0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[4] = el)}
          color="#2d3748"
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[-0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[5] = el)}
          color="#2d3748"
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[6] = el)}
          color="#2d3748"
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[7] = el)}
          color="#2d3748"
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[8] = el)}
          color="#1a202c"
          roughness={0.8}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[0.15, -0.85, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.22]} />
        <meshStandardMaterial
          ref={(el) => el && (clothRefs.current[9] = el)}
          color="#1a202c"
          roughness={0.8}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Symbolic Aura - A radial plane behind character that glows based on choice */}
      {choice && (
        <mesh position={[0, 0.7, -0.5]} rotation={[0, 0, 0]}>
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial
            color={choice === 'angel' ? '#ffd700' : choice === 'devil' ? '#ff0000' : '#808080'}
            transparent
            opacity={choice === 'neutral' ? 0 : 0.2}
          />
        </mesh>
      )}
    </group>
  )
}

export default Character
