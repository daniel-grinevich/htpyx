document.body.addEventListener('htmx:afterSwap', function() {

    const version_image = document.getElementById('prototype-image');
    const concept = document.getElementById('concept');
    const cad_designed = document.getElementById('cad-designed');
    const prototype = document.getElementById('prototype');
    const version_1 = document.getElementById('version-1');
    let version_options = [concept, cad_designed, prototype, version_1];
    let version_img_links = ["concept.svg", "cad.png", "prototype.png", "version1.png"];

    version_options.forEach(function(option, index) {
        option.addEventListener('click', function(event) {
            console.log("clicked");
            if (option.getAttribute('data-value') === 'not-selected') {
                // First, reset all options
                version_options.forEach(function(opt, idx) {
                    opt.setAttribute('data-value', 'not-selected');
                    opt.classList.remove('bg-custom-red');
                    opt.classList.add('bg-zinc-700');
                });

                // Then, set the clicked option
                option.setAttribute('data-value', 'selected');
                option.classList.remove('bg-zinc-700');
                option.classList.add('bg-custom-red');
                version_image.src = `/static/images/${version_img_links[index]}`;
            }
        });
    });
});

