# Mobile Responsive Styles - Next.js Ready

## Breakpoints
```css
/* Breakpoints */
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
```

## Spacing Variables
```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 20px;
--spacing-lg: 24px;
--spacing-xl: 28px;
--spacing-2xl: 32px;
--spacing-3xl: 40px;
--spacing-4xl: 60px;
--spacing-5xl: 80px;
--spacing-6xl: 100px;
```

## Typography Variables
```css
--font-size-xs: 14px;
--font-size-sm: 15px;
--font-size-base: 16px;
--font-size-md: 18px;
--font-size-lg: 20px;
--font-size-xl: 22px;
--font-size-2xl: 24px;
--font-size-3xl: 28px;
--font-size-4xl: 32px;
--font-size-5xl: 36px;
--font-size-6xl: 42px;
--font-size-7xl: 48px;
```

## Color Variables
```css
--color-white: #fff;
--color-black: #000;
--color-primary: #202A44;
--color-primary-footer: #1f2d47;
--color-accent-teal-light: #9CB7B2;
--color-border: #d0d0d0;
--color-border-light: #e0e5eb;
--color-border-mobile: #a8b8c8;
```

---

## Mobile Styles (≤768px)

### Navigation & Hero

```css
@media (max-width: 768px) {
  /* Nav */
  .nav {
    padding: 24px 40px;
  }

  .nav.menu-open {
    position: relative;
    z-index: 1001;
  }

  body.menu-open {
    overflow: hidden;
  }

  /* Menu Toggle */
  .menu-toggle {
    display: flex;
    order: 2;
    position: relative;
    z-index: 1002;
  }

  /* Desktop Contact Button - Hide */
  .contact-btn {
    display: none;
  }

  /* Mobile Navigation Links */
  .nav-links {
    display: flex;
    position: fixed;
    top: -100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1f2d47;
    flex-direction: column;
    padding: 80px 20px 0;
    gap: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    overflow-y: auto;
    transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav.menu-open .nav-links {
    top: 0;
  }

  .nav-links > li:not(.mobile-contact):not(.mobile-divider):not(.mobile-logo) {
    border-bottom: none;
  }

  .nav-links a {
    font-size: 48px;
    padding: 8px 0;
    display: block;
    color: #fff;
    text-decoration: none;
  }

  /* Mobile Divider */
  .mobile-divider {
    display: block;
    height: 1px;
    background: #a8b8c8;
    margin: 0;
    padding: 0;
    margin-top: auto;
    margin-bottom: 0;
    width: 100vw;
    margin-left: -20px;
    position: relative;
  }

  /* Mobile Contact Button */
  .mobile-contact {
    display: block;
    padding: 20px 0 20px 20px;
    position: relative;
    z-index: 1;
    margin-bottom: 60px;
  }

  .contact-btn-mobile {
    font-size: 24px;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    white-space: nowrap;
  }

  .contact-text {
    flex: 0 0 auto;
  }

  .contact-arrow {
    position: absolute;
    right: -20px;
    display: inline-flex;
    align-items: center;
  }

  .contact-arrow .button-arrow {
    width: 19px;
    height: 16px;
    flex-shrink: 0;
    display: block;
    filter: brightness(0) invert(1);
  }

  /* Mobile Logo - Hidden by default, shown when menu open */
  .nav-links .mobile-logo {
    display: none;
    padding: 20px;
    margin: 0;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0;
    z-index: 0;
  }

  .nav.menu-open .nav-links .mobile-logo {
    display: block;
  }

  .mobile-logo-img {
    width: 100%;
    max-width: 100%;
    height: auto;
    opacity: 0.4;
    display: block;
    padding: 0;
  }

  /* Logo */
  .logo {
    order: 1;
    position: relative;
    z-index: 1002;
  }

  .logo img {
    height: 20px;
  }

  /* Hero */
  .hero {
    height: 100vh;
    min-height: 600px;
  }

  .hero::before {
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
  }

  .hero-content {
    padding: 0 40px;
    margin: auto 0;
  }

  .hero-content h1 {
    font-size: 42px;
    line-height: 1.2;
  }
}
```

