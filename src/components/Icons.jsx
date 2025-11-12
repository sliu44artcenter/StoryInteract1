import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMoralState } from '../utils/useMoralState'
import { animateIconHover, animateIconFloat, animateIconGlow } from './Transitions'

/**
 * Interactive Icons Component
 *
 * Three floating 3D icons that represent moral choices:
 * 🌸 Flower (Good) - White/Gold with petals
 * 🪨 Stone (Neutral) - Gray geometric shape
 * 🔪 Knife (Evil) - Red/Black sharp blade
 *
 * Each icon orbits gently, responds to hover, and triggers moral changes on click
 */
function Icons() {
  const chooseGood = useMoralState((state) => state.chooseGood)
  const chooseEvil = useMoralState((state) => state.chooseEvil)
  const chooseNeutral = useMoralState((state) => state.chooseNeutral)

  return (
    <group position={[0, -0.8, 3]}>
      {/* Flower Icon - Good Choice */}
      <FlowerIcon position={[-2, 0, 0]} onClick={chooseGood} />

      {/* Stone Icon - Neutral Choice */}
      <StoneIcon position={[0, 0, 0]} onClick={chooseNeutral} />

      {/* Knife Icon - Evil Choice */}
      <KnifeIcon position={[2, 0, 0]} onClick={chooseEvil} />
    </group>
  )
}

/**
 * Flower Icon - Represents Good Choices
 */
function FlowerIcon({ position, onClick }) {
  const groupRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (groupRef.current) {
      animateIconFloat(groupRef, 0)
    }
    if (materialRef.current) {
      animateIconGlow(materialRef)
    }
  }, [])

  useEffect(() => {
    animateIconHover(groupRef, hovered)
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Gentle rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Flower center */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ffd700"
          emissive="#fff9e6"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Flower petals (5 petals arranged in circle) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        const x = Math.cos(angle) * 0.25
        const z = Math.sin(angle) * 0.25
        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          >
            <sphereGeometry args={[0.12, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#fff5e1"
              emissiveIntensity={0.4}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        )
      })}

      {/* Stem */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#6b8e23" roughness={0.6} />
      </mesh>
    </group>
  )
}

/**
 * Stone Icon - Represents Neutral Choices
 */
function StoneIcon({ position, onClick }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (groupRef.current) {
      animateIconFloat(groupRef, 1)
    }
  }, [])

  useEffect(() => {
    animateIconHover(groupRef, hovered)
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Gentle rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.15
    }
  })

  return (
    <mesh
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#808080"
        emissive="#4a4a4a"
        emissiveIntensity={0.2}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

/**
 * Knife Icon - Represents Evil Choices
 */
function KnifeIcon({ position, onClick }) {
  const groupRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (groupRef.current) {
      animateIconFloat(groupRef, 2)
    }
    if (materialRef.current) {
      animateIconGlow(materialRef)
    }
  }, [])

  useEffect(() => {
    animateIconHover(groupRef, hovered)
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Gentle rotation with ominous feel
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.2
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, 0, Math.PI / 4]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Blade */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#c0c0c0"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Blade tip */}
      <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.12, 0.02]} />
        <meshStandardMaterial
          color="#c0c0c0"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.1, 0.25, 0.08]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#2d0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Guard */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.25, 0.03, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  )
}

export default Icons
