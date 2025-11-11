# 🌟 3D Narrative Scene - Interactive Moral Choices

An immersive 3D narrative experience built with **Three.js**, **React**, and **GSAP** that tells a story of moral choices through visual symbolism and cinematic interactions.

## ✨ Features

- **Interactive 3D Character**: A humanoid figure that transforms based on moral choices
- **Visual Storytelling**: No text or dialogue - pure symbolic narrative
- **Three Moral Paths**:
  - 🌟 **Golden Halo** - Choose the path of good deeds (angel wings & golden atmosphere)
  - 🔥 **Dark Flame** - Choose the path of evil deeds (devil wings & red atmosphere)
  - ⚖️ **Balance Scale** - Choose neutrality (no transformation)
- **Cinematic Effects**:
  - Dynamic lighting transitions
  - Ambient particle systems
  - Post-processing effects (bloom, vignette)
  - Smooth GSAP animations
  - Interactive hover states

## 🎮 How to Experience

1. **Open the webpage** - A 3D character stands in the center
2. **Observe the three floating icons** around the character
3. **Hover over icons** - They glow and pulse with anticipation
4. **Click an icon** to make your choice:
   - **Halo Icon** → Angel wings grow, golden light fills the scene
   - **Flame Icon** → Devil wings emerge, darkness and red hues envelop
   - **Scale Icon** → Character remains unchanged, maintaining balance

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
│   │   ├── Scene.jsx          # Main 3D scene orchestration
│   │   ├── Character.jsx      # Humanoid character with wings
│   │   ├── HaloIcon.jsx       # Golden halo icon (good)
│   │   ├── FlameIcon.jsx      # Dark flame icon (evil)
│   │   ├── ScaleIcon.jsx      # Balance scale icon (neutral)
│   │   └── Particles.jsx      # Ambient particle effects
│   ├── App.jsx                # Root component
│   └── main.jsx               # Application entry point
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Technical Highlights

### Three.js Scene Setup
- **Camera**: Positioned at [0, 2, 8] with 50° FOV
- **Lighting**: Ambient + directional + point lights with dynamic color transitions
- **Shadows**: High-quality contact shadows and shadow mapping
- **Environment**: Sunset preset with dynamic fog

### Animation System (GSAP)
- Wing growth with elastic easing
- Background color transitions (2.5s duration)
- Light intensity and color morphing
- Hover effects on interactive elements
- Particle drift and swirl motions

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

This project demonstrates **visual narrative design** principles:

1. **Show, Don't Tell**: Every element communicates through form and motion
2. **Symbolic Language**: Colors, shapes, and movements convey meaning
3. **Interactive Storytelling**: User choices directly impact the visual experience
4. **Cinematic Polish**: Smooth transitions and atmospheric effects enhance immersion

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

Edit color values in component files:
- **Angel theme**: `Scene.jsx:44` (background), `Character.jsx:133` (wings)
- **Devil theme**: `Scene.jsx:49` (background), `Character.jsx:189` (wings)

### Adjusting Animations

Modify GSAP parameters:
- **Duration**: Change `duration` values in GSAP calls
- **Easing**: Try different eases (elastic, bounce, power, etc.)
- **Timing**: Adjust delays and stagger effects

### Adding More Choices

1. Create new icon component in `src/components/`
2. Add case in `Scene.jsx` `handleChoice` function
3. Design new wing geometry in `Character.jsx`
4. Define new color scheme and effects

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
