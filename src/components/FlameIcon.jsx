import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

/**
 * FlameIcon Component
 * Represents the "evil deeds" choice with a dark red flame
 * Flickers and intensifies on hover
 */
function FlameIcon({ position, onClick }) {
  const groupRef = useRef()
  const flameRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Floating and flickering animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.15
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  // Hover effect
  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (flameRef.current) {
      gsap.to(flameRef.current.scale, {
        x: 1.4,
        y: 1.4,
        z: 1.4,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
    if (flameRef.current) {
      gsap.to(flameRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleClick = () => {
    // Burst effect on click
    gsap.fromTo(
      flameRef.current.scale,
      { x: 1.5, y: 1.5, z: 1.5 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      }
    )
    onClick()
  }

  return (
    <group ref={groupRef} position={position}>
      <group
        ref={flameRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Main Flame Body */}
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.4, 1, 32]} />
          <meshStandardMaterial
            color="#dc143c"
            emissive="#dc143c"
            emissiveIntensity={hovered ? 2 : 1}
            roughness={0.3}
          />
        </mesh>

        {/* Inner Flame */}
        <mesh position={[0, 0.1, 0]} scale={0.7}>
          <coneGeometry args={[0.35, 0.8, 32]} />
          <meshStandardMaterial
            color="#ff4500"
            emissive="#ff4500"
            emissiveIntensity={hovered ? 2.5 : 1.5}
            roughness={0.2}
          />
        </mesh>

        {/* Core */}
        <mesh position={[0, 0.2, 0]} scale={0.4}>
          <coneGeometry args={[0.3, 0.6, 32]} />
          <meshStandardMaterial
            color="#ff6347"
            emissive="#ff6347"
            emissiveIntensity={hovered ? 3 : 2}
            roughness={0.1}
          />
        </mesh>

        {/* Flame tip particles */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color="#ffff00"
            transparent
            opacity={hovered ? 0.8 : 0.5}
          />
        </mesh>

        {/* Ominous glow */}
        <pointLight
          color="#ff0000"
          intensity={hovered ? 4 : 2}
          distance={5}
        />
      </group>
    </group>
  )
}

export default FlameIcon
