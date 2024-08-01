document.addEventListener('DOMContentLoaded', function () {
    let isHovering = false;
    let currentLink = null;

    const projectItems = document.querySelectorAll('[id^="projectItem-"]');
    

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (currentLink && currentLink !== item) {
                removeAnimateLink(currentLink);
                removeHeader();
            }

            currentLink = item;
            isHovering = true;

            const titleDiv = document.createElement('div');
            titleDiv.id = 'animateLabel';  // Add class for styling
            titleDiv.className = 'px-1 font-nunito border border-black';  // Add class for styling
            titleDiv.style.backgroundColor = 'var(--fs-red)';  // Set the background color
            titleDiv.textContent = 'Animating';  // Set text content

            console.log('Hovering over:', item);
            item.appendChild(titleDiv);
            // item.appendChild(`<div class="project-title">Hi</div>`);
            // animateDisplay(true, title, color);
            animateLink(item, this.id); // Animate the link text
        });

        item.addEventListener('mouseleave', () => {
            isHovering = false;
            currentLink = null;
            this.querySelector('#animateLabel').remove();
        });
    });
});

function animateDisplay(isHovering, text, seed) {
    if (isHovering) {
        sandbox.setUniform('seed', seed);

        // Remove any existing header
        removeHeader();

        const projectHeader = document.createElement('h4'); // Create a new h4 element
        projectHeader.id = `${text}-header`; // Set the id attribute
        projectHeader.innerText = text;
        projectHeader.classList.add('font-league'); // Add class to the header
        projectHeader.style.color = '#FFF'; // Set the color

        // Center the header
        projectHeader.style.position = 'absolute';
        projectHeader.style.top = '47%';
        projectHeader.style.left = '50%';
        projectHeader.style.transform = 'translate(-50%, -50%)';
        
        // Assuming mainDisplay is a global variable or passed into this function
        mainDisplay.appendChild(projectHeader);
    }
}

// function removeHeader() {
//     const existingHeader = document.querySelector('h4[id$="-header"]');
//     if (existingHeader) {
//         existingHeader.remove();
//     }
// }

function animateLink(item) {
    const spanContainer = item.querySelectorAll('#spanWrap');
    let animationClass = '';

    
    animationClass = 'grow-and-color-change-project1';
    console.log("This is the spans", spanContainer[0]);
    spans = spanContainer[0].querySelectorAll('span');
    spans.forEach((span, index) => {
        console.log("this is span", span);
        span.classList.remove(animationClass); // Reset the animation
        span.offsetHeight; // Trigger reflow
        span.style.animationDelay = `${index * 0.02}s`; // Adjust delay for faster animation
        span.classList.add(animationClass);
        console.log(span.classList);
    });
    
}

function removeAnimateLink(item) {
    const spans = item.querySelectorAll('.span-wrap span');
    spans.forEach((span) => {
        span.classList.remove('grow-and-color-change-project1'); // Cancel the animation
        span.classList.remove('grow-and-color-change-project2'); // Cancel the animation
        span.classList.remove('grow-and-color-change-project3'); // Cancel the animation
        span.classList.remove('grow-and-color-change-project4'); // Cancel the animation
        span.style.color = ''; // Reset color to original if necessary
        span.style.transform = ''; // Reset transform to original if necessary
    });
}


document.addEventListener('DOMContentLoaded', function () {
    function setupPopup(iconId, popupId) {
        const icon = document.getElementById(iconId);
        const popup = document.getElementById(popupId);

        function showPopup() {
            console.log("show popup");
            popup.style.display = 'block';
        }

        function hidePopup() {
            console.log("hide popup");
            popup.style.display = 'none';
        }

        icon.addEventListener('mouseenter', showPopup);
        icon.addEventListener('mouseleave', hidePopup);

        // Ensure the popup box hides when the mouse leaves the popup box itself
        popup.addEventListener('mouseleave', hidePopup);
    }

    setupPopup('navbar-icon', 'popup-box');
    setupPopup('sidebar-icon', 'popup-sidebar');
});

function getProjectData(projectName) {
    console.log("GET PROJECT");
    return {
        project: projectName
    };
}

function animateCanvas(event) {
    event.preventDefault(); 
    const canvas = document.getElementById('main-canvas');
    const navbar = document.querySelector(".nav");
    console.log("animate canvas");
    // Example animation: resize the canvas
    canvas.style.transition = 'width 1s, height 1s, transform 2s, top 2s, left 2s, border-radius 2s';  // Include top and left in the transition
    canvas.style.width = '84px';  // New width
    canvas.style.height = '84px';  // New height
    canvas.style.top = '0px';  // Adjust top position
    canvas.style.left = '42px';  // Move right smoothly
    canvas.style.borderRadius = "1rem";
    // Return a promise that resolves when the animation ends
    mainDisplay.style.overflowY = "scroll";
    const navbarHeight = navbar.offsetHeight;
    mainDisplay.style.height = '0px';
    mainDisplay.style.height = `calc(100vh - ${navbarHeight}px)`;
    console.log(mainDisplay.style.height);
    return new Promise((resolve, reject) => {
        canvas.addEventListener('transitionend', resolve, { once: true });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.footer .card-2');
    if (card && isInViewport(card)) {
        card.classList.add('start-animation');
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect(); 
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


window.addEventListener('DOMContentLoaded', function() {
    const githubLink = document.getElementById('githubLink');
    console.log("GitHub link:", githubLink);

    if (githubLink) {
        console.log("GitHub link exists");
        githubLink.addEventListener('mouseover', function(event) {
            console.log("Hovering over GitHub link with id:", event.target.id);
            // Your additional logic here if needed
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const marqueeLeft = document.getElementById('marquee-left');
    const marqueeRight = document.getElementById('marquee-right');

    let currentPosition = 0;
    const speed = 2; // Speed of the marquee

    function animateMarquee() {
        currentPosition += speed;  // Move marquee upwards
     
        // marqueeLeft.style.transform = `translateX(${currentPosition}px)`;
        // marqueeRight.style.transform = `translateX(${currentPosition}px)`;

        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
});