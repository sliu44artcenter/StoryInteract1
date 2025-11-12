import React from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

/**
 * Main App Component
 *
 * Sets up the Three.js canvas for the 3D moral choice narrative
 * The entire story is told visually through color, motion, and light
 */
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        shadows
        camera={{
          position: [0, 2, 8],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
