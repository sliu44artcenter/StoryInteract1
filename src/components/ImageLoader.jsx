import React from 'react'
import { useTexture } from '@react-three/drei'

/**
 * Example: Using Images as Textures in Three.js
 */
function TexturedPlane() {
  // Method 1: Load from public folder
  const texturePublic = useTexture('/StoryInteract1/images/texture.jpg')

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={texturePublic} />
    </mesh>
  )
}

/**
 * Example: Using imported images
 */
import myImage from '../assets/images/background.jpg'

function ImageInHTML() {
  return (
    <div style={{
      backgroundImage: `url(${myImage})`,
      width: '100%',
      height: '100vh'
    }}>
      {/* Your content */}
    </div>
  )
}

/**
 * Example: Regular img tag with public assets
 */
function SimpleImage() {
  return (
    <img
      src="/StoryInteract1/images/logo.png"
      alt="Logo"
      style={{ width: 100, height: 100 }}
    />
  )
}

export { TexturedPlane, ImageInHTML, SimpleImage }