### Intro Section

```css
@media (max-width: 768px) {
  .intro {
    max-width: 100%;
    margin: 40px auto 20px;
    padding: 40px 20px;
    font-size: 18px;
    line-height: 1.6;
  }
}
```

### Services Section

```css
@media (max-width: 768px) {
  .services {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .services-card {
    padding: 0 16px;
    order: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    border-left: none;
    border-right: none;
  }

  .services-card .eyebrow {
    font-size: 22px;
    margin-bottom: 24px;
    order: 1;
    padding: 0;
  }

  .services-card .link-button {
    display: none;
  }

  .service-list {
    order: 2;
    border-left: none;
    border-right: none;
  }

  /* Mobile Button (moved after Planning via JS) */
  .link-button-mobile {
    order: 3;
    display: flex !important;
    width: calc(100% - 40px);
    max-width: 100%;
    margin: 24px 20px 60px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #9CB7B2;
    background: #fff;
    padding: 12px 20px;
    color: #000;
    text-decoration: none;
    font-family: Roboto;
    font-weight: 300;
    font-size: 18px;
    line-height: 38px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .link-button-mobile:hover {
    background-color: #202A44;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .service-header {
    padding: 20px;
  }

  .service-header p {
    font-size: 18px;
  }

  .service-content {
    padding: 0 20px;
  }

  .service-item.active .service-content {
    padding: 20px;
  }

  .service-button {
    max-width: 100%;
    width: 100%;
  }
}
```

### Feature Section

```css
@media (max-width: 768px) {
  .feature {
    grid-template-columns: 1fr;
  }

  .feature-image {
    padding: 40px 20px;
    align-items: flex-start;
  }

  .feature-image img {
    max-width: 100%;
  }

  .feature-copy {
    padding: 40px 20px;
  }

  .feature-copy p {
    font-size: 22px;
    max-width: 100%;
  }

  .feature-copy .link-button {
    max-width: 100%;
    width: 100%;
  }

  .feature-eyebrow {
    font-size: 22px;
  }
}
```

### Projects Section

