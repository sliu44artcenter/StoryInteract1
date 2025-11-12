# 🌸 3D Moral Choice Narrative

An immersive **React + Three.js + GSAP** experience that tells a purely visual story of moral transformation through symbolic interactions.

A person stands calmly at the center of a minimalistic 3D world. The entire narrative unfolds through **color, motion, and light** — no text, no dialogue, just visual poetry.

---

## ✨ Core Concept

Three floating icons orbit before you, each representing a moral path:

- **🌸 Flower** → Good choices (angelic transformation)
- **🪨 Stone** → Neutral choices (maintain balance)
- **🔪 Knife** → Evil choices (demonic transformation)

Every click shifts the moral balance, gradually transforming the central figure and environment in symbolic ways.

---

## 🎮 How It Works

### Moral Level System

The character exists on a spectrum from **-3 (Fully Evil)** to **+3 (Fully Good)**:

```
-3  -2  -1   0   +1  +2  +3
👿  😈  😠  😐  😊  😇  ✨
```

### Transformation Sequences

#### **Good Choice — Flower 🌸**

If demonic traits exist, they fade away first (in reverse order):
1. Red glow disappears
2. Horns dissolve
3. Evil grin fades

If already neutral, angelic traits appear sequentially:
1. White robe materializes
2. Glowing halo appears
3. Golden light emanates

**Environment**: Transitions to radiant gold-white gradient with floating golden particles.

#### **Evil Choice — Knife 🔪**

If angelic traits exist, they vanish first (in reverse order):
1. Golden glow dims
2. Halo disappears
3. White robe fades

If already neutral, demonic traits emerge sequentially:
1. Evil grin (red emissive overlay)
2. Horns grow from head
3. Body turns deep red with flickering underlight

**Environment**: Darkens to deep crimson with floating red embers.

#### **Neutral Choice — Stone 🪨**

- Character remains unchanged
- Ground ripple animation triggers
- Environment resets to soft gray

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+
- **npm** or **yarn**

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy-pages
```

---

## 📁 Project Structure

```
/src
  /components
    Scene.jsx          # Main 3D environment & rendering
    Character.jsx      # Central humanoid with moral traits
    Icons.jsx          # Interactive Flower, Stone, Knife icons
    Transitions.js     # GSAP animation timelines
  /utils
    useMoralState.js   # Zustand store for moral level tracking
  main.jsx
  App.jsx
/public
index.html
vite.config.js
package.json
```

---

## 🎨 Technical Architecture

### State Management (Zustand)

```javascript
moralLevel: -3 to +3  // Current moral alignment
traits: {
  // Angelic
  whiteRobe, halo, goldenGlow
  // Demonic
  evilGrin, horns, redGlow
}
environment: {
  backgroundColor, lightColor, ambientIntensity, fogDensity
}
```

### Animation System (GSAP)

- **Trait Appearance**: Elastic ease-out with scale + fade
- **Trait Disappearance**: Back ease-in with dissolve
- **Camera Reactions**: Subtle dolly and tilt per choice
- **Environment**: Color interpolation over 1.5s
- **Icons**: Hover scaling + glow pulse + orbital float

### 3D Scene Setup

**Lighting**:
- Ambient light (intensity based on moral level)
- Directional light (color shifts: gold → white → red)
- Point light (bottom fill for dramatic effect)
- Rim light (back silhouette)

**Post-Processing**:
- **Bloom**: Enhanced for angelic states (scales with +level)
- **Vignette**: Enhanced for demonic states (scales with -level)
- **Fog**: Dynamic color matching background

**Particles**:
- Golden dust (floats upward on good choices)
- Red embers (flicker and rise on evil choices)

---

## 🎭 Visual Design Philosophy

### Symbolic Representation

Every trait is **symbolic, not literal**:

- **White Robe** → Glowing cylinder overlay (not detailed fabric)
- **Halo** → Transparent torus ring (simple geometric form)
- **Horns** → Black cone meshes (menacing silhouette)
- **Evil Grin** → Red emissive sphere on face (abstract malice)

### Cinematic Motion

- **No sudden cuts** — all transitions use GSAP timelines
- **Camera subtly reacts** to each choice (dolly + tilt)
- **Icons gently orbit** with floating animation
- **Character breathes** with subtle idle motion

### Minimalist + Ethereal

- Soft fog for depth
- Gradient backgrounds (not skyboxes)
- Neutral human silhouette (no detailed features)
- Focus on **light and color as narrative tools**

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| **React 18** | Component architecture |
| **Three.js** | 3D rendering engine |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Helper components (OrbitControls, ContactShadows) |
| **@react-three/postprocessing** | Bloom, Vignette effects |
| **GSAP** | Animation timelines |
| **Zustand** | State management |
| **Vite** | Build tool + dev server |

---

## 🧩 Customization Guide

### Change Moral Level Range

Edit `src/utils/useMoralState.js`:

```javascript
const newLevel = Math.min(state.moralLevel + 1, 5) // Change to +5 max
```

### Add New Traits

1. Add trait to Zustand store
2. Create mesh in `Character.jsx`
3. Add animation triggers in `useEffect`
4. Define GSAP timeline in `Transitions.js`

### Adjust Colors

**Angelic colors**: `useMoralState.js:77-80`
**Demonic colors**: `useMoralState.js:120-123`
**Icon materials**: `Icons.jsx` (each icon's material properties)

### Modify Animations

**Speed**: Change `duration` values in `Transitions.js`
**Easing**: Try different GSAP eases (`elastic`, `back`, `bounce`, `power`)
**Camera**: Adjust dolly amounts in `animateCameraReaction`

---

## 🐛 Troubleshooting

### Scene appears black

Check browser console for WebGL errors. Try:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Animations feel choppy

- Ensure GPU acceleration is enabled in browser
- Reduce particle counts in `Scene.jsx:247, 302`
- Lower shadow map resolution: `shadow-mapSize-width={1024}`

### Icons don't respond to clicks

- Verify OrbitControls isn't blocking pointer events
- Check `onClick` handlers in `Icons.jsx`
- Ensure meshes have proper geometry bounds

### GitHub Pages deployment fails

- Verify `base: '/StoryInteract1/'` in `vite.config.js` matches repo name
- Check that gh-pages branch exists: `git branch -a`
- Ensure GitHub Pages is enabled in repo settings

---

## 🎯 Design Goals Achieved

✅ **No text or dialogue** — Pure visual storytelling
✅ **Symbolic representation** — Traits convey meaning without realism
✅ **Progressive transformation** — Gradual moral shifts feel earned
✅ **Cinematic polish** — Smooth GSAP transitions + camera reactions
✅ **Emotional lighting** — Color and intensity drive mood
✅ **Interactive narrative** — User agency shapes the story

---

## 📖 Learning Resources

**Three.js**: [threejs.org/docs](https://threejs.org/docs)
**React Three Fiber**: [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
**GSAP**: [greensock.com/docs](https://greensock.com/docs/)
**Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

---

## 📄 License

MIT License — Use freely for learning, creative projects, and portfolio work.

---

## 🌟 Credits

Built with passion for **interactive storytelling** and **creative coding**.
A tribute to the power of **visual narrative** in digital experiences.

---

**Experience the story. Make your choices. Watch the transformation.** 🎭✨
