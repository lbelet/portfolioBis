import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js';
import loadMenu from './menu';

let animationFrameId;
let animationStarted = false;

const loadHome = (main) => {
    main.innerHTML = `
    <div class="canvas-container" id="content">
    </div>
    `;

    initThreeJS();
};

function initThreeJS() {
    animationStarted = true; // Ensure animation starts
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

    loader.load('../../assets/3d/privateDev.gltf', function (gltf) {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        scene.add(model);

        function onWindowResize() {
            if (!animationStarted) return;
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
        if (!animationStarted) return;
        
        const x = event.clientX;
        const y = event.clientY;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (x - rect.left) / canvas.clientWidth * 2 - 1;
        const mouseY = -(y - rect.top) / canvas.clientHeight * 2 + 1.7;

        if ((mouseX >= -0.1 && mouseX <= 0.1) && (mouseY >= 0.3 && mouseY <= 0.7)) {
            if (!animationStarted) return;
            animateCamera();
        }
    });

    const startTime = Date.now();

    function animate() {
        if (!animationStarted) return;
        TWEEN.update();
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    function animateCamera() {
        if (!animationStarted) return;

        console.log("animation started")
        
        const start = { x: 0, y: 1.2, z: -1.2 };
        const end = { x: 0, y: 0.75, z: -4 };

        const duration = 5000;
        const amplitude = 0.04;
        const frequency = 10 * Math.PI / duration;

        const tween = new TWEEN.Tween(start)
            .to(end, duration)
            .onUpdate(() => {
                if (!animationStarted) return;
                const offsetY = Math.sin((Date.now() - startTime) * frequency) * amplitude;
                camera.position.set(start.x, start.y + offsetY, start.z);
            })
            .onComplete(() => {
                if (!animationStarted) return;
                console.log("Animation completed");
                const initialIntensity = directionalLight.intensity;
                const targetIntensity = 0;
                const transitionDuration = 1000;
                new TWEEN.Tween({ intensity: initialIntensity })
                    .to({ intensity: targetIntensity }, transitionDuration)
                    .onUpdate((obj) => {
                        if (!animationStarted) return;
                        directionalLight.intensity = obj.intensity;
                    })
                    .onComplete(() => {
                        if (!animationStarted) return;
                        const mainContent = document.getElementById('main-content');
                        loadMenu(mainContent);
                    })
                    .start();
            })
            .start();
    }
}

function stopAnimation() {
    console.log("animation stopped")
    animationStarted = false;
}

export { loadHome, stopAnimation };
