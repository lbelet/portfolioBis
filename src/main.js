import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
  <div id="content" style="padding-top: 80px;">
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
  footerContent.classList.toggle('footer-dark');
  footerContent.classList.toggle('footer-light');

});
