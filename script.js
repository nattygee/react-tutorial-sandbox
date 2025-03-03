document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('clickMe');
    let clickCount = 0;

    button.addEventListener('click', () => {
        clickCount++;
        button.textContent = `Clicked ${clickCount} times!`;
        
        // Add a fun animation class
        button.classList.add('clicked');
        
        // Remove the animation class after it completes
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200);
    });
}); 