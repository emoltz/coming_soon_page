import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

const box = new THREE.SphereGeometry(1, 32, 32);
// const box = new THREE.TorusGeometry(.5, 0.3, 16, 50);
const material = new THREE.MeshToonMaterial({
  color: 0xffeded,
  //   gradientMap: gradientTexture,
  wireframe: true,
});
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Particles
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffeded,
  sizeAttenuation: textureLoader,
  size: 0.03,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera aspect ratio
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setSize(sizes.width, sizes.height);
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

//Animate
const clock = new THREE.Clock();
let speed = 0.3;
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

    mesh.rotation.x = Math.cos(speed * elapsedTime);
    mesh.rotation.y = Math.cos(speed * elapsedTime);
    mesh.position.y = Math.sin(speed * elapsedTime);
    mesh.position.x = Math.sin(speed * elapsedTime);

    camera.position.y = Math.sin(speed * elapsedTime);

    window.requestAnimationFrame(animate);
    renderer.setSize(sizes.width, sizes.height);
     renderer.render(scene, camera);
};

animate();
