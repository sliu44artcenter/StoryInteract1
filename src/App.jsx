import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

/**
 * Main App Component
 * Sets up the Three.js canvas and manages the global state for moral choices
 */
function App() {
  const [choice, setChoice] = useState(null) // null, 'angel', 'devil', or 'neutral'

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene choice={choice} setChoice={setChoice} />
      </Canvas>
    </div>
  )
}

export default App
