# WordPress Migration Plan - Rivaland HTML to WordPress

## Overview
This document outlines the complete migration plan for converting the Rivaland HTML/SCSS website to WordPress using the [Href Tailwind Starter](https://github.com/HarrisonW28/Rivaland-WP) boilerplate and ACF Block Manager.

---

## Phase 1: Setup & Configuration

### 1.1 WordPress Theme Setup
- [ ] Clone/install the Rivaland-WP boilerplate theme
- [ ] Install required dependencies: `npm install`
- [ ] Configure `tailwind.config.js` with Rivaland design tokens
- [ ] Set up WordPress development environment
- [ ] Install required plugins:
  - [ ] Advanced Custom Fields Pro (ACF)
  - [ ] ACF Blocks Manager
  - [ ] Custom Post Type UI (or use theme's CPT system)

### 1.2 Design Token Migration
**Location**: `tailwind.config.js`

Convert SCSS variables to Tailwind config:
```javascript
// Colors from scss/abstracts/_variables.scss
colors: {
  'rivaland-white': '#fff',
  'rivaland-black': '#000',
  'rivaland-primary': '#202A44',
  'rivaland-primary-dark': '#001428',
  'rivaland-primary-light': '#1a2b3c',
  'rivaland-primary-footer': '#1f2d47',
  'rivaland-accent': '#55c5e9',
  'rivaland-accent-teal': '#02635E',
  'rivaland-accent-teal-light': '#9CB7B2',
  'rivaland-text': '#102132',
  'rivaland-text-secondary': '#7a8796',
  'rivaland-border': '#d0d0d0',
  'rivaland-border-light': '#e0e5eb',
  'rivaland-border-mobile': '#a8b8c8',
  // Dark hero colors
  'rivaland-dark-blue': '#1F2B40',
  'rivaland-teal': '#1F7B7B',
}

// Spacing from scss/abstracts/_variables.scss
spacing: {
  'xs': '8px',
  'sm': '16px',
  'md': '20px',
  'lg': '24px',
  'xl': '28px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '60px',
  '5xl': '80px',
  '6xl': '100px',
}

// Typography
fontSize: {
  'xs': '14px',
  'sm': '15px',
  'base': '16px',
  'md': '18px',
  'lg': '20px',
  'xl': '22px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
  '5xl': '36px',
  '6xl': '42px',
  '7xl': '48px',
  '8xl': '56px',
}

// Breakpoints
screens: {
  'mobile': '480px',
  'tablet': '768px',
  'desktop': '1024px',
}
```

---

## Phase 2: Asset Migration

### 2.1 File Structure Mapping
```
HTML Project                    →  WordPress Theme
─────────────────────────────────────────────────
assets/                        →  wp-content/themes/rivaland/assets/
  ├── logo.svg                 →    ├── logo.svg
  ├── arrow.svg                →    ├── arrow.svg
  └── images/                  →    └── images/
      ├── header.jpg           →        ├── header.jpg
      ├── feature.jpg          →        ├── feature.jpg
      └── logo.jpg             →        └── logo.jpg

scss/                          →  wp-content/themes/rivaland/src/scss/
  ├── abstracts/               →    ├── abstracts/ (convert to Tailwind)
  ├── base/                    →    ├── base/ (convert to Tailwind)
  ├── components/              →    └── (convert to ACF blocks)
  └── layout/                  →    └── (convert to templates/partials)
```

### 2.2 Asset Migration Tasks
- [ ] Copy all SVG files to `assets/` directory
- [ ] Copy all images to `assets/images/` directory
- [ ] Optimize images for web (WebP conversion recommended)
- [ ] Update image paths in templates/blocks

---

## Phase 3: ACF Block Creation

### 3.1 Block Structure
Each component becomes an ACF block in `includes/blocks/`:

```
includes/blocks/
├── hero/
│   ├── block.json
│   ├── block.php
│   ├── template.php
│   ├── hero.scss
│   └── hero.js
├── hero-dark/
│   └── (same structure)
├── intro/
├── services/
├── feature/
├── projects/
├── news/
├── testimonial/
└── contact-form/
```

### 3.2 Block Conversion Map

| HTML Component | ACF Block Name | Block Type | Fields Needed |
|---------------|----------------|------------|---------------|
| Hero Section | `hero` | Layout | Heading, Subheading, Background Image, CTA |
| Dark Hero | `hero-dark` | Layout | Heading, Subheading, Highlight Text |
| Intro Section | `intro` | Content | Text Content |
| Services | `services` | Content | Eyebrow, Services List (Repeater) |
| Feature | `feature` | Layout | Image, Eyebrow, Content, CTA Button |
| Projects | `projects` | Content | Heading, Projects (Relationship/Repeater) |
| News | `news` | Content | News Items (Relationship/Repeater) |
| Testimonial | `testimonial` | Content | Quote, Author, Navigation |
| Contact Form | `contact-form` | Form | Form Fields |

### 3.3 Block Creation Steps

#### Example: Hero Block
1. **Generate block structure**:
   ```bash
   href-cli create-block
   # Block name: hero
   # Block type: Layout
   ```

2. **Configure `block.json`**:
   ```json
   {
     "name": "acf/hero",
     "title": "Hero Section",
     "description": "Full-width hero section with background image",
     "category": "layout",
     "icon": "cover-image",
     "keywords": ["hero", "banner", "header"],
     "supports": {
       "align": ["full"]
     }
   }
   ```

3. **Create ACF Field Group** (via ACF UI or JSON):
   - `hero_heading` (Text)
   - `hero_subheading` (Textarea)
   - `hero_background_image` (Image)
   - `hero_cta_text` (Text)
   - `hero_cta_link` (Link)

4. **Convert SCSS to Tailwind** in `hero.scss`:
   ```scss
   // Original: scss/layout/_hero.scss
   // Convert to Tailwind utility classes in template.php
   ```

5. **Create `template.php`**:
   ```php
   <?php
   $heading = get_field('hero_heading');
   $subheading = get_field('hero_subheading');
   $bg_image = get_field('hero_background_image');
   $cta_text = get_field('hero_cta_text');
   $cta_link = get_field('hero_cta_link');
   ?>
   
   <section class="hero h-screen bg-cover bg-center relative flex flex-col" 
            style="background-image: url('<?php echo $bg_image['url']; ?>');">
       <div class="hero-overlay absolute inset-5 bg-black bg-opacity-55"></div>
       <div class="hero-content relative z-10 max-w-4xl px-20 my-auto flex flex-col justify-center">
           <h1 class="text-white text-7xl font-light leading-tight">
               <?php echo esc_html($heading); ?>
           </h1>
       </div>
   </section>
   ```

---

## Phase 4: Custom Post Types & Taxonomies

### 4.1 Custom Post Types
**Location**: `includes/lib/cpt.php`

#### Projects Post Type
```php
register_post_type('project', [
    'labels' => [
        'name' => 'Projects',
        'singular_name' => 'Project',
    ],
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'menu_icon' => 'dashicons-portfolio',
    'rewrite' => ['slug' => 'projects'],
]);
```

**ACF Fields for Projects**:
- `project_meta` (Text) - e.g., "Residential / Application submitted"
- `project_status` (Text) - e.g., "Application submitted", "Sold"
- `project_location` (Text) - e.g., "Woodcote, South Oxfordshire"
- `project_image` (Image)
- `project_description` (WYSIWYG)

#### News Post Type
```php
register_post_type('news', [
    'labels' => [
        'name' => 'News',
        'singular_name' => 'News Article',
    ],
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'menu_icon' => 'dashicons-megaphone',
    'rewrite' => ['slug' => 'news'],
]);
```

**ACF Fields for News**:
- `news_eyebrow` (Text) - e.g., "Project news", "Opinion"
- `news_category` (Select) - "Company news", "Project updates", "Opinion"
- `news_featured_image` (Image)
- `news_date` (Date Picker)

### 4.2 Taxonomies
```php
// Project Type Taxonomy
register_taxonomy('project_type', 'project', [
    'labels' => [
        'name' => 'Project Types',
        'singular_name' => 'Project Type',
    ],
    'hierarchical' => true,
    'public' => true,
]);

// Project Status Taxonomy
register_taxonomy('project_status', 'project', [
    'labels' => [
        'name' => 'Project Status',
        'singular_name' => 'Status',
    ],
    'hierarchical' => false,
    'public' => true,
]);
```

---

## Phase 5: Page Templates

### 5.1 Template Files
**Location**: Root of theme directory

| HTML File | WordPress Template | Template Type |
|-----------|-------------------|---------------|
| `index.html` | `front-page.php` | Front Page Template |
| `about.html` | `page-about.php` or `page.php` | Page Template |
| `services.html` | `page-services.php` | Page Template |
| `projects.html` | `archive-project.php` | Archive Template |
| `news.html` | `archive-news.php` | Archive Template |
| `contact.html` | `page-contact.php` | Page Template |
| - | `single-project.php` | Single Post Template |
| - | `single-news.php` | Single Post Template |

### 5.2 Template Structure Example

#### `front-page.php`
```php
<?php
/**
 * Template Name: Front Page
 * 
 * The front page template - uses ACF blocks
 */

get_header();
?>

<main id="main" class="site-main">
    <?php
    // Display ACF blocks
    if (have_rows('page_blocks')) {
        while (have_rows('page_blocks')) {
            the_row();
            $block_name = get_row_layout();
            echo render_block_template($block_name);
        }
    }
    ?>
</main>

<?php get_footer(); ?>
```

#### `archive-project.php`
```php
<?php
get_header();
?>

<header class="hero hero-dark">
    <?php get_template_part('partials/navigation'); ?>
    <div class="hero-content">
        <h1>Our <span class="highlight">projects</span></h1>
    </div>
</header>

<main>
    <section class="intro">
        <p><?php echo get_field('archive_intro', 'option'); ?></p>
    </section>
    
    <section class="projects">
        <?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                get_template_part('partials/project-card');
            }
        }
        ?>
    </section>
</main>

<?php get_footer(); ?>
```

---

## Phase 6: Navigation & Menus

### 6.1 Menu Registration
**Location**: `functions.php` or `includes/lib/menus.php`

```php
register_nav_menus([
    'primary' => 'Primary Navigation',
    'footer' => 'Footer Navigation',
]);
```

### 6.2 Navigation Template
**Location**: `includes/partials/navigation.php`

Convert HTML navigation to WordPress `wp_nav_menu()`:
```php
<nav class="nav">
    <div class="logo">
        <a href="<?php echo home_url(); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.svg" alt="logo">
        </a>
    </div>
    
    <button class="menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <?php
    wp_nav_menu([
        'theme_location' => 'primary',
        'container' => false,
        'menu_class' => 'nav-links',
        'items_wrap' => '<ul class="%2$s">%3$s</ul>',
        'add_li_class' => 'nav-item',
    ]);
    ?>
    
    <a href="<?php echo get_permalink(get_page_by_path('contact')); ?>" class="contact-btn">
        Contact us
        <svg class="arrow" width="19" height="16" viewBox="0 0 19 16" fill="none">
            <path d="M11 0.5L18.5 8M18.5 8L11 15.5M18.5 8H0.5" stroke="currentColor"/>
        </svg>
    </a>
</nav>
```

### 6.3 Menu Setup Tasks
- [ ] Create Primary Menu in WordPress admin
- [ ] Add menu items: About, Services, Projects, News
- [ ] Add mobile menu items (divider, contact button)
- [ ] Test mobile menu functionality

---

## Phase 7: SCSS to Tailwind Conversion

### 7.1 Conversion Strategy

#### Option A: Full Tailwind Conversion (Recommended)
- Convert all SCSS to Tailwind utility classes
- Use `@apply` directive for complex components
- Maintain responsive breakpoints in Tailwind config

#### Option B: Hybrid Approach
- Keep complex components in SCSS
- Use Tailwind for layout and utilities
- Import SCSS files in `style.scss`

### 7.2 Component Conversion Examples

#### Hero Component
**Before (SCSS)**:
```scss
.hero {
    height: 100vh;
    background: url("assets/images/header.jpg") center center/cover no-repeat;
    position: relative;
    
    &::before {
        content: "";
        position: absolute;
        top: 20px;
        right: 20px;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 20, 40, 0.55);
    }
}
```

**After (Tailwind)**:
```php
<section class="hero h-screen bg-cover bg-center bg-no-repeat relative" 
         style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/images/header.jpg');">
    <div class="absolute inset-5 bg-rivaland-primary-dark bg-opacity-55"></div>
</section>
```

#### Services Accordion
**Before (SCSS)**:
```scss
.service-item {
    border-bottom: 1px solid $color-border;
    
    &.active {
        .service-content {
            max-height: 500px;
        }
    }
}
```

**After (Tailwind + JS)**:
```php
<article class="service-item border-b border-rivaland-border">
    <div class="service-header flex items-center justify-between p-6 cursor-pointer">
        <p class="text-rivaland-primary text-xl"><?php echo $service_title; ?></p>
        <button class="accordion-toggle">+</button>
    </div>
    <div class="service-content max-h-0 overflow-hidden transition-all duration-500">
        <!-- Content -->
    </div>
</article>
```

### 7.3 Responsive Styles
Convert media queries to Tailwind responsive prefixes:

**Before**:
```scss
@media (max-width: 768px) {
    .hero {
        height: 100vh;
        min-height: 600px;
    }
}
```

**After**:
```php
<section class="hero h-screen min-h-[600px] md:h-screen">
```

---

## Phase 8: JavaScript Migration

### 8.1 Script Files
**Location**: `src/js/` or `assets/js/`

| Current File | WordPress Location | Purpose |
|--------------|-------------------|---------|
| `script.js` | `src/js/main.js` | Main JavaScript file |

### 8.2 JavaScript Tasks
- [ ] Convert mobile menu toggle functionality
- [ ] Convert services accordion functionality
- [ ] Convert button movement on mobile (services/projects)
- [ ] Add testimonial slider functionality
- [ ] Enqueue scripts properly in `functions.php`

### 8.3 Script Enqueuing
**Location**: `functions.php`

```php
function rivaland_enqueue_scripts() {
    wp_enqueue_script(
        'rivaland-main',
        get_template_directory_uri() . '/assets/js/main.js',
        ['jquery'],
        '1.0.0',
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('rivaland-main', 'rivalandData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('rivaland_nonce'),
    ]);
}
add_action('wp_enqueue_scripts', 'rivaland_enqueue_scripts');
```

---

## Phase 9: Forms & Contact

### 9.1 Contact Form Block
**Location**: `includes/blocks/contact-form/`

**ACF Fields**:
- Form fields (Name, Email, Telephone, Message)
- Success message
- Email recipient

**Options**:
1. Use ACF Form addon
2. Use Contact Form 7 integration
3. Use Gravity Forms integration
4. Custom form handler with AJAX

### 9.2 Form Handler
**Location**: `includes/lib/form-handler.php`

```php
function handle_contact_form() {
    check_ajax_referer('rivaland_nonce', 'nonce');
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Send email
    wp_mail(
        get_option('admin_email'),
        'New Contact Form Submission',
        $message,
        ['From: ' . $name . ' <' . $email . '>']
    );
    
    wp_send_json_success(['message' => 'Thank you for your message!']);
}
add_action('wp_ajax_contact_form', 'handle_contact_form');
add_action('wp_ajax_nopriv_contact_form', 'handle_contact_form');
```

---

## Phase 10: Build Process Setup

### 10.1 Update package.json Scripts
```json
{
  "scripts": {
    "development": "mix",
    "watch": "mix watch",
    "production": "mix --production"
  }
}
```

### 10.2 Webpack/Mix Configuration
**Location**: `webpack.mix.js`

```javascript
const mix = require('laravel-mix');

mix.js('src/js/main.js', 'assets/js')
   .sass('src/scss/style.scss', 'assets/css')
   .options({
       processCssUrls: false
   })
   .browserSync('rivaland.local');
```

### 10.3 Build Tasks
- [ ] Configure Tailwind purge settings
- [ ] Set up source maps for development
- [ ] Configure asset versioning
- [ ] Test production build

---

## Phase 11: Testing & Quality Assurance

### 11.1 Functionality Testing
- [ ] Test all ACF blocks render correctly
- [ ] Test mobile menu functionality
- [ ] Test accordion interactions
- [ ] Test form submissions
- [ ] Test navigation links
- [ ] Test responsive breakpoints
- [ ] Test custom post type archives
- [ ] Test single post templates

### 11.2 Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 11.3 Performance Testing
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Lazy loading images
- [ ] Caching setup
- [ ] Page speed optimization

---

## Phase 12: Content Migration

### 12.1 Content Import Tasks
- [ ] Create pages in WordPress admin
- [ ] Import content from HTML files
- [ ] Set up ACF field groups
- [ ] Configure block layouts for each page
- [ ] Import projects as custom post type
- [ ] Import news articles as custom post type
- [ ] Set featured images
- [ ] Configure permalinks

### 12.2 Page Setup Checklist
- [ ] Front Page (Home)
- [ ] About Page
- [ ] Services Page
- [ ] Projects Archive Page
- [ ] News Archive Page
- [ ] Contact Page
- [ ] Individual Project Pages
- [ ] Individual News Article Pages

---

## Phase 13: Deployment

### 13.1 Pre-Deployment Checklist
- [ ] Run production build: `npm run production`
- [ ] Test all functionality in staging
- [ ] Optimize database
- [ ] Set up proper permalinks
- [ ] Configure environment variables
- [ ] Set up backup system

### 13.2 Deployment Steps
- [ ] Upload theme files to production
- [ ] Activate theme
- [ ] Import ACF field groups (if using JSON)
- [ ] Configure menus
- [ ] Set homepage
- [ ] Test live site
- [ ] Set up SSL certificate
- [ ] Configure caching plugin

---

## File Structure Reference

### Final WordPress Theme Structure
```
wp-content/themes/rivaland/
├── assets/
│   ├── css/
│   │   └── style.css (compiled)
│   ├── js/
│   │   └── main.js (compiled)
│   ├── images/
│   ├── logo.svg
│   └── arrow.svg
├── includes/
│   ├── blocks/
│   │   ├── hero/
│   │   ├── hero-dark/
│   │   ├── intro/
│   │   ├── services/
│   │   ├── feature/
│   │   ├── projects/
│   │   ├── news/
│   │   ├── testimonial/
│   │   └── contact-form/
│   ├── lib/
│   │   ├── cpt.php
│   │   ├── menus.php
│   │   ├── form-handler.php
│   │   └── methods.php
│   └── partials/
│       ├── navigation.php
│       ├── footer.php
│       └── project-card.php
├── src/
│   ├── js/
│   │   └── main.js
│   └── scss/
│       └── style.scss
├── templates/
│   ├── front-page.php
│   ├── page-about.php
│   ├── page-services.php
│   ├── page-contact.php
│   ├── archive-project.php
│   ├── archive-news.php
│   ├── single-project.php
│   └── single-news.php
├── acf-json/ (ACF field group exports)
├── functions.php
├── style.css (theme header)
├── index.php
├── header.php
├── footer.php
├── sidebar.php
├── package.json
├── webpack.mix.js
└── tailwind.config.js
```

---

## Key Considerations

### ACF Block Manager Best Practices
1. **Block Naming**: Use clear, descriptive names (e.g., `acf/hero`, `acf/services`)
2. **Field Groups**: Organize by block or page type
3. **Reusable Fields**: Create field groups that can be reused
4. **JSON Export**: Export ACF field groups to `acf-json/` for version control

### Tailwind Conversion Tips
1. **Custom Utilities**: Add custom utilities in `tailwind.config.js` for complex patterns
2. **@apply Directive**: Use for component-like patterns that repeat
3. **Responsive Design**: Use Tailwind's responsive prefixes (`md:`, `lg:`, etc.)
4. **Purge Configuration**: Ensure all template files are included in purge

### Performance Optimization
1. **Image Optimization**: Use WebP format with fallbacks
2. **Lazy Loading**: Implement for images below the fold
3. **Code Splitting**: Split JavaScript by page/block type
4. **Caching**: Set up proper caching headers

---

## Timeline Estimate

| Phase | Estimated Time | Priority |
|-------|---------------|----------|
| Phase 1: Setup | 4-6 hours | High |
| Phase 2: Assets | 2-3 hours | High |
| Phase 3: ACF Blocks | 16-24 hours | High |
| Phase 4: CPTs | 4-6 hours | High |
| Phase 5: Templates | 8-12 hours | High |
| Phase 6: Navigation | 4-6 hours | Medium |
| Phase 7: SCSS Conversion | 12-16 hours | High |
| Phase 8: JavaScript | 6-8 hours | Medium |
| Phase 9: Forms | 4-6 hours | Medium |
| Phase 10: Build Process | 4-6 hours | High |
| Phase 11: Testing | 8-12 hours | High |
| Phase 12: Content | 6-8 hours | Medium |
| Phase 13: Deployment | 4-6 hours | High |

**Total Estimated Time**: 78-119 hours (2-3 weeks full-time)

---

## Resources & Documentation

- [ACF Blocks Documentation](https://www.advancedcustomfields.com/resources/blocks/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
- [Href Tailwind Starter](https://github.com/HarrisonW28/Rivaland-WP)

---

## Notes

- Keep original HTML/SCSS files for reference during migration
- Test each block individually before moving to the next
- Use Git for version control throughout the process
- Document any custom functionality or workarounds
- Consider creating a staging environment for testing