```css
@media (max-width: 768px) {
  .projects {
    display: flex;
    flex-direction: column;
  }

  .projects-left {
    padding: 40px;
    order: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .projects-left h2 {
    font-size: 34px;
    margin-bottom: 24px;
    order: 1;
  }

  .projects-left .projects-button {
    display: none;
  }

  .project-list {
    order: 2;
    border: none;
    border-top: 1px solid #d0d0d0;
  }

  .project-card {
    padding: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .project-card .project-info {
    width: 100%;
  }

  .project-card .project-location br {
    display: block;
  }

  .project-card .arrow-link {
    align-self: flex-end;
    margin-top: auto;
    margin-right: 20px;
    margin-bottom: 8px;
    width: 32px;
    height: 32px;
  }

  .project-card:last-child {
    border-bottom: 1px solid #e0e5eb;
  }

  /* Mobile Button (moved after project-list via JS) */
  .projects-button-mobile {
    order: 3;
    display: flex !important;
    width: calc(100% - 40px);
    max-width: 100%;
    margin: 24px 20px 60px;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #9CB7B2;
    background: #fff;
    color: #000;
    text-decoration: none;
    font-family: Roboto;
    font-weight: 300;
    font-size: 18px;
    line-height: 38px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .projects-button-mobile:hover {
    background-color: #202A44;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

### News Section

```css
@media (max-width: 768px) {
  .news {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    gap: 20px;
  }

  .news-card {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 400px;
  }

  .news-card img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
  }

  .news-content {
    padding: 24px 20px;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .news-title {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .news-arrow {
    position: static;
    display: flex;
    margin-top: 20px;
    align-self: flex-end;
    width: 22px;
    height: 22px;
  }

  .news-eyebrow {
    font-size: 14px;
  }
}
```

### Footer

```css
@media (max-width: 768px) {
  .site-footer {
    padding-top: 40px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }

  .footer-links {
    margin-left: 0;
  }

  .footer-divider {
    margin: 30px 20px;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }

  .footer-bottom > div:empty {
    display: none;
  }

  .footer-copyright {
    white-space: normal;
  }

  .footer-copyright p,
  .footer-credit p {
    font-size: 14px;
  }

  .footer-logo {
    margin-top: 40px;
    padding: 0 20px;
  }

  .footer-logo img {
    width: 100%;
  }
}
```

---

## Small Mobile Styles (≤480px)

```css
@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 36px;
  }

  .intro {
    font-size: 16px;
    padding: 30px 20px;
  }

  .services-card .eyebrow {
    font-size: 22px;
  }

  .feature-eyebrow {
    font-size: 22px;
  }

  .projects-left h2 {
    font-size: 34px;
  }

  .nav {
    padding: 20px 32px;
  }

  .hero-content {
    padding: 0 32px;
  }
}
```

---

## Desktop - Hide Line Breaks in Project Locations

```css
/* Desktop - Hide line breaks after comma */
.project-location br {
  display: none;
}
```

---

## JavaScript Functions Needed

### Mobile Menu Toggle
```javascript
// Toggle menu open/closed
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const body = document.body;

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
  menuToggle.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('menu-open');
    menuToggle.classList.remove('active');
    body.classList.remove('menu-open');
  });
});
```

### Move Services Button on Mobile
```javascript
function moveButtonOnMobile() {
  const linkButton = document.querySelector('.services-card .link-button');
  const serviceList = document.querySelector('.service-list');
  
  if (window.innerWidth <= 768) {
    if (!linkButton.classList.contains('link-button-mobile')) {
      linkButton.classList.add('link-button-mobile');
      if (serviceList && serviceList.nextSibling) {
        serviceList.parentNode.insertBefore(linkButton, serviceList.nextSibling);
      } else if (serviceList) {
        serviceList.parentNode.appendChild(linkButton);
      }
    }
  } else {
    if (linkButton.classList.contains('link-button-mobile')) {
      linkButton.classList.remove('link-button-mobile');
      const servicesCard = document.querySelector('.services-card');
      if (servicesCard) {
        servicesCard.appendChild(linkButton);
      }
    }
  }
}

window.addEventListener('resize', moveButtonOnMobile);
moveButtonOnMobile();
```

### Move Projects Button on Mobile
```javascript
function moveProjectsButtonOnMobile() {
  const projectsButton = document.querySelector('.projects-left .projects-button');
  const projectList = document.querySelector('.project-list');
  
  if (window.innerWidth <= 768) {
    if (!projectsButton.classList.contains('projects-button-mobile')) {
      projectsButton.classList.add('projects-button-mobile');
      if (projectList && projectList.nextSibling) {
        projectList.parentNode.insertBefore(projectsButton, projectList.nextSibling);
      } else if (projectList) {
        projectList.parentNode.appendChild(projectsButton);
      }
    }
  } else {
    if (projectsButton.classList.contains('projects-button-mobile')) {
      projectsButton.classList.remove('projects-button-mobile');
      const projectsLeft = document.querySelector('.projects-left');
      if (projectsLeft) {
        projectsLeft.appendChild(projectsButton);
      }
    }
  }
}

window.addEventListener('resize', moveProjectsButtonOnMobile);
moveProjectsButtonOnMobile();
```

---

## Notes for Next.js Implementation

1. **CSS Modules**: Convert class names to camelCase (e.g., `.nav-links` → `.navLinks`)
2. **Tailwind**: Use `@apply` or convert to Tailwind utility classes
3. **Styled Components**: Wrap styles in template literals
4. **Button Hover Effect**: The hover effect includes:
   - Background color change to `#202A44`
   - Text color change to white
   - Transform: `translateY(-2px)`
   - Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
5. **Z-index values**: 
   - Menu: 1000
   - Menu open: 1001
   - Menu toggle active: 1002
6. **Line breaks in project locations**: Use `<br>` tags in HTML, hide on desktop with CSS

