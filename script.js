document.addEventListener('DOMContentLoaded', () => {
    // Button click counter functionality
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

    // Modal functionality
    const modal = document.getElementById('toolsModal');
    const closeBtn = document.querySelector('.close-modal');
    const viewToolsLink = document.querySelector('.cpc-hero-banner-landing__widget--outro a');

    // Open modal
    viewToolsLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}); 