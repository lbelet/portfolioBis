import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import loadHome from './pages/home.js';
import loadSkills from './pages/skills.js';
import loadWork from './pages/work';

document.addEventListener('DOMContentLoaded', () => {
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

  const mainContent = document.getElementById('main-content');
  if (!mainContent) {
    console.error('Main content element not found');
    return;
  }

  document.getElementById('nav-home')?.addEventListener('click', () => loadHome(mainContent));
  document.getElementById('nav-skills')?.addEventListener('click', () => loadSkills(mainContent));
  document.getElementById('nav-work')?.addEventListener('click', () => loadWork(mainContent));

  // Load the home page by default
  loadHome(mainContent);
});
