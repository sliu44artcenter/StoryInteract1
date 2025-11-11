import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

/**
 * Character Component
 * Represents the main humanoid figure in the center of the scene
 * Dynamically grows angel or devil wings based on user choice
 */
function Character({ choice }) {
  const characterRef = useRef()
  const angelWingsRef = useRef()
  const devilWingsRef = useRef()

  // Subtle idle animation (breathing effect)
  useFrame((state) => {
    if (characterRef.current) {
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  /**
   * Trigger wing growth animations when choice changes
   */
  useEffect(() => {
    if (!choice) return

    if (choice === 'angel' && angelWingsRef.current) {
      // Grow angel wings
      gsap.fromTo(
        angelWingsRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        }
      )
      gsap.to(angelWingsRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: 'power2.out',
      })

      // Hide devil wings
      if (devilWingsRef.current) {
        gsap.to(devilWingsRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
        })
      }
    } else if (choice === 'devil' && devilWingsRef.current) {
      // Grow devil wings
      gsap.fromTo(
        devilWingsRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: 'back.out(1.7)',
        }
      )

      // Hide angel wings
      if (angelWingsRef.current) {
        gsap.to(angelWingsRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
        })
      }
    } else if (choice === 'neutral') {
      // Hide both wings
      if (angelWingsRef.current) {
        gsap.to(angelWingsRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
        })
      }
      if (devilWingsRef.current) {
        gsap.to(devilWingsRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
        })
      }
    }
  }, [choice])

  return (
    <group ref={characterRef} position={[0, 1, 0]}>
      {/* Character Body - Simple humanoid using primitive shapes */}
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.4, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, -0.4, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Angel Wings */}
      <group ref={angelWingsRef} position={[0, 0.8, -0.2]} scale={0}>
        {/* Left Wing */}
        <mesh position={[-0.8, 0, 0]} rotation={[0.2, -0.5, 0.3]}>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <mesh position={[-1.2, -0.1, 0]} rotation={[0.3, -0.7, 0.5]}>
          <boxGeometry args={[0.8, 0.04, 0.5]} />
          <meshStandardMaterial
            color="#ffed4e"
            emissive="#ffd700"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>

        {/* Right Wing */}
        <mesh position={[0.8, 0, 0]} rotation={[0.2, 0.5, -0.3]}>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <mesh position={[1.2, -0.1, 0]} rotation={[0.3, 0.7, -0.5]}>
          <boxGeometry args={[0.8, 0.04, 0.5]} />
          <meshStandardMaterial
            color="#ffed4e"
            emissive="#ffd700"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      </group>

      {/* Devil Wings */}
      <group ref={devilWingsRef} position={[0, 0.8, -0.2]} scale={0}>
        {/* Left Wing */}
        <mesh position={[-0.7, 0, 0]} rotation={[0.3, -0.4, 0.2]}>
          <coneGeometry args={[0.5, 1.2, 3]} />
          <meshStandardMaterial
            color="#8b0000"
            emissive="#ff0000"
            emissiveIntensity={0.3}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[-0.9, 0.2, 0.2]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.15, 0.4, 3]} />
          <meshStandardMaterial
            color="#660000"
            emissive="#8b0000"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Right Wing */}
        <mesh position={[0.7, 0, 0]} rotation={[0.3, 0.4, -0.2]}>
          <coneGeometry args={[0.5, 1.2, 3]} />
          <meshStandardMaterial
            color="#8b0000"
            emissive="#ff0000"
            emissiveIntensity={0.3}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.9, 0.2, 0.2]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.15, 0.4, 3]} />
          <meshStandardMaterial
            color="#660000"
            emissive="#8b0000"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  )
}

export default Character
