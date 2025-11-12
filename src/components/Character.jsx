import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

/**
 * Character Component
 * Represents a refined humanoid figure with realistic proportions
 * Dynamically grows smooth, curved angel or devil wings based on user choice
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
   * Create smooth angel wing geometry using curves
   */
  const createAngelWingGeometry = () => {
    const shape = new THREE.Shape()

    // Create a feather-like wing shape with smooth curves
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.3, 0.2, 0.6, 0.5, 1, 0.8)
    shape.bezierCurveTo(1.3, 1, 1.5, 1.1, 1.6, 1.2)
    shape.bezierCurveTo(1.5, 1.3, 1.3, 1.35, 1, 1.3)
    shape.bezierCurveTo(0.7, 1.2, 0.4, 0.9, 0.2, 0.6)
    shape.bezierCurveTo(0.1, 0.4, 0.05, 0.2, 0, 0)

    const extrudeSettings = {
      steps: 2,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  /**
   * Create smooth devil wing geometry (bat-like)
   */
  const createDevilWingGeometry = () => {
    const shape = new THREE.Shape()

    // Create a bat wing shape with smooth curves and points
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.2, 0.3, 0.4, 0.6, 0.7, 0.9)
    shape.lineTo(0.9, 1.1)
    shape.bezierCurveTo(1.1, 1.2, 1.3, 1.15, 1.4, 1.0)
    shape.lineTo(1.2, 0.8)
    shape.bezierCurveTo(1.3, 0.7, 1.35, 0.5, 1.3, 0.3)
    shape.lineTo(1.0, 0.4)
    shape.bezierCurveTo(0.8, 0.2, 0.5, 0.05, 0.2, -0.1)
    shape.bezierCurveTo(0.1, -0.05, 0.05, 0, 0, 0)

    const extrudeSettings = {
      steps: 2,
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  const angelWingGeometry = useMemo(() => createAngelWingGeometry(), [])
  const devilWingGeometry = useMemo(() => createDevilWingGeometry(), [])

  /**
   * Trigger wing growth animations when choice changes
   */
  useEffect(() => {
    if (!choice) return

    if (choice === 'angel' && angelWingsRef.current) {
      // Grow angel wings with elegant animation
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
      // Grow devil wings with menacing animation
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
      {/* Head with more detail */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
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
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
      </mesh>

      {/* Torso - More anatomical shape */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.6, 4, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.6} />
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

      {/* Arms - Upper and Lower */}
      {/* Left Arm */}
      <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
      </mesh>
      <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.35, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
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

      {/* Legs - Upper and Lower */}
      {/* Left Leg */}
      <mesh position={[-0.15, -0.1, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.45, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>
      <mesh position={[-0.15, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.4, 4, 12]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} />
      </mesh>

      {/* Right Leg */}
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

      {/* Angel Wings - Smooth and Feathered */}
      <group ref={angelWingsRef} position={[0, 0.8, -0.25]} scale={0}>
        {/* Left Wing - Spreads to the left and backward */}
        <group position={[-0.2, 0, -0.05]} rotation={[0.1, Math.PI * 0.7, 0.2]}>
          <mesh geometry={angelWingGeometry}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffd700"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[-0.1, -0.2, 0]} rotation={[0, 0, -0.2]} geometry={angelWingGeometry} scale={0.8}>
            <meshStandardMaterial
              color="#ffed4e"
              emissive="#ffd700"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[-0.15, -0.4, 0]} rotation={[0, 0, -0.3]} geometry={angelWingGeometry} scale={0.65}>
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Right Wing - Spreads to the right and backward */}
        <group position={[0.2, 0, -0.05]} rotation={[0.1, -Math.PI * 0.7, -0.2]}>
          <mesh geometry={angelWingGeometry}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffd700"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0.1, -0.2, 0]} rotation={[0, 0, 0.2]} geometry={angelWingGeometry} scale={0.8}>
            <meshStandardMaterial
              color="#ffed4e"
              emissive="#ffd700"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0.15, -0.4, 0]} rotation={[0, 0, 0.3]} geometry={angelWingGeometry} scale={0.65}>
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {/* Devil Wings - Smooth Bat Wings */}
      <group ref={devilWingsRef} position={[0, 0.8, -0.25]} scale={0}>
        {/* Left Wing - Spreads to the left and backward */}
        <group position={[-0.2, 0, -0.05]} rotation={[0.3, Math.PI * 0.65, 0.3]}>
          <mesh geometry={devilWingGeometry}>
            <meshStandardMaterial
              color="#4a0000"
              emissive="#ff0000"
              emissiveIntensity={0.3}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Wing membrane with darker color */}
          <mesh position={[-0.2, 0.3, 0]} geometry={devilWingGeometry} scale={0.7}>
            <meshStandardMaterial
              color="#8b0000"
              emissive="#cc0000"
              emissiveIntensity={0.2}
              roughness={0.8}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Wing bones/spikes */}
          <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.08, 0.3, 8]} />
            <meshStandardMaterial color="#2d0000" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>

        {/* Right Wing - Spreads to the right and backward */}
        <group position={[0.2, 0, -0.05]} rotation={[0.3, -Math.PI * 0.65, -0.3]}>
          <mesh geometry={devilWingGeometry}>
            <meshStandardMaterial
              color="#4a0000"
              emissive="#ff0000"
              emissiveIntensity={0.3}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Wing membrane */}
          <mesh position={[0.2, 0.3, 0]} geometry={devilWingGeometry} scale={0.7}>
            <meshStandardMaterial
              color="#8b0000"
              emissive="#cc0000"
              emissiveIntensity={0.2}
              roughness={0.8}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Wing bones/spikes */}
          <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.08, 0.3, 8]} />
            <meshStandardMaterial color="#2d0000" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

export default Character
