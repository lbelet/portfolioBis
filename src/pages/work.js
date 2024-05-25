import { Carousel } from 'bootstrap';

const loadWork = (main) => {
    main.innerHTML = `
    <div class="container-fluid">
        <div class="row flex-fill">
            <div class="col-md-6 col-12 p-3 section section-4 d-flex flex-column justify-content-center align-items-center">
                <div class="container-fluid">
                    <div class="row flex-fill">
                        <div class="col-12 p-3 section sub-section d-flex justify-content-center align-items-center" id="dev-section">
                            Dev
                        </div>
                    </div>
                    <div class="row flex-fill">
                        <div class="col-12 p-3 section sub-section d-flex justify-content-center align-items-center" id="3d-section">
                            3D
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-12 p-3 section section-5 d-flex flex-column justify-content-center align-items-center">
                <div id="carouselExampleIndicators" class="carousel slide w-100" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner w-100" id="carousel-inner">
                        <!-- Carousel items will be injected here -->
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('dev-section').addEventListener('click', () => loadCarouselContent('dev'));
    document.getElementById('3d-section').addEventListener('click', () => loadCarouselContent('3d'));
};

const loadCarouselContent = (type) => {
    const carouselInner = document.getElementById('carousel-inner');
    let content = '';

    if (type === 'dev') {
        content = `
            <div class="carousel-item active">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>Dev Project 1</h3>
                        <p>Description of Dev Project 1</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>Dev Project 2</h3>
                        <p>Description of Dev Project 2</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>Dev Project 3</h3>
                        <p>Description of Dev Project 3</p>
                    </div>
                </div>
            </div>
        `;
    } else if (type === '3d') {
        content = `
            <div class="carousel-item active">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>3D Project 1</h3>
                        <p>Description of 3D Project 1</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>3D Project 2</h3>
                        <p>Description of 3D Project 2</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                    <div>
                        <h3>3D Project 3</h3>
                        <p>Description of 3D Project 3</p>
                    </div>
                </div>
            </div>
        `;
    }

    carouselInner.innerHTML = content;

    // Reinitialize the carousel with custom options to ensure it updates correctly
    const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
        interval: false
    });
};

export default loadWork;
