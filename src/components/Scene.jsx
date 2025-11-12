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

  const [showParticles, setShowParticles] = useState(false)
  const [particleColor, setParticleColor] = useState('#ffd700')

  // Background textures
  const [backgroundTextures, setBackgroundTextures] = useState({
    heaven: null,
    hell: null,
    default: new THREE.Color(0x1a1a2e)
  })
  const [currentBackground, setCurrentBackground] = useState('default')
  const backgroundOpacity = useRef(0)

  /**
   * Load background images
   */
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    // Load Heaven background
    textureLoader.load('/StoryInteract1/images/Heaven.jpeg', (texture) => {
      setBackgroundTextures((prev) => ({ ...prev, heaven: texture }))
    })

    // Load Hell background
    textureLoader.load('/StoryInteract1/images/hell.jpg', (texture) => {
      setBackgroundTextures((prev) => ({ ...prev, hell: texture }))
    })
  }, [])

  /**
   * Handle icon click events
   * Triggers GSAP animations for background transitions and lighting changes
   */
  const handleChoice = (choiceType) => {
    if (choice === choiceType) return // Prevent re-clicking the same choice

    setChoice(choiceType)
    setShowParticles(true)

    // Background transitions based on choice
    let lightColor
    let lightIntensity
    let particleCol
    let backgroundType

    switch (choiceType) {
      case 'angel':
        backgroundType = 'heaven'
        lightColor = new THREE.Color(0xffd700) // Golden light
        lightIntensity = 2.5
        particleCol = '#ffd700'
        break
      case 'devil':
        backgroundType = 'hell'
        lightColor = new THREE.Color(0xff0000) // Red light
        lightIntensity = 2.0
        particleCol = '#ff4500'
        break
      case 'neutral':
        backgroundType = 'default'
        lightColor = new THREE.Color(0xffffff) // White light
        lightIntensity = 1.5
        particleCol = '#cccccc'
        setShowParticles(false)
        break
      default:
        return
    }

    setParticleColor(particleCol)
    setCurrentBackground(backgroundType)

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

    // Animate background opacity for smooth transition
    gsap.to(backgroundOpacity, {
      current: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    })
  }

  /**
   * Update scene background every frame
   * Switches between textures and default color based on current choice
   */
  useFrame(({ scene }) => {
    if (currentBackground === 'heaven' && backgroundTextures.heaven) {
      scene.background = backgroundTextures.heaven
    } else if (currentBackground === 'hell' && backgroundTextures.hell) {
      scene.background = backgroundTextures.hell
    } else {
      scene.background = backgroundTextures.default
    }
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
