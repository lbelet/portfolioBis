import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js';

document.querySelector('#app').innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mon Site</a>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="theme-switch">
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact me</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="canvas-container" id="content">
    <!-- Le contenu de la page ira ici -->
  </div>
  <footer class="footer mt-auto py-3 footer-light bg-light fixed-bottom">
    <div class="container text-center">
      <a href="lien_vers_votre_profil_LinkedIn" class="mx-2"><i class="fab fa-linkedin"></i></a>
      <a href="https://github.com/lbelet" class="mx-2"><i class="fab fa-github"></i></a>
    </div>
  </footer>
`;

const themeSwitch = document.querySelector('#theme-switch');
themeSwitch.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('bg-dark');
  navbar.classList.toggle('bg-light');
  navbar.classList.toggle('navbar-dark');
  navbar.classList.toggle('navbar-light');

  const footerContent = document.querySelector('.footer');
  footerContent.classList.toggle('bg-dark');
  footerContent.classList.toggle('bg-light');
});

initThreeJS();

function initThreeJS() {
  const initialIntensity = 1;

  const scene = new THREE.Scene();
  const canvasContainer = document.querySelector('.canvas-container');
  const canvas = document.createElement('canvas');
  canvas.id = 'main-canvas';
  canvasContainer.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, -1.2);

  const directionalLight = new THREE.AmbientLight(0xffffff, 1);
  directionalLight.position.set(0, 4, 0);
  scene.add(directionalLight);

  const loader = new GLTFLoader();

  loader.load('../assets/3d/privateDev.gltf', function (gltf) {
    const model = gltf.scene;
    model.scale.set(3, 3, 3)

    scene.add(model);

    function onWindowResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      renderer.setSize(window.innerWidth, window.innerHeight);

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
  }, undefined, function (error) {
    console.error('Une erreur s\'est produite lors du chargement du modèle GLTF', error);
  });

  canvas.addEventListener('click', function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (x - rect.left) / canvas.clientWidth * 2 - 1;
    const mouseY = -(y - rect.top) / canvas.clientHeight * 2 + 1.7;

    if ((mouseX >= -0.1 && mouseX <= 0.1) && (mouseY >= 0.3 && mouseY <= 0.7)) {
      if (!animationStarted) {
        animateCamera();
        animationStarted = true;
      }
    }
  });

  let animationStarted = false;

  function animateCamera() {
    const start = { x: 0, y: 1.2, z: -1.2 };
    const end = { x: 0, y: 0.75, z: -4 };

    const duration = 5000;

    const amplitude = 0.04;

    const frequency = 10 * Math.PI / duration;

    const tween = new TWEEN.Tween(start)
      .to(end, duration)
      .onUpdate(() => {
        const offsetY = Math.sin((Date.now() - startTime) * frequency) * amplitude;
        camera.position.set(start.x, start.y + offsetY, start.z);
      })
      .onComplete(() => {
        console.log("animation completed");
        const initialIntensity = directionalLight.intensity;
        const targetIntensity = 0;
        const transitionDuration = 1000;
        new TWEEN.Tween({ intensity: initialIntensity })
          .to({ intensity: targetIntensity }, transitionDuration)
          .onUpdate((obj) => {
            directionalLight.intensity = obj.intensity;
          })
          .start();
      })
      .start();
  }

  const startTime = Date.now();

  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
  }
  animate();
}
