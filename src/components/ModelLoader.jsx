import React from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Example: Loading a 3D Model from public folder
 * Place your .glb or .gltf file in /public/models/
 */
function ModelFromPublic() {
  // Load model from public folder using URL path
  const { scene } = useGLTF('/StoryInteract1/models/character.glb')

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  )
}

/**
 * Example: Loading a 3D Model from src/assets
 * Import the model directly (Vite will process it)
 */
function ModelFromAssets() {
  // Import from src/assets/models/
  const { scene } = useGLTF('/src/assets/models/character.glb')

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  )
}

// Preload models for better performance
useGLTF.preload('/StoryInteract1/models/character.glb')

export { ModelFromPublic, ModelFromAssets }
