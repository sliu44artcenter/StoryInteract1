import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Particles Component
 * Creates ambient floating particles that appear during moral choice transformations
 * Particles drift upward and fade, creating a magical atmosphere
 */
function Particles({ color, choice }) {
  const particlesRef = useRef()
  const particleCount = choice === 'neutral' ? 50 : 200

  // Generate random particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Random positions in a sphere around the character
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      // Random velocities for upward drift
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = Math.random() * 0.05 + 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, velocities }
  }, [particleCount, choice])

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array

    for (let i = 0; i < particleCount; i++) {
      // Update position based on velocity
      positions[i * 3] += particlePositions.velocities[i * 3]
      positions[i * 3 + 1] += particlePositions.velocities[i * 3 + 1]
      positions[i * 3 + 2] += particlePositions.velocities[i * 3 + 2]

      // Reset particles that drift too high
      if (positions[i * 3 + 1] > 5) {
        positions[i * 3] = (Math.random() - 0.5) * 6
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      }

      // Add slight swirl motion
      const angle = state.clock.elapsedTime * 0.5 + i * 0.01
      positions[i * 3] += Math.sin(angle) * 0.005
      positions[i * 3 + 2] += Math.cos(angle) * 0.005
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={choice === 'angel' ? 0.08 : choice === 'devil' ? 0.06 : 0.04}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default Particles
