// Projects Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('project-filter-input');
    const clearButton = document.getElementById('project-filter-clear');
    const projectCards = document.querySelectorAll('.project-card--index');

    if (!filterInput || !clearButton) return;

    // Show/hide clear button based on input value
    function toggleClearButton() {
        if (filterInput.value.length > 0) {
            clearButton.classList.add('visible');
        } else {
            clearButton.classList.remove('visible');
        }
    }

    // Filter projects based on input
    function filterProjects() {
        const searchTerm = filterInput.value.toLowerCase().trim();
        
        projectCards.forEach(card => {
            const meta = card.querySelector('.project-meta');
            const location = card.querySelector('.project-location');
            
            if (!meta || !location) return;
            
            const metaText = meta.textContent.toLowerCase();
            const locationText = location.textContent.toLowerCase();
            const cardText = metaText + ' ' + locationText;
            
            if (cardText.includes(searchTerm) || searchTerm === '') {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Clear filter input
    clearButton.addEventListener('click', function() {
        filterInput.value = '';
        filterInput.focus();
        toggleClearButton();
        filterProjects();
    });

    // Filter on input
    filterInput.addEventListener('input', function() {
        toggleClearButton();
        filterProjects();
    });

    // Initial state
    toggleClearButton();
});

