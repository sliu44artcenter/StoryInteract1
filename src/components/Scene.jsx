import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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
 * Uses dynamic rim lights and key lights to convey moral transformations
 */
function Scene({ choice, setChoice }) {
  const { camera, scene } = useThree()
  const sceneRef = useRef()
  const lightRef = useRef() // Main directional/key light
  const ambientRef = useRef()
  const rimLightRef = useRef() // Top-down rim light for angel
  const bottomLightRef = useRef() // Bottom-up spotlight for devil
  const controlsRef = useRef()

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
   * Triggers GSAP animations for:
   * - Background transitions
   * - Dynamic lighting changes (key lights, rim lights, spotlights)
   * - Camera movements (zoom and orbit)
   * - Fog density
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
    let rimLightIntensity
    let bottomLightIntensity
    let fogColor
    let fogDensity

    switch (choiceType) {
      case 'angel':
        backgroundType = 'heaven'
        lightColor = new THREE.Color(0xffd700) // Golden key light
        lightIntensity = 2.5
        rimLightIntensity = 3.0 // Strong top-down rim light
        bottomLightIntensity = 0 // No bottom light
        particleCol = '#ffd700'
        fogColor = new THREE.Color(0xffd700)
        fogDensity = 0.08
        break
      case 'devil':
        backgroundType = 'hell'
        lightColor = new THREE.Color(0x8b0000) // Dark red key light
        lightIntensity = 1.5
        rimLightIntensity = 0 // No top rim light
        bottomLightIntensity = 4.0 // Strong bottom-up spotlight
        particleCol = '#ff4500'
        fogColor = new THREE.Color(0x330000)
        fogDensity = 0.12
        break
      case 'neutral':
        backgroundType = 'default'
        lightColor = new THREE.Color(0xffffff) // Balanced white light
        lightIntensity = 1.5
        rimLightIntensity = 0.5 // Subtle rim light
        bottomLightIntensity = 0
        particleCol = '#cccccc'
        setShowParticles(false)
        fogColor = new THREE.Color(0x4a5568)
        fogDensity = 0.05
        break
      default:
        return
    }

    setParticleColor(particleCol)
    setCurrentBackground(backgroundType)

    // Animate main directional/key light
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

    // Animate rim light (top-down for angel)
    if (rimLightRef.current) {
      gsap.to(rimLightRef.current, {
        intensity: rimLightIntensity,
        duration: 2,
        ease: 'power2.inOut',
      })

      gsap.to(rimLightRef.current.color, {
        r: choiceType === 'angel' ? 1 : 1,
        g: choiceType === 'angel' ? 0.843 : 1,
        b: choiceType === 'angel' ? 0 : 1,
        duration: 2,
        ease: 'power2.inOut',
      })
    }

    // Animate bottom spotlight (for devil)
    if (bottomLightRef.current) {
      gsap.to(bottomLightRef.current, {
        intensity: bottomLightIntensity,
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

    // Animate fog
    if (scene.fog) {
      gsap.to(scene.fog.color, {
        r: fogColor.r,
        g: fogColor.g,
        b: fogColor.b,
        duration: 2.5,
        ease: 'power2.inOut',
      })

      gsap.to(scene.fog, {
        density: fogDensity,
        duration: 2.5,
        ease: 'power2.inOut',
      })
    }

    // Camera animation - zoom in and gentle orbit
    gsap.to(camera.position, {
      z: 6, // Zoom closer
      y: 2.5, // Slightly higher angle
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        // Return to original position after 3 seconds
        gsap.to(camera.position, {
          z: 8,
          y: 2,
          duration: 2,
          ease: 'power2.inOut',
          delay: 1,
        })
      },
    })

    // Animate background opacity for smooth transition
    gsap.to(backgroundOpacity, {
      current: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    })
  }

  /**
   * Initialize fog on mount
   */
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x4a5568, 0.05)
  }, [])

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
      {/* Lighting Setup - Cinematic multi-light rig */}

      {/* Ambient light - Base illumination */}
      <ambientLight ref={ambientRef} intensity={0.5} />

      {/* Main Key Light - Directional light from front-side */}
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

      {/* Rim Light - Top-down light for angelic silhouette */}
      <directionalLight
        ref={rimLightRef}
        position={[0, 15, -2]}
        intensity={0.5}
        color="#ffffff"
        castShadow={false}
      />

      {/* Bottom Spotlight - Upward light for demonic effect */}
      <spotLight
        ref={bottomLightRef}
        position={[0, -2, 2]}
        intensity={0}
        color="#ff0000"
        angle={Math.PI / 3}
        penumbra={0.5}
        distance={10}
        castShadow={false}
      />

      {/* Fill Light - Subtle blue accent from back */}
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4a90e2" />

      {/* Camera Controls - Subtle orbit */}
      <OrbitControls
        ref={controlsRef}
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
