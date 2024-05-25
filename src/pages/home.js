const loadHome = (main) => {
    fetch('../../assets/textes/welcome.txt')
        .then(response => response.text())
        .then(welcomeText => {
            const lines = welcomeText.split('\n');

            let content = `<h1>${lines[0]}</h1>`;
            for (let i = 1; i < lines.length; i++) {
                content += `<p>${lines[i]}</p>`;
            }

            main.innerHTML = `
                <div class="container-fluid">
                    <div class="row flex-fill">
                        <div class="col-md-6 col-12 p-3 section section-4 d-flex flex-column justify-content-center align-items-center">
                            ${content}
                        </div>
                        <div class="col-md-6 col-12 p-3 section section-5 d-flex flex-column justify-content-center align-items-center">
                            <img src="../../assets/images/competencesNoBG.png" alt="Mes Compétences" class="skills-image">
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error loading welcome text:', error));
};

export default loadHome;


