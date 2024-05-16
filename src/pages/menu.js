import loadSkills from "./skills";

const loadMenu = (main) => {
    main.innerHTML = `
    <div class="main-container">
        <div class="image-container">
            <img id="skills-image" src="../../assets/images/skills.png" alt="skills" class="menu-image">
            <img src="../../assets/images/contact.png" alt="contact" class="menu-image">
            <img src="../../assets/images/about.png" alt="about" class="menu-image">
        </div>
    </div>
    `;

    document.getElementById('skills-image').addEventListener('click', () => {
        loadSkills(main);
    });

};

export default loadMenu;