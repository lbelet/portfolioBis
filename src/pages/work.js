import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const loadWork = (main) => {
    main.innerHTML = `
    <div class="container-fluid">
        <div class="row flex-fill">
            <div class="col-md-6 col-12 p-3 section section-4 d-flex flex-column justify-content-center align-items-center">
                <div class="container-fluid">
                    <div class="row flex-fill">
                        <div class="col-12 p-3 section sub-section d-flex justify-content-center align-items-center dev-background" id="dev-section">
                            Dev
                        </div>
                    </div>
                    <div class="row flex-fill">
                        <div class="col-12 p-3 section sub-section d-flex justify-content-center align-items-center three-d-background" id="3d-section">
                            3D
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-12 p-3 section section-5 d-flex flex-column justify-content-center align-items-center">
                <div id="carouselExampleIndicators" class="carousel slide w-100" data-bs-ride="false">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner w-100" id="carousel-inner">
                        <!-- Carousel items will be injected here -->
                    </div>
                    <button class="carousel-control-prev custom-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next custom-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="imageModalLabel">Image</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img id="modalImage" src="" class="img-fluid" alt="Large image">
          </div>
        </div>
      </div>
    </div>
    `;

    document.getElementById('dev-section').addEventListener('click', () => {
        loadCarouselContent('dev');
        changeBackgroundColor('dev');
    });
    document.getElementById('3d-section').addEventListener('click', () => {
        loadCarouselContent('3d');
        changeBackgroundColor('3d');
    });

    // Sélectionnez automatiquement "Dev" lorsque la page est chargée
    loadCarouselContent('dev');
    changeBackgroundColor('dev');
};

const loadCarouselContent = async (type) => {
    const carouselInner = document.getElementById('carousel-inner');
    let content = '';

    if (type === 'dev') {
        content = `
            <div class="carousel-item active">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">Transcendence - Full-Stack Web Application</h3>
                    <div class="d-flex flex-column justify-content-center align-items-center mb-3">
                        <img src="../../assets/images/transcendence/animation.gif" alt="Animation GIF" class="carousel-image img-fluid mb-2" data-bs-toggle="modal" data-bs-target="#imageModal" data-src="../../assets/images/transcendence/animation.gif">
                        <div class="d-flex justify-content-center">
                            <img src="../../assets/images/transcendence/login.PNG" alt="Login Page" class="carousel-image img-fluid m-2" data-bs-toggle="modal" data-bs-target="#imageModal" data-src="../../assets/images/transcendence/login.PNG">
                            <img src="../../assets/images/transcendence/welcome.PNG" alt="Welcome Page" class="carousel-image img-fluid m-2" data-bs-toggle="modal" data-bs-target="#imageModal" data-src="../../assets/images/transcendence/welcome.PNG">
                        </div>
                    </div>
                    <p class="px-3">Transcendence est un projet phare de l'école 42, visant à développer une application web full-stack robuste et moderne. Ce projet intègre des technologies telles que Django pour le backend, VanillaJS et Three.js pour le frontend et PostgreSQL pour la gestion de base de données. L'objectif est de créer une plateforme interactive offrant des fonctionnalités avancées telles que l'authentification, la gestion des utilisateurs, un jeu multijoueurs en 3D et une interface utilisateur réactive et intuitive.</p>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">Dev Project 2</h3>
                    <p class="px-3">Description of Dev Project 2</p>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">Dev Project 3</h3>
                    <p class="px-3">Description of Dev Project 3</p>
                </div>
            </div>
        `;
    } else if (type === '3d') {
        content = `
            <div class="carousel-item active">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">3D Project 1</h3>
                    <p class="px-3">Description of 3D Project 1</p>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">3D Project 2</h3>
                    <p class="px-3">Description of 3D Project 2</p>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 100%;">
                    <h3 class="mb-3">3D Project 3</h3>
                    <p class="px-3">Description of 3D Project 3</p>
                </div>
            </div>
        `;
    }

    carouselInner.innerHTML = content;

    // Ajouter des gestionnaires d'événements pour les images
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('click', (e) => {
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('imageModalLabel');
            modalImage.src = e.target.getAttribute('data-src');
            modalTitle.textContent = e.target.alt;
        });
    });

    // Importer dynamiquement Bootstrap ici
    const { Carousel } = await import('bootstrap');

    // Reinitialize the carousel with custom options to ensure it updates correctly
    const carousel = new Carousel(document.querySelector('#carouselExampleIndicators'), {
        interval: false
    });
};

const changeBackgroundColor = (type) => {
    const devSection = document.getElementById('dev-section');
    const threeDSection = document.getElementById('3d-section');

    if (type === 'dev') {
        devSection.classList.add('selected');
        devSection.classList.add('dev-background');
        devSection.classList.remove('three-d-background');
        threeDSection.classList.remove('selected');
    } else if (type === '3d') {
        threeDSection.classList.add('selected');
        threeDSection.classList.add('three-d-background');
        threeDSection.classList.remove('dev-background');
        devSection.classList.remove('selected');
    }
};

window.showModal = (src, alt) => {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    const modalTitle = document.getElementById('imageModalLabel');
    modalTitle.textContent = alt;
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
};

export default loadWork;
