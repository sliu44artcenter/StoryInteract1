import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap'
import * as THREE from 'three'

import Character from './Character'
import HaloIcon from './HaloIcon'
import FlameIcon from './FlameIcon'
import ScaleIcon from './ScaleIcon'
import Particles from './Particles'

/**
 * Main Scene Component
 * Orchestrates the entire 3D narrative experience
 * Manages lighting, camera, character, icons, and environmental transitions
 */
function Scene({ choice, setChoice }) {
  const sceneRef = useRef()
  const lightRef = useRef()
  const ambientRef = useRef()
  const bgColorRef = useRef(new THREE.Color(0x1a1a2e))

  const [showParticles, setShowParticles] = useState(false)
  const [particleColor, setParticleColor] = useState('#ffd700')

  /**
   * Handle icon click events
   * Triggers GSAP animations for background transitions and lighting changes
   */
  const handleChoice = (choiceType) => {
    if (choice === choiceType) return // Prevent re-clicking the same choice

    setChoice(choiceType)
    setShowParticles(true)

    // Background color transitions based on choice
    let targetColor
    let lightColor
    let lightIntensity
    let particleCol

    switch (choiceType) {
      case 'angel':
        targetColor = new THREE.Color(0xfff4e6) // Warm golden
        lightColor = new THREE.Color(0xffd700) // Golden light
        lightIntensity = 2.5
        particleCol = '#ffd700'
        break
      case 'devil':
        targetColor = new THREE.Color(0x2d0a0a) // Deep red
        lightColor = new THREE.Color(0xff0000) // Red light
        lightIntensity = 2.0
        particleCol = '#ff4500'
        break
      case 'neutral':
        targetColor = new THREE.Color(0x1a1a2e) // Original dark blue-gray
        lightColor = new THREE.Color(0xffffff) // White light
        lightIntensity = 1.5
        particleCol = '#cccccc'
        setShowParticles(false)
        break
      default:
        return
    }

    setParticleColor(particleCol)

    // Animate background color transition
    gsap.to(bgColorRef.current, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 2.5,
      ease: 'power2.inOut',
    })

    // Animate directional light color and intensity
    if (lightRef.current) {
      gsap.to(lightRef.current.color, {
        r: lightColor.r,
        g: lightColor.g,
        b: lightColor.b,
        duration: 2,
        ease: 'power2.inOut',
      })

      gsap.to(lightRef.current, {
        intensity: lightIntensity,
        duration: 2,
        ease: 'power2.inOut',
      })
    }

    // Animate ambient light
    if (ambientRef.current) {
      gsap.to(ambientRef.current, {
        intensity: choiceType === 'angel' ? 0.8 : choiceType === 'devil' ? 0.3 : 0.5,
        duration: 2,
        ease: 'power2.inOut',
      })
    }
  }

  /**
   * Update scene background color every frame
   */
  useFrame(({ scene }) => {
    scene.background = bgColorRef.current
  })

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4a90e2" />

      {/* Camera Controls - Subtle orbit */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Environment and Atmospheric Effects */}
      <Environment preset="sunset" />
      <fog attach="fog" args={[bgColorRef.current, 10, 50]} />

      {/* Ground Plane with Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Main Character */}
      <Character choice={choice} />

      {/* Three Floating Icons */}
      <HaloIcon position={[-3, 2, 0]} onClick={() => handleChoice('angel')} />
      <FlameIcon position={[3, 2, 0]} onClick={() => handleChoice('devil')} />
      <ScaleIcon position={[0, 3.5, -2]} onClick={() => handleChoice('neutral')} />

      {/* Particle Effects */}
      {showParticles && <Particles color={particleColor} choice={choice} />}

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={choice === 'angel' ? 1.5 : choice === 'devil' ? 0.8 : 0.3}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <Vignette offset={0.5} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

export default Scene
