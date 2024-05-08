import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js';

document.querySelector('#app').innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mon Site</a>
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
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="theme-switch">
          <label class="form-check-label" for="theme-switch">Mode Sombre</label>
        </div>
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

// Fonction d'initialisation de la scène Three.js
function initThreeJS() {
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
  directionalLight.position.set(0, 4, 0); // Position de la lumière directionnelle
  scene.add(directionalLight);

  // Initialiser le chargeur de modèle GLTF
  const loader = new GLTFLoader();

  // Charger le modèle GLTF
  loader.load('../assets/privateDev.gltf', function (gltf) {
    const model = gltf.scene;
    // model.position.set(0, 0, 0)
    model.scale.set(3, 3, 3)

    // Ajouter le modèle à la scène
    scene.add(model);

    // const box = new THREE.Box3().setFromObject(model);
    // const boxHelper = new THREE.BoxHelper(model, 0xffff00);
    // scene.add(boxHelper);
    
    // // Ajouter des axes pour visualiser l'orientation
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // // Ajouter une grille pour visualiser la position
    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);

  }, undefined, function (error) {
    console.error('Une erreur s\'est produite lors du chargement du modèle GLTF', error);
  });

  canvas.addEventListener('click', function(event) {
    // Récupérer les coordonnées du clic par rapport à la fenêtre
    const x = event.clientX;
    const y = event.clientY;

    // Convertir les coordonnées du clic en coordonnées de la scène Three.js
    const rect = canvas.getBoundingClientRect();
    const mouseX = (x - rect.left) / canvas.clientWidth * 2 - 1;
    const mouseY = -(y - rect.top) / canvas.clientHeight * 2 + 1.7;

    // Vérifier si les coordonnées du clic sont dans la zone spécifiée
    if ((mouseX >= -0.1 && mouseX <= 0.1) && (mouseY >= 0.3 && mouseY <= 0.7)) {
      // Démarrer l'animation de la caméra si elle n'a pas encore commencé
      if (!animationStarted) {
        animateCamera();
        animationStarted = true;
      }
    }
  });

  let animationStarted = false; // Variable pour suivre si l'animation a démarré

  function animateCamera() {
    const start = { x: 0, y: 1.2, z: -1.2 }; // Position de départ de la caméra
    const end = { x: 0, y: 0.75, z: -4 }; // Position d'arrivée de la caméra
  
    // Durée de l'animation (en millisecondes)
    const duration = 5000;
  
    // Coefficient pour l'amplitude du mouvement vertical
    const amplitude = 0.04;
  
    // Coefficient pour la vitesse du mouvement vertical
    const frequency = 10 * Math.PI / duration;
  
    // Créer une nouvelle animation Tween.js
    new TWEEN.Tween(start)
      .to(end, duration)
      .onUpdate(() => {
        // Ajuster la position verticale de la caméra avec une fonction périodique
        const offsetY = Math.sin((Date.now() - startTime) * frequency) * amplitude;
        camera.position.set(start.x, start.y + offsetY, start.z);
      })
      .start(); // Démarrer l'animation
  }
  
  // Lancer l'animation de la caméra
  const startTime = Date.now();
  

  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update(); // Mettre à jour l'animation de Tween.js
    renderer.render(scene, camera);
  }

  animate();
}
