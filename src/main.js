import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  window.innerWidth < 768 ? 80 : 75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = window.innerWidth < 768 ? 12 : 10;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('canvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.physicallyCorrectLights = true;

// Directional Light
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(0, 2, 3);
scene.add(dirLight);

const settings = {
  thickness: 0.4,
  roughness: 0,
  transmission: 1,
  ior: 1.2,
  backside: true,
};

// PMREM Generator for HDRI
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// Create a torus mesh with MeshPhysicalMaterial
let torus;
let material;

// Load HDRI environment map + create the glass material
new RGBELoader()
  .setDataType(THREE.FloatType)
  .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/bloem_olive_house_2k.hdr', (hdrTexture) => {
    const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
    scene.environment = envMap;
    scene.background = envMap;

    hdrTexture.dispose();
    pmremGenerator.dispose();

    material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: settings.transmission,
      thickness: settings.thickness,
      roughness: settings.roughness,
      metalness: 0,
      ior: settings.ior,
      envMapIntensity: 1,
      transparent: true,
      side: settings.backside ? THREE.BackSide : THREE.FrontSide,
    });

    const loader = new GLTFLoader();
    loader.load('/models/torrus.glb', (gltf) => {
      torus = gltf.scene;

      torus.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      torus.scale.set(10, 10, 10);
      scene.add(torus);
    });
  });

// GUI Controls
const gui = new GUI();
gui.add(settings, 'thickness', 0, 3, 0.05).onChange((v) => material && (material.thickness = v));
gui.add(settings, 'roughness', 0, 1, 0.1).onChange((v) => material && (material.roughness = v));
gui.add(settings, 'transmission', 0, 1, 0.1).onChange((v) => material && (material.transmission = v));
gui.add(settings, 'ior', 0, 3, 0.1).onChange((v) => material && (material.ior = v));
gui.add(settings, 'backside').onChange((v) => {
  if (material) {
    material.side = v ? THREE.BackSide : THREE.FrontSide;
    material.needsUpdate = true;
  }
});

// Resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.fov = width < 768 ? 80 : 75;
  camera.position.z = width < 768 ? 12 : 10;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (torus) {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
animate();
