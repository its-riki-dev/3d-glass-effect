# 🧊 3D Glass Effect

A visually striking glass-effect 3D experience built using **Three.js**, **TailwindCSS**, and **HDRI lighting**. Features a realistic transparent torus rendered with `MeshPhysicalMaterial`, customizable via **GUI controls** for transmission, thickness, IOR, and more. Includes HDR-based lighting and reflections, dynamic rotation animation, and full mobile responsiveness for immersive visuals on any device.

[![HomeSS](public/heropage.png)](https://cyberpunk-landing-page-chi.vercel.app/)

---

## ✨ Features

- 🧊 **Glass-Refraction** Torus using `MeshPhysicalMaterial` for realistic transmission and thickness
- 🌅 **HDRI Environment Lighting** with real-time reflections and lighting from a photorealistic skybox
- ⚙️ **Live GUI Controls** to tweak transmission, IOR, roughness, and more dynamically
- 🔁 **Animated Rotation** for smooth 3D motion of the transparent object
- 📱 **Mobile Responsive** camera behavior and adaptive FOV for smaller screens
- 🖱️ **Auto Resize Support** with viewport adjustments and pixel ratio optimization
- 🎨 **TailwindCSS Styling** for canvas integration and consistent layout
- 🚀 **Performance Optimized Renderer** with antialiasing and physically correct lighting

---

## 🧠 How It Works

- Loads a GLB torus model and applies a transparent glass-like material using MeshPhysicalMaterial
- Uses a high-quality HDRI from PolyHaven for realistic lighting and reflections
- Creates a PMREM-based environment map for accurate physical rendering
- Animates the torus rotation continuously for a dynamic visual effect
- Provides a GUI panel to interactively adjust physical material properties like thickness, IOR, and transmission
- Adapts the camera field of view and position based on screen size for responsive viewing
- Ensures performance and clarity using antialiasing and pixel ratio scaling

---

## 🛠️ Built With

- [Three.js](https://threejs.org/) - 3D rendering
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [RGBELoader](https://threejs.org/docs/#examples/en/loaders/RGBELoader) - HDRI environment maps
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) - For loading the `.glb` torus model
- [lil-gui](https://lil-gui.georgealways.com/) – Lightweight GUI for real-time material control

---

## Clone the repo

```bash
git clone https://github.com/its-riki-dev/3d-glass-effect.git

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

- This project is licensed under the MIT License.
