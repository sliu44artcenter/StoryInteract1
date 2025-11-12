import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap'
import * as THREE from 'three'

import Character from './Character'
import Icons from './Icons'
import { useMoralState } from '../utils/useMoralState'
import { animateCameraReaction } from './Transitions'

/**
 * Main Scene Component
 *
 * Orchestrates the entire 3D moral narrative experience:
 * - Dynamic lighting based on moral state
 * - Background color transitions
 * - Post-processing effects (bloom for angelic, vignette for demonic)
 * - Particle effects for visual feedback
 * - Camera reactions to choices
 */
function Scene() {
  // Zustand moral state
  const { environment, particleEffect, clearParticleEffect, moralLevel } = useMoralState()

  // Refs for animated elements
  const directionalLightRef = useRef()
  const ambientLightRef = useRef()
  const pointLightRef = useRef()
  const groundRef = useRef()

  // Three.js scene access
  const { scene, camera } = useThree()
  const cameraRef = useRef(camera)

  // Background textures for final stages
  const heavenTextureRef = useRef(null)
  const hellTextureRef = useRef(null)

  /**
   * Load background images
   */
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    // Load Heaven background for +3 stage
    textureLoader.load('/StoryInteract1/images/Heaven.jpeg', (texture) => {
      heavenTextureRef.current = texture
    })

    // Load Hell background for -3 stage
    textureLoader.load('/StoryInteract1/images/hell.jpg', (texture) => {
      hellTextureRef.current = texture
    })
  }, [])

  /**
   * Animate environment changes
   */
  useEffect(() => {
    // Background transition based on moral level
    if (moralLevel === 3 && heavenTextureRef.current) {
      // Final angelic stage - use Heaven image
      scene.background = heavenTextureRef.current
    } else if (moralLevel === -3 && hellTextureRef.current) {
      // Final demonic stage - use Hell image
      scene.background = hellTextureRef.current
    } else {
      // Intermediate stages - use color gradients
      if (scene.background instanceof THREE.Color) {
        gsap.to(scene.background, {
          r: new THREE.Color(environment.backgroundColor).r,
          g: new THREE.Color(environment.backgroundColor).g,
          b: new THREE.Color(environment.backgroundColor).b,
          duration: 1.5,
          ease: 'power2.inOut',
        })
      } else {
        scene.background = new THREE.Color(environment.backgroundColor)
      }
    }

    // Ambient light transition
    if (ambientLightRef.current) {
      gsap.to(ambientLightRef.current, {
        intensity: environment.ambientIntensity,
        duration: 1.2,
        ease: 'power2.inOut',
      })
    }

    // Directional light color transition
    if (directionalLightRef.current) {
      gsap.to(directionalLightRef.current.color, {
        r: new THREE.Color(environment.lightColor).r,
        g: new THREE.Color(environment.lightColor).g,
        b: new THREE.Color(environment.lightColor).b,
        duration: 1.5,
        ease: 'power2.inOut',
      })
    }

    // Point light color transition (bottom fill light)
    if (pointLightRef.current) {
      const pointColor =
        moralLevel > 0
          ? new THREE.Color('#fff5e1')
          : moralLevel < 0
          ? new THREE.Color('#4a0000')
          : new THREE.Color('#ffffff')

      gsap.to(pointLightRef.current.color, {
        r: pointColor.r,
        g: pointColor.g,
        b: pointColor.b,
        duration: 1.5,
        ease: 'power2.inOut',
      })
    }
  }, [environment, scene, moralLevel])

  /**
   * Trigger particle effects and camera reactions
   */
  useEffect(() => {
    if (!particleEffect) return

    // Camera reaction based on choice
    if (particleEffect === 'gold') {
      animateCameraReaction(cameraRef, 'good')
    } else if (particleEffect === 'red') {
      animateCameraReaction(cameraRef, 'evil')
    } else if (particleEffect === 'ripple') {
      animateCameraReaction(cameraRef, 'neutral')
      // Trigger ground ripple
      if (groundRef.current) {
        gsap.to(groundRef.current.scale, {
          x: 1.3,
          z: 1.3,
          duration: 0.4,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        })
      }
    }

    // Clear particle effect after brief delay
    const timeout = setTimeout(() => {
      clearParticleEffect()
    }, 2000)

    return () => clearTimeout(timeout)
  }, [particleEffect, clearParticleEffect])

  return (
    <>
      {/* ========== LIGHTING SETUP ========== */}

      {/* Ambient Light - General scene illumination */}
      <ambientLight ref={ambientLightRef} intensity={environment.ambientIntensity} />

      {/* Directional Light - Main light source with shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 8, 3]}
        intensity={1.8}
        color={environment.lightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Point Light - Bottom fill light for dramatic effect */}
      <pointLight
        ref={pointLightRef}
        position={[0, -2, 2]}
        intensity={0.6}
        distance={10}
        decay={2}
      />

      {/* Rim Light - Back lighting for silhouette */}
      <pointLight position={[0, 3, -4]} intensity={0.5} color="#a8b2bb" distance={8} decay={2} />

      {/* ========== CAMERA CONTROLS ========== */}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />

      {/* ========== ENVIRONMENT ========== */}

      {/* Atmospheric fog */}
      <fog attach="fog" args={[environment.backgroundColor, 8, 20]} />

      {/* Ground plane with contact shadows */}
      <group ref={groundRef}>
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={12}
          blur={2.5}
          far={4}
          resolution={256}
          color="#000000"
        />
      </group>

      {/* Subtle ground plane for visual reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ========== MAIN SCENE ELEMENTS ========== */}

      {/* Central Character */}
      <Character />

      {/* Interactive Moral Choice Icons */}
      <Icons />

      {/* ========== PARTICLE EFFECTS ========== */}

      {particleEffect === 'gold' && <GoldenParticles />}
      {particleEffect === 'red' && <RedEmbers />}

      {/* ========== POST-PROCESSING EFFECTS ========== */}

      <EffectComposer>
        {/* Bloom - Enhanced for angelic state */}
        <Bloom
          intensity={moralLevel > 0 ? 0.3 + moralLevel * 0.15 : 0.2}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          height={300}
        />

        {/* Vignette - Enhanced for demonic state */}
        <Vignette
          offset={moralLevel < 0 ? 0.3 : 0.5}
          darkness={moralLevel < 0 ? 0.6 + Math.abs(moralLevel) * 0.1 : 0.4}
        />
      </EffectComposer>
    </>
  )
}

/**
 * Golden Particle Effect for Good Choices
 * Floating golden dust particles
 */
function GoldenParticles() {
  const particlesRef = useRef()
  const particleCount = 100

  // Create particle positions
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4
      pos[i * 3 + 1] = Math.random() * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.01
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = 0
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffd700"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Red Ember Effect for Evil Choices
 * Rising red embers with flicker
 */
function RedEmbers() {
  const particlesRef = useRef()
  const particleCount = 80

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3
      pos[i * 3 + 1] = Math.random() * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.015
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002
        if (positions[i * 3 + 1] > 3) {
          positions[i * 3 + 1] = 0
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ff3300"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Scene
