import gsap from 'gsap'

/**
 * GSAP Animation Timelines for Moral Transformations
 *
 * Handles smooth transitions for:
 * - Character trait appearances/disappearances
 * - Camera movements
 * - Environment color changes
 * - Material property animations
 */

/**
 * Animate trait appearance (fade in + scale up)
 */
export const animateTraitAppear = (meshRef, duration = 0.8) => {
  if (!meshRef.current) return

  // Start invisible and small
  gsap.set(meshRef.current, {
    visible: true,
  })
  gsap.set(meshRef.current.scale, { x: 0, y: 0, z: 0 })

  if (meshRef.current.material) {
    meshRef.current.material.transparent = true
    gsap.set(meshRef.current.material, { opacity: 0 })
  }

  // Create timeline for appearance
  const tl = gsap.timeline()

  tl.to(meshRef.current.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: duration,
    ease: 'elastic.out(1, 0.6)',
  })

  if (meshRef.current.material) {
    tl.to(
      meshRef.current.material,
      {
        opacity: 1,
        duration: duration * 0.7,
        ease: 'power2.inOut',
      },
      0
    )
  }

  return tl
}

/**
 * Animate trait disappearance (fade out + dissolve)
 */
export const animateTraitDisappear = (meshRef, duration = 0.6) => {
  if (!meshRef.current) return

  const tl = gsap.timeline({
    onComplete: () => {
      if (meshRef.current) {
        meshRef.current.visible = false
      }
    },
  })

  // Fade and shrink
  if (meshRef.current.material) {
    tl.to(meshRef.current.material, {
      opacity: 0,
      duration: duration * 0.7,
      ease: 'power2.in',
    })
  }

  tl.to(
    meshRef.current.scale,
    {
      x: 0,
      y: 0,
      z: 0,
      duration: duration,
      ease: 'back.in(1.7)',
    },
    0
  )

  return tl
}

/**
 * Animate color transition for materials
 */
export const animateColorTransition = (materialRef, targetColor, duration = 1.0) => {
  if (!materialRef.current) return

  return gsap.to(materialRef.current.color, {
    r: targetColor.r,
    g: targetColor.g,
    b: targetColor.b,
    duration: duration,
    ease: 'power2.inOut',
  })
}

/**
 * Animate emissive glow intensity
 */
export const animateEmissive = (materialRef, targetColor, targetIntensity, duration = 1.2) => {
  if (!materialRef.current) return

  const tl = gsap.timeline()

  tl.to(materialRef.current.emissive, {
    r: targetColor.r,
    g: targetColor.g,
    b: targetColor.b,
    duration: duration,
    ease: 'sine.inOut',
  })

  tl.to(
    materialRef.current,
    {
      emissiveIntensity: targetIntensity,
      duration: duration,
      ease: 'sine.inOut',
    },
    0
  )

  return tl
}

/**
 * Camera reaction to moral choice
 * Subtle tilt and dolly for cinematic effect
 */
export const animateCameraReaction = (cameraRef, direction = 'good') => {
  if (!cameraRef.current) return

  const tl = gsap.timeline()

  // Store current position
  const startPos = {
    x: cameraRef.current.position.x,
    y: cameraRef.current.position.y,
    z: cameraRef.current.position.z,
  }

  // Different reactions based on choice
  if (direction === 'good') {
    // Slight rise and pull back for angelic view
    tl.to(cameraRef.current.position, {
      y: startPos.y + 0.3,
      z: startPos.z + 0.2,
      duration: 1.2,
      ease: 'power2.out',
    }).to(cameraRef.current.position, {
      y: startPos.y,
      z: startPos.z,
      duration: 0.8,
      ease: 'power2.in',
    })
  } else if (direction === 'evil') {
    // Slight lower and push in for menacing view
    tl.to(cameraRef.current.position, {
      y: startPos.y - 0.2,
      z: startPos.z - 0.15,
      duration: 1.0,
      ease: 'power2.out',
    }).to(cameraRef.current.position, {
      y: startPos.y,
      z: startPos.z,
      duration: 0.8,
      ease: 'power2.in',
    })
  } else {
    // Neutral: gentle shake
    tl.to(cameraRef.current.position, {
      x: startPos.x + 0.05,
      duration: 0.1,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 3,
    }).to(cameraRef.current.position, {
      x: startPos.x,
      duration: 0.2,
    })
  }

  return tl
}

/**
 * Icon hover animation
 */
export const animateIconHover = (meshRef, hovering) => {
  if (!meshRef.current) return

  const tl = gsap.timeline()

  if (hovering) {
    tl.to(meshRef.current.scale, {
      x: 1.3,
      y: 1.3,
      z: 1.3,
      duration: 0.3,
      ease: 'back.out(1.7)',
    })
    tl.to(
      meshRef.current.rotation,
      {
        y: meshRef.current.rotation.y + Math.PI * 0.25,
        duration: 0.5,
        ease: 'power2.out',
      },
      0
    )
  } else {
    tl.to(meshRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    })
  }

  return tl
}

/**
 * Icon idle floating animation
 */
export const animateIconFloat = (meshRef, offset = 0) => {
  if (!meshRef.current) return

  const startY = meshRef.current.position.y

  gsap.to(meshRef.current.position, {
    y: startY + 0.15,
    duration: 2 + offset * 0.3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })

  gsap.to(meshRef.current.rotation, {
    y: meshRef.current.rotation.y + Math.PI * 2,
    duration: 8 + offset,
    ease: 'none',
    repeat: -1,
  })
}

/**
 * Pulse glow effect for icons
 */
export const animateIconGlow = (materialRef) => {
  if (!materialRef.current) return

  gsap.to(materialRef.current, {
    emissiveIntensity: 1.5,
    duration: 1.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

/**
 * Ground ripple effect for neutral choice
 */
export const animateGroundRipple = (meshRef) => {
  if (!meshRef.current) return

  const tl = gsap.timeline()

  tl.to(meshRef.current.scale, {
    x: 1.5,
    z: 1.5,
    duration: 0.6,
    ease: 'power2.out',
  }).to(meshRef.current.scale, {
    x: 1,
    z: 1,
    duration: 0.4,
    ease: 'power2.in',
  })

  return tl
}
