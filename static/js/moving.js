document.addEventListener('DOMContentLoaded', function() {
    const mainText = document.getElementById('mainContent-text');
    const mainContent = document.getElementById('mainContent');

    let dx = 2; // Speed of the box along the x-axis
    let dy = 2; // Speed of the box along the y-axis

    // Calculate random initial positions within the bounds of mainContent
    const mh = mainContent.clientHeight;
    const mw = mainContent.clientWidth;
    const h = mainText.clientHeight;
    const w = mainText.clientWidth;

    let x = Math.random() * (mw - w); // Initial x-position
    let y = Math.random() * (mh - h); // Initial y-position

    function updatePosition() {
        // Update the position of the box
        x += dx;
        y += dy;

        // Check for collisions with the container borders and reverse direction if needed
        if (x + w > mw || x < 0) {
            dx *= -1; // Reverse the horizontal direction
        }
        if (y + h > mh || y < 0) {
            dy *= -1; // Reverse the vertical direction
        }

        // Apply the position changes to the element
        mainText.style.left = x + 'px';
        mainText.style.top = y + 'px';

        // Repeat the update function every few milliseconds
        requestAnimationFrame(updatePosition);
    }

    // Start the animation
    updatePosition();
});