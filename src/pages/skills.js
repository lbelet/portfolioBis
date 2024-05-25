const loadSkills = (main) => {
    main.innerHTML = `
    <div class="main-container">
        <div class="row">
            <div class="col-md">
                <h2>Programming</h2>
                <div class="skill-item"><i class="fab fa-cuttlefish"></i> C</div>
                <div class="skill-item"><i class="fab fa-js-square"></i> JavaScript</div>
                <div class="skill-item"><i class="fab fa-python"></i> Python</div>
                <div class="skill-item"><i class="fab fa-html5"></i> HTML</div>
                <div class="skill-item"><i class="fab fa-css3-alt"></i> CSS</div>
            </div>
            <div class="col-md">
                <h2>3D with Blender</h2>
                <div class="video-gallery">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/zxplWbsfAgE?rel=0" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col-md">
                <h2>OSINT</h2>
                <h3>BLA BLA BLA</h3>
            </div>
            <div class="w-100"></div>        
        </div>
    </div>
    `;
};

export default loadSkills;
