import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

/**
 * ScaleIcon Component
 * Represents the "neutral" choice with a gray balance scale
 * Subtly balances and glows on hover
 */
function ScaleIcon({ position, onClick }) {
  const groupRef = useRef()
  const scaleRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
    }
    if (scaleRef.current) {
      // Subtle balancing motion
      scaleRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  // Hover effect
  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (scaleRef.current) {
      gsap.to(scaleRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
    if (scaleRef.current) {
      gsap.to(scaleRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleClick = () => {
    // Balance tilt effect on click
    gsap.to(scaleRef.current.rotation, {
      z: 0.3,
      duration: 0.2,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
    })
    onClick()
  }

  return (
    <group ref={groupRef} position={position}>
      <group
        ref={scaleRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Central Post */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial
            color="#708090"
            emissive="#a9a9a9"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Horizontal Beam */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.06, 0.06]} />
          <meshStandardMaterial
            color="#708090"
            emissive="#a9a9a9"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Left Scale Pan */}
        <group position={[-0.5, 0.35, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.2, 0.15, 0.05, 16]} />
            <meshStandardMaterial
              color="#a9a9a9"
              emissive="#d3d3d3"
              emissiveIntensity={hovered ? 0.6 : 0.3}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </group>

        {/* Right Scale Pan */}
        <group position={[0.5, 0.35, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.2, 0.15, 0.05, 16]} />
            <meshStandardMaterial
              color="#a9a9a9"
              emissive="#d3d3d3"
              emissiveIntensity={hovered ? 0.6 : 0.3}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </group>

        {/* Base */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.1, 16]} />
          <meshStandardMaterial
            color="#696969"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Subtle neutral glow */}
        <pointLight
          color="#cccccc"
          intensity={hovered ? 2 : 0.8}
          distance={4}
        />
      </group>
    </group>
  )
}

export default ScaleIcon
