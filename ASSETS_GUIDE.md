# 📦 Assets Guide - Images & 3D Models

Complete guide for adding and using images and 3D models in your project.

## 📁 Folder Structure

```
StoryInteract1/
├── src/assets/
│   ├── images/          # Small images, imported in code
│   └── models/          # Small 3D models, imported in code
└── public/
    ├── images/          # Large images, accessed by URL
    └── models/          # Large 3D models, accessed by URL
```

## 🎯 When to Use Each Location

### Use `src/assets/` for:
- ✅ Small files (< 100KB)
- ✅ Assets imported in your code
- ✅ Assets that need optimization
- ✅ Images used as CSS backgrounds

### Use `public/` for:
- ✅ Large 3D models (.glb, .gltf files)
- ✅ High-resolution images
- ✅ Files accessed via direct URLs
- ✅ Files that shouldn't be processed

---

## 📤 How to Add Files

### Method 1: Command Line
```bash
# Add a 3D model
cp /path/to/your/model.glb public/models/

# Add an image
cp /path/to/your/image.jpg public/images/
```

### Method 2: File Manager
Drag and drop files into the appropriate folders.

### Method 3: Download from URL
```bash
# Download a model from the internet
curl -o public/models/robot.glb https://example.com/robot.glb

# Download an image
curl -o public/images/texture.jpg https://example.com/texture.jpg
```

---

## 💻 How to Use in Code

### 🎨 Loading 3D Models

#### Option 1: From `public/` folder (Recommended for large models)
```jsx
import { useGLTF } from '@react-three/drei'

function MyModel() {
  const { scene } = useGLTF('/StoryInteract1/models/character.glb')

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

// Preload for better performance
useGLTF.preload('/StoryInteract1/models/character.glb')
```

#### Option 2: With animations
```jsx
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

function AnimatedModel() {
  const group = useRef()
  const { scene, animations } = useGLTF('/StoryInteract1/models/character.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play first animation
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play()
    }
  }, [actions])

  return <primitive ref={group} object={scene} />
}
```

### 🖼️ Loading Images

#### As Texture in Three.js
```jsx
import { useTexture } from '@react-three/drei'

function TexturedMesh() {
  const texture = useTexture('/StoryInteract1/images/wood.jpg')

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
```

#### As Background Image (CSS)
```jsx
function BackgroundImage() {
  return (
    <div style={{
      backgroundImage: 'url(/StoryInteract1/images/background.jpg)',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh'
    }}>
      {/* Content */}
    </div>
  )
}
```

#### As Regular Image
```jsx
function MyImage() {
  return (
    <img
      src="/StoryInteract1/images/logo.png"
      alt="Logo"
      width={200}
    />
  )
}
```

#### Imported from src/assets
```jsx
import myImage from './assets/images/icon.png'

function ImportedImage() {
  return <img src={myImage} alt="Icon" />
}
```

---

## 🎬 Supported File Formats

### 3D Models
- ✅ `.glb` (recommended) - Binary GLTF
- ✅ `.gltf` - GLTF with separate textures
- ✅ `.fbx` - Requires additional loader
- ✅ `.obj` - Requires additional loader

### Images
- ✅ `.jpg` / `.jpeg` - Photographs
- ✅ `.png` - Images with transparency
- ✅ `.svg` - Vector graphics
- ✅ `.webp` - Modern format, smaller size
- ✅ `.gif` - Animated images

---

## 🚀 Step-by-Step: Add a New 3D Model

### 1. Add the file
```bash
# Place your model in public/models/
cp ~/Downloads/robot.glb public/models/
```

### 2. Create a component
```jsx
// src/components/Robot.jsx
import { useGLTF } from '@react-three/drei'

function Robot({ position = [0, 0, 0] }) {
  const { scene } = useGLTF('/StoryInteract1/models/robot.glb')

  return (
    <primitive
      object={scene}
      position={position}
      scale={1}
    />
  )
}

useGLTF.preload('/StoryInteract1/models/robot.glb')
export default Robot
```

### 3. Use in your scene
```jsx
// src/components/Scene.jsx
import Robot from './Robot'

function Scene() {
  return (
    <>
      <Robot position={[2, 0, 0]} />
      {/* Other components */}
    </>
  )
}
```

### 4. Commit to GitHub
```bash
git add public/models/robot.glb
git add src/components/Robot.jsx
git commit -m "Add robot 3D model and component"
git push
```

---

## 🎨 Free 3D Model Resources

- **Sketchfab**: https://sketchfab.com/features/gltf (many free models)
- **Poly Pizza**: https://poly.pizza/ (free low-poly models)
- **Kenney**: https://kenney.nl/assets (free game assets)
- **Three.js Examples**: https://github.com/mrdoob/three.js/tree/dev/examples/models

---

## 🖼️ Free Image Resources

- **Unsplash**: https://unsplash.com/ (free photos)
- **Pexels**: https://pexels.com/ (free photos & videos)
- **Pixabay**: https://pixabay.com/ (free images)
- **SVG Repo**: https://svgrepo.com/ (free SVG icons)

---

## 📋 Commit to GitHub

After adding assets:

```bash
# Check what files you added
git status

# Add your files
git add public/models/
git add public/images/
git add src/assets/

# Commit with descriptive message
git commit -m "Add 3D models and texture images"

# Push to your branch
git push
```

---

## ⚡ Performance Tips

### Optimize 3D Models
- Use `.glb` format (compressed)
- Keep poly count low (< 50k triangles for web)
- Use texture atlases instead of multiple textures
- Use Draco compression for smaller files

### Optimize Images
- Compress images before uploading
- Use `.webp` format for smaller size
- Resize images to actual display size
- Use lazy loading for off-screen images

### Code Optimization
```jsx
// Preload models before they're needed
useGLTF.preload('/StoryInteract1/models/character.glb')

// Share geometries and materials
const geometry = useMemo(() => new BoxGeometry(), [])
const material = useMemo(() => new MeshStandardMaterial(), [])
```

---

## 🐛 Troubleshooting

### Model not loading?
- ✅ Check file path is correct
- ✅ Ensure file is in `public/` folder
- ✅ Check browser console for errors
- ✅ Verify model is valid `.glb` format

### Image not showing?
- ✅ Check file path includes `/StoryInteract1/` base
- ✅ Verify file extension is correct
- ✅ Check image file isn't corrupted
- ✅ Look for 404 errors in browser console

### Build fails?
- ✅ Large files should be in `public/` not `src/assets/`
- ✅ Check for special characters in filenames
- ✅ Ensure `.gitignore` isn't blocking files

---

## 📝 Example: Complete Integration

```jsx
// src/components/CompleteExample.jsx
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

function CompleteExample() {
  // Load 3D model
  const { scene } = useGLTF('/StoryInteract1/models/character.glb')

  // Load texture for ground
  const groundTexture = useTexture('/StoryInteract1/images/grass.jpg')

  return (
    <group>
      {/* 3D Character */}
      <primitive object={scene} position={[0, 0, 0]} />

      {/* Textured Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={groundTexture} />
      </mesh>
    </group>
  )
}

export default CompleteExample
```

---

Happy coding! 🚀
