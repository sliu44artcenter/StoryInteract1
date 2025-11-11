import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

/**
 * HaloIcon Component
 * Represents the "good deeds" choice with a golden halo
 * Floats and glows on hover
 */
function HaloIcon({ position, onClick }) {
  const groupRef = useRef()
  const haloRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  // Hover effect
  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (haloRef.current) {
      gsap.to(haloRef.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
    if (haloRef.current) {
      gsap.to(haloRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleClick = () => {
    // Pulse effect on click
    gsap.fromTo(
      haloRef.current.scale,
      { x: 1.3, y: 1.3, z: 1.3 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      }
    )
    onClick()
  }

  return (
    <group ref={groupRef} position={position}>
      <group
        ref={haloRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Outer Halo Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={hovered ? 2 : 1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Halo Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#ffed4e"
            emissive="#ffed4e"
            emissiveIntensity={hovered ? 2.5 : 1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Center Glow */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.25, 32]} />
          <meshBasicMaterial
            color="#fffacd"
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </mesh>

        {/* Light rays */}
        <pointLight
          color="#ffd700"
          intensity={hovered ? 3 : 1.5}
          distance={5}
        />
      </group>
    </group>
  )
}

export default HaloIcon
