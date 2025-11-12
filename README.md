# 🌟 3D Narrative Scene - Interactive Moral Choices

An immersive 3D narrative experience built with **Three.js**, **React**, and **GSAP** that tells a story of moral choices through **pure light, color, and atmospheric transformation** — no text, no dialogue, no physical appendages.

## ✨ Features

- **Interactive 3D Character**: A humanoid figure that transforms through **material properties and lighting** based on moral choices
- **Visual Storytelling**: Purely symbolic narrative conveyed through:
  - Dynamic lighting (rim lights, key lights, spotlights)
  - Material color and emissive properties
  - Atmospheric fog and particle effects
  - Camera movements and compositions
- **Three Moral Paths**:
  - 🌟 **Golden Halo** - Path of virtue (golden glow, top-down rim light, warm atmosphere)
  - 🔥 **Dark Flame** - Path of corruption (crimson emissive, bottom-up spotlight, oppressive fog)
  - ⚖️ **Balance Scale** - Path of neutrality (natural tones, balanced lighting, calm environment)
- **Cinematic Effects**:
  - Multi-light cinematic rig with dynamic intensities
  - Volumetric fog with color transitions
  - Character material transformations (skin and clothing)
  - Camera zoom and orbit animations
  - Ambient particle systems
  - Post-processing effects (bloom, vignette)
  - Smooth GSAP-powered transitions

## 🎮 How to Experience

1. **Open the webpage** - A 3D character stands in the center with calm lighting
2. **Observe the three floating icons** around the character
3. **Hover over icons** - They glow and pulse with anticipation
4. **Click an icon** to make your choice:
   - **Halo Icon** → Golden light bathes the character from above, skin glows warmly, heavenly fog fills the space
   - **Flame Icon** → Red spotlight illuminates from below, clothing emits crimson light, oppressive shadows lengthen
   - **Scale Icon** → Lighting returns to neutral balance, natural colors restore, fog dissipates

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deploy to GitHub Pages

### Option 1: Automated Deployment

```bash
# Build and deploy in one command
npm run deploy
```

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Install gh-pages if not already installed
npm install -g gh-pages

# Deploy dist folder to gh-pages branch
gh-pages -d dist
```

### Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set source to `gh-pages` branch
4. Save and wait for deployment
5. Access at: `https://yourusername.github.io/StoryInteract1/`

## 📁 Project Structure

```
3d-narrative-scene/
├── src/
│   ├── components/
│   │   ├── Scene.jsx          # Main 3D scene orchestration with lighting rig
│   │   ├── Character.jsx      # Humanoid character with material transformations
│   │   ├── HaloIcon.jsx       # Golden halo icon (virtue)
│   │   ├── FlameIcon.jsx      # Dark flame icon (corruption)
│   │   ├── ScaleIcon.jsx      # Balance scale icon (neutrality)
│   │   └── Particles.jsx      # Ambient particle effects
│   ├── App.jsx                # Root component
│   └── main.jsx               # Application entry point
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Technical Highlights

### Three.js Scene Setup
- **Camera**: Positioned at [0, 2, 8] with 50° FOV, dynamic zoom animations
- **Cinematic Lighting Rig**:
  - Main key light (directional) with color/intensity transitions
  - Top-down rim light for angelic silhouette
  - Bottom-up spotlight for demonic effect
  - Ambient light with dynamic intensity
  - Fill light for atmospheric depth
- **Volumetric Fog**: FogExp2 with color and density animations
- **Shadows**: High-quality contact shadows and shadow mapping
- **Environment**: Sunset preset with background texture transitions

### Animation System (GSAP)
- **Material Transformations**: Character skin and clothing color/emissive properties
- **Dynamic Lighting**: Smooth intensity and color transitions across multiple lights
- **Camera Movements**: Zoom-in on choice selection, gentle return orbit
- **Fog Animation**: Density and color morphing for atmospheric storytelling
- **Particle Systems**: Drift, swirl, and fade effects
- **Icon Interactions**: Hover scaling and glow effects with elastic easing

### React Three Fiber Components
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (OrbitControls, Environment, ContactShadows)
- `@react-three/postprocessing` - Visual effects (Bloom, Vignette)

### Performance Optimizations
- Efficient particle systems with Float32Arrays
- Instanced geometries where possible
- Optimized shadow maps
- Proper cleanup and memoization

## 🎯 Design Philosophy

This project demonstrates **pure visual storytelling** principles:

1. **Light as Language**: Moral transformation conveyed entirely through lighting, color, and atmosphere
2. **No Physical Metaphors**: Instead of literal wings or horns, the character transforms through:
   - Material emissive properties (inner glow)
   - Dynamic multi-light compositions (rim lights, spotlights)
   - Atmospheric fog and environmental color
3. **Cinematic Composition**: Every choice triggers a carefully choreographed lighting and camera sequence
4. **Symbolic Subtlety**: Viewers interpret meaning through visual cues:
   - **Golden top-light** = enlightenment, divinity, ascension
   - **Red bottom-light** = corruption, shadow, descent
   - **Balanced white light** = equilibrium, humanity, choice
5. **Interactive Storytelling**: User choices directly impact visual experience without explicit instruction

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library
- **Vite** - Build tool and dev server
- **React Three Drei** - Three.js helpers
- **React Three Postprocessing** - Visual effects

## 📝 Customization Guide

### Changing Colors

Edit lighting and material colors:
- **Angel theme**: Modify `Scene.jsx:84-91` (lighting colors, fog) and `Character.jsx:54-62` (material properties)
- **Devil theme**: Modify `Scene.jsx:93-102` (lighting colors, fog) and `Character.jsx:64-72` (material properties)
- **Neutral theme**: Modify `Scene.jsx:103-113` and `Character.jsx:74-82`

### Adjusting Lighting

Fine-tune the cinematic rig in `Scene.jsx`:
- **Rim light position**: `Scene.jsx:262` - Change Y-axis for different top-light angles
- **Spotlight angle**: `Scene.jsx:274` - Adjust cone angle for devil light
- **Light intensities**: Modify intensity values in `handleChoice` function

### Modifying Animations

Adjust GSAP parameters:
- **Material transitions**: `Character.jsx:89-136` - Change duration and easing
- **Camera movements**: `Scene.jsx:191-206` - Modify zoom distance and timing
- **Fog animations**: `Scene.jsx:174-188` - Adjust density and color transition speed
- **Light transitions**: `Scene.jsx:122-162` - Change light fade durations

### Adding More Choices

1. Create new icon component in `src/components/`
2. Add new case in `Scene.jsx` `handleChoice` function with:
   - Light colors and intensities
   - Fog color and density
   - Camera animation parameters
3. Add corresponding material transformation in `Character.jsx` effect hook
4. Define new symbolic aura color if needed

## 🐛 Troubleshooting

### Development server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Three.js warnings in console
- Most warnings about deprecated features can be ignored
- Update dependencies if errors occur: `npm update`

### GitHub Pages shows 404
- Ensure `base` in `vite.config.js` matches your repo name
- Check that gh-pages branch exists
- Verify GitHub Pages is enabled in repository settings

## 📄 License

MIT License - Feel free to use this project for learning and creative purposes!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add new moral choice options
- Enhance visual effects
- Optimize performance
- Improve animations

## 🌟 Acknowledgments

Built with passion for interactive storytelling and creative coding. Inspired by the power of visual narrative in games and interactive media.

---

**Enjoy exploring the moral dimensions of your digital character!** 🎭✨
