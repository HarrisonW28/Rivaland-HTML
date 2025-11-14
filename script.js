// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    // Function to update icon text
    function updateIcon(item, isActive) {
        const toggle = item.querySelector('.accordion-toggle');
        if (toggle) {
            toggle.textContent = isActive ? '×' : '+';
        }
    }
    
    // Initialize icons for all items
    document.querySelectorAll('.service-item').forEach(item => {
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
            const serviceItem = this.closest('.service-item');
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
            document.querySelectorAll('.service-item').forEach(item => {
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
    const serviceHeaders = document.querySelectorAll('.service-header');
    serviceHeaders.forEach(header => {
        const serviceItem = header.closest('.service-item');
        if (serviceItem.querySelector('.accordion-toggle')) {
            header.addEventListener('click', function(e) {
                if (e.target !== header.querySelector('.accordion-toggle')) {
                    const toggle = header.querySelector('.accordion-toggle');
                    if (toggle) {
                        toggle.click();
                    }
                }
            });
        }
    });
});

// Move "What we offer" button after Planning on mobile
document.addEventListener('DOMContentLoaded', function() {
    function moveButtonOnMobile() {
        const linkButton = document.querySelector('.services-card .link-button');
        const planningItem = document.querySelector('.service-item:last-child'); // Planning is last
        const servicesSection = document.querySelector('.services');
        const serviceList = document.querySelector('.service-list');
        
        if (!linkButton || !planningItem || !servicesSection) return;
        
        // Check if mobile (window width <= 768px)
        if (window.innerWidth <= 768) {
            // Check if button hasn't been moved yet
            if (!linkButton.classList.contains('link-button-mobile')) {
                linkButton.classList.add('link-button-mobile');
                linkButton.classList.remove('link-button-offset');
                // Move button after Planning item (but outside service-list, as a sibling)
                if (serviceList && serviceList.nextSibling) {
                    serviceList.parentNode.insertBefore(linkButton, serviceList.nextSibling);
                } else if (serviceList) {
                    serviceList.parentNode.appendChild(linkButton);
                }
            }
        } else {
            // Desktop: move back to original position
            if (linkButton.classList.contains('link-button-mobile')) {
                linkButton.classList.remove('link-button-mobile');
                linkButton.classList.add('link-button-offset');
                const servicesCard = document.querySelector('.services-card');
                if (servicesCard) {
                    servicesCard.appendChild(linkButton);
                }
            }
        }
    }
    
    // Run on load and resize
    moveButtonOnMobile();
    window.addEventListener('resize', moveButtonOnMobile);
});

// Move "View all projects" button after project list on mobile
document.addEventListener('DOMContentLoaded', function() {
    function moveProjectsButtonOnMobile() {
        const projectsButton = document.querySelector('.projects-left .projects-button');
        const projectList = document.querySelector('.project-list');
        const projectsSection = document.querySelector('.projects');
        
        if (!projectsButton || !projectList || !projectsSection) return;
        
        // Check if mobile (window width <= 768px)
        if (window.innerWidth <= 768) {
            // Check if button hasn't been moved yet
            if (!projectsButton.classList.contains('projects-button-mobile')) {
                projectsButton.classList.add('projects-button-mobile');
                // Move button after project list
                if (projectList && projectList.nextSibling) {
                    projectList.parentNode.insertBefore(projectsButton, projectList.nextSibling);
                } else if (projectList) {
                    projectList.parentNode.appendChild(projectsButton);
                }
            }
        } else {
            // Desktop: move back to original position
            if (projectsButton.classList.contains('projects-button-mobile')) {
                projectsButton.classList.remove('projects-button-mobile');
                const projectsLeft = document.querySelector('.projects-left');
                if (projectsLeft) {
                    projectsLeft.appendChild(projectsButton);
                }
            }
        }
    }
    
    // Run on load and resize
    moveProjectsButtonOnMobile();
    window.addEventListener('resize', moveProjectsButtonOnMobile);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('menu-open');
            menuToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
});

