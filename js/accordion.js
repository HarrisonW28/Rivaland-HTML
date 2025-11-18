// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionToggles = document.querySelectorAll('.accordion-toggle, .accordion-toggle--page');
    
    // Function to update icon text
    function updateIcon(item, isActive) {
        const toggle = item.querySelector('.accordion-toggle, .accordion-toggle--page');
        if (toggle) {
            toggle.textContent = isActive ? '×' : '+';
        }
    }
    
    // Initialize icons for all items
    document.querySelectorAll('.service-item, .service-item--page').forEach(item => {
        const isActive = item.classList.contains('active');
        updateIcon(item, isActive);
    });
    
    // Function to update services card layout
    function updateServicesCardLayout() {
        const servicesSection = document.querySelector('.services');
        const hasActive = document.querySelector('.service-item.active');
        if (hasActive) {
            servicesSection.classList.add('has-active-accordion');
        } else {
            servicesSection.classList.remove('has-active-accordion');
        }
    }
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceItem = this.closest('.service-item, .service-item--page');
            const isActive = serviceItem.classList.contains('active');
            const servicesSection = document.querySelector('.services');
            
            // Keep the layout class active if we're switching between accordions
            const hasActiveBefore = servicesSection.classList.contains('has-active-accordion');
            const willHaveActive = !isActive;
            
            // If switching from one active accordion to another, maintain layout class
            if (hasActiveBefore && willHaveActive) {
                // Don't remove the class - keep it active during transition
            }
            
            // Close all accordions and reset icons
            document.querySelectorAll('.service-item, .service-item--page').forEach(item => {
                item.classList.remove('active');
                updateIcon(item, false);
            });
            
            // Toggle the clicked item
            if (!isActive) {
                serviceItem.classList.add('active');
                updateIcon(serviceItem, true);
            }
            
            // Update services card layout - this will maintain or update the class appropriately
            updateServicesCardLayout();
        });
    });
    
    // Also allow clicking on the header to toggle
    const serviceHeaders = document.querySelectorAll('.service-header, .service-header--page');
    serviceHeaders.forEach(header => {
        const serviceItem = header.closest('.service-item, .service-item--page');
        const toggleSelector = serviceItem.classList.contains('service-item--page') 
            ? '.accordion-toggle--page' 
            : '.accordion-toggle';
        if (serviceItem.querySelector(toggleSelector)) {
            header.addEventListener('click', function(e) {
                const toggle = header.querySelector(toggleSelector);
                if (e.target !== toggle) {
                    if (toggle) {
                        toggle.click();
                    }
                }
            });
        }
    });
    
    // Read more functionality for mobile services--page accordion
    const readMoreLinks = document.querySelectorAll('.service-read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const textFull = this.previousElementSibling; // .service-text-full
            const isExpanded = textFull.classList.contains('expanded');
            
            if (isExpanded) {
                textFull.classList.remove('expanded');
                this.classList.remove('expanded');
                this.querySelector('.read-more-text').textContent = 'Read more';
            } else {
                textFull.classList.add('expanded');
                this.classList.add('expanded');
                this.querySelector('.read-more-text').textContent = 'Read less';
            }
        });
    });
});

