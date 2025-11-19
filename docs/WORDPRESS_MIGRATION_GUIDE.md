# WordPress Migration Guide with ACF

Complete guide for migrating the Rivaland HTML project to WordPress using Advanced Custom Fields (ACF).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [WordPress Theme Setup](#wordpress-theme-setup)
3. [ACF Field Groups Configuration](#acf-field-groups-configuration)
4. [Template Files Structure](#template-files-structure)
5. [Component Integration](#component-integration)
6. [Asset Management](#asset-management)
7. [JavaScript Integration](#javascript-integration)
8. [Navigation Setup](#navigation-setup)
9. [Page-by-Page Migration](#page-by-page-migration)
10. [Testing Checklist](#testing-checklist)

---

## Prerequisites

### Required WordPress Plugins
- **Advanced Custom Fields Pro** (or ACF Free with limitations)
- **ACF to REST API** (optional, for headless WordPress)

### Required Knowledge
- Basic WordPress theme development
- PHP templating
- ACF field configuration
- SCSS/CSS compilation

---

## WordPress Theme Setup

### 1. Create Theme Directory Structure

```
wp-content/themes/rivaland/
├── style.css                    # Theme stylesheet (header)
├── functions.php                # Theme functions
├── index.php                    # Main template
├── header.php                   # Header template
├── footer.php                   # Footer template
├── single.php                   # Single post template
├── page.php                     # Default page template
├── templates/                   # Page templates
│   ├── page-home.php
│   ├── page-about.php
│   ├── page-services.php
│   ├── page-projects.php
│   ├── page-news.php
│   └── page-contact.php
├── components/                  # Reusable components (already exist)
│   ├── button.php
│   ├── card.php
│   ├── eyebrow.php
│   ├── icon-arrow.php
│   └── section.php
├── template-parts/              # Template parts
│   ├── hero.php
│   ├── navigation.php
│   ├── intro.php
│   ├── accordion.php
│   ├── feature.php
│   ├── projects.php
│   ├── news.php
│   └── testimonials.php
├── assets/
│   ├── css/
│   │   └── style.css           # Compiled SCSS
│   ├── js/
│   │   ├── accordion.js
│   │   ├── approach.js
│   │   ├── footer.js
│   │   ├── mobile-layout.js
│   │   ├── mobile-menu.js
│   │   ├── projects-filter.js
│   │   └── testimonials.js
│   ├── images/                 # All images
│   └── svg/                    # SVG files
└── scss/                       # Source SCSS files (keep for development)
    └── (existing structure)
```

### 2. Theme Header (style.css)

```css
/*
Theme Name: Rivaland
Theme URI: https://rivaland.co.uk
Description: Custom WordPress theme for Rivaland
Version: 1.0.0
Author: Your Name
Author URI: https://yourwebsite.com
*/
```

### 3. functions.php Setup

```php
<?php
/**
 * Rivaland Theme Functions
 */

// Theme Setup
function rivaland_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    
    // Register Navigation Menus
    register_nav_menus([
        'primary' => 'Primary Navigation',
        'footer' => 'Footer Navigation'
    ]);
}
add_action('after_setup_theme', 'rivaland_setup');

// Enqueue Styles
function rivaland_styles() {
    wp_enqueue_style('rivaland-style', get_template_directory_uri() . '/assets/css/style.css', [], '1.0.0');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', [], null);
}
add_action('wp_enqueue_scripts', 'rivaland_styles');

// Enqueue Scripts
function rivaland_scripts() {
    wp_enqueue_script('accordion', get_template_directory_uri() . '/assets/js/accordion.js', [], '1.0.0', true);
    wp_enqueue_script('approach', get_template_directory_uri() . '/assets/js/approach.js', [], '1.0.0', true);
    wp_enqueue_script('footer', get_template_directory_uri() . '/assets/js/footer.js', [], '1.0.0', true);
    wp_enqueue_script('mobile-layout', get_template_directory_uri() . '/assets/js/mobile-layout.js', [], '1.0.0', true);
    wp_enqueue_script('mobile-menu', get_template_directory_uri() . '/assets/js/mobile-menu.js', [], '1.0.0', true);
    wp_enqueue_script('projects-filter', get_template_directory_uri() . '/assets/js/projects-filter.js', [], '1.0.0', true);
    wp_enqueue_script('testimonials', get_template_directory_uri() . '/assets/js/testimonials.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'rivaland_scripts');

// ACF Options Page
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Theme Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug' => 'theme-settings',
        'capability' => 'edit_posts',
    ]);
}
```

---

## ACF Field Groups Configuration

### 1. Home Page Fields

**Field Group Name**: `Home Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | |
| └─ Hero Title | `hero_title` | Textarea | Main heading text |
| └─ Hero Highlight Text | `hero_highlight` | Text | Text for highlight span |
| └─ Hero Background Image | `hero_background` | Image | Background image for hero |
| └─ Hero Variant | `hero_variant` | Select | Options: home, about, services |
| └─ Hero Color Scheme | `hero_color_scheme` | Select | Options: light, dark |
| Intro Section | `intro_section` | Group | |
| └─ Intro Text | `intro_text` | Wysiwyg | Introduction paragraph |
| Services Accordion | `services_accordion` | Group | |
| └─ Card Eyebrow | `card_eyebrow` | Text | "Meeting all demands..." |
| └─ Button Text | `button_text` | Text | "What we offer" |
| └─ Button URL | `button_url` | URL | Link to services page |
| └─ Accordion Items | `accordion_items` | Repeater | |
| └─ └─ Title | `title` | Text | Service name |
| └─ └─ Content | `content` | Wysiwyg | Service description |
| └─ └─ Button Text | `button_text` | Text | "Discover more" |
| └─ └─ Button URL | `button_url` | URL | Link URL |
| └─ └─ Active by Default | `active` | True/False | Open by default |

**Location Rules**: Page Template is equal to Home

### 2. About Page Fields

**Field Group Name**: `About Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | (Same as Home) |
| Intro Section | `intro_section` | Group | (Same as Home) |
| Values Accordion | `values_accordion` | Group | |
| └─ Eyebrow | `eyebrow` | Text | "The values that underpin..." |
| └─ Values | `values` | Repeater | |
| └─ └─ Title | `title` | Text | Value name (Honesty, Excellence, etc.) |
| └─ └─ Description | `description` | Wysiwyg | Value description |
| Team Section | `team_section` | Group | |
| └─ Image | `image` | Image | Team member photo |
| └─ Heading | `heading` | Text | "Led by Andy Wilkins" |
| └─ Description | `description` | Wysiwyg | Team member bio |
| └─ LinkedIn URL | `linkedin_url` | URL | LinkedIn profile |
| Approach Section | `approach_section` | Group | |
| └─ Title | `title` | Text | "Our approach" |
| └─ Steps | `steps` | Repeater | |
| └─ └─ Heading | `heading` | Text | Step title |
| └─ └─ Description | `description` | Wysiwyg | Step description |
| └─ └─ Number | `number` | Number | Step number (1, 2, etc.) |
| └─ └─ Icon | `icon` | Image | Step icon (gear, lightbulb, etc.) |
| Testimonials | `testimonials` | Repeater | |
| └─ Quote | `quote` | Textarea | Testimonial text |
| └─ Author | `author` | Text | Author name |
| └─ Company | `company` | Text | Company name |

**Location Rules**: Page Template is equal to About

### 3. Services Page Fields

**Field Group Name**: `Services Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | |
| └─ Hero Title | `hero_title` | Text | "What we do" |
| └─ Hero Image | `hero_image` | Image | Services hero image |
| Intro Section | `intro_section` | Group | (Same as Home) |
| Services Accordion | `services_accordion` | Repeater | |
| └─ Title | `title` | Text | Service name |
| └─ Preview Text | `preview_text` | Wysiwyg | Short preview |
| └─ Full Text | `full_text` | Wysiwyg | Full description |
| └─ Image | `image` | Image | Service image |
| └─ Button Text | `button_text` | Text | "Enquire about..." |
| └─ Active by Default | `active` | True/False | Open by default |
| Testimonials | `testimonials` | Repeater | (Same as About) |
| Feature Section | `feature_section` | Group | |
| └─ Eyebrow | `eyebrow` | Text | ESG text |
| └─ Description | `description` | Wysiwyg | Feature description |
| └─ Button Text | `button_text` | Text | "More about ESG" |
| └─ Button URL | `button_url` | URL | Link URL |
| └─ Image | `image` | Image | Feature image |
| Projects Section | `projects_section` | Group | |
| └─ Heading | `heading` | Text | "Projects" |
| └─ Button Text | `button_text` | Text | "View all projects" |
| └─ Projects | `projects` | Relationship | Select projects to display |

**Location Rules**: Page Template is equal to Services

### 4. Projects Page Fields

**Field Group Name**: `Projects Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | |
| └─ Use White Navbar | `white_navbar` | True/False | Use white navbar variant |
| └─ Title | `hero_title` | Text | "Projects" |
| └─ Description | `description` | Wysiwyg | Page description |
| Projects | `projects` | Repeater | |
| └─ Title | `title` | Text | Project name |
| └─ Image | `image` | Image | Project map/image |
| └─ Meta | `meta` | Text | "Residential / Application submitted" |
| └─ Location | `location` | Textarea | Project location |
| └─ Type | `type` | Select | Options: residential, commercial, mixed |
| └─ Status | `status` | Select | Options: application submitted, sold, etc. |
| └─ Link | `link` | URL | Project detail page |

**Location Rules**: Page Template is equal to Projects

### 5. News Page Fields

**Field Group Name**: `News Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | (Same as Home) |
| Intro Section | `intro_section` | Group | (Same as Home) |
| News Posts | `news_posts` | Relationship | Select news posts to display |

**Location Rules**: Page Template is equal to News

**Note**: News items can also use WordPress Posts with custom post type "News"

### 6. Contact Page Fields

**Field Group Name**: `Contact Page`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Hero Section | `hero_section` | Group | |
| └─ Hero Title | `hero_title` | Text | "Contact us" |
| └─ Hero Highlight | `hero_highlight` | Text | "us" |
| Intro Section | `intro_section` | Group | |
| Contact Information | `contact_info` | Group | |
| └─ Telephone | `telephone` | Text | Phone number |
| └─ Email | `email` | Email | Contact email |
| └─ Address | `address` | Wysiwyg | Full address |
| Feature Section | `feature_section` | Group | |
| └─ Eyebrow | `eyebrow` | Text | "Contact information" |
| └─ Description | `description` | Wysiwyg | Contact details |
| └─ Button Text | `button_text` | Text | "More about us" |
| └─ Button URL | `button_url` | URL | Link to about page |
| └─ Image | `image` | Image | Feature image |

**Location Rules**: Page Template is equal to Contact

### 7. Theme Settings (Options Page)

**Field Group Name**: `Theme Settings`

| Field Label | Field Name | Field Type | Instructions |
|------------|------------|------------|--------------|
| Site Logo | `site_logo` | Image | Main site logo (SVG) |
| Footer Content | `footer_content` | Group | |
| └─ Copyright Text | `copyright_text` | Text | Copyright notice |
| └─ Footer Links | `footer_links` | Repeater | |
| └─ └─ Link Text | `link_text` | Text | Link label |
| └─ └─ Link URL | `link_url` | URL | Link destination |

**Location Rules**: Options Page is equal to Theme Settings

---

## Template Files Structure

### header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php
// Get hero variant from page template or ACF
$hero_variant = get_field('hero_section')['hero_variant'] ?? 'home';
$hero_color = get_field('hero_section')['hero_color_scheme'] ?? 'dark';
$hero_class = "hero hero--{$hero_variant} hero--{$hero_color}";
?>

<header class="<?php echo esc_attr($hero_class); ?>">
    <?php get_template_part('template-parts/navigation'); ?>
    <?php get_template_part('template-parts/hero'); ?>
</header>
```

### footer.php

```php
<?php get_template_part('template-parts/footer'); ?>
<?php wp_footer(); ?>
</body>
</html>
```

### template-parts/navigation.php

```php
<?php
$logo = get_field('site_logo', 'option') ?: get_template_directory_uri() . '/assets/svg/logo.svg';
$white_navbar = get_field('hero_section')['white_navbar'] ?? false;
$nav_class = $white_navbar ? 'nav nav--white' : 'nav';
?>

<nav class="<?php echo esc_attr($nav_class); ?>">
    <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <?php if (strpos($logo, '.svg') !== false): ?>
                <img src="<?php echo esc_url($logo); ?>" alt="<?php bloginfo('name'); ?>">
            <?php else: ?>
                <?php echo wp_get_attachment_image($logo, 'full', false, ['alt' => get_bloginfo('name')]); ?>
            <?php endif; ?>
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
        'items_wrap' => '<ul class="nav-links">%3$s<li class="mobile-divider"></li><li class="mobile-contact"><a href="' . esc_url(get_permalink(get_page_by_path('contact'))) . '" class="contact-btn-mobile"><span class="contact-text">Contact us</span><span class="contact-arrow"><img src="' . esc_url(get_template_directory_uri() . '/assets/svg/arrow.svg') . '" alt="arrow" class="button-arrow"></span></a></li><li class="mobile-logo"><img src="' . esc_url($logo) . '" alt="RIVALAND" class="mobile-logo-img"></li></ul>',
        'add_li_class' => function($classes, $item, $args) {
            if (is_page($item->object_id)) {
                $classes[] = 'active';
            }
            return $classes;
        }
    ]);
    ?>

    <a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>" class="contact-btn">
        Contact us 
        <svg class="arrow" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0.5L18.5 8M18.5 8L11 15.5M18.5 8H0.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
</nav>
```

### template-parts/hero.php

```php
<?php
$hero = get_field('hero_section');
if (!$hero) return;

$title = $hero['hero_title'] ?? '';
$highlight = $hero['hero_highlight'] ?? '';
$background = $hero['hero_background'] ?? '';
$hero_image = $hero['hero_image'] ?? '';
?>

<div class="hero-content">
    <h1>
        <?php 
        if ($highlight && strpos($title, $highlight) !== false):
            echo str_replace($highlight, '<span class="highlight">' . esc_html($highlight) . '</span>', esc_html($title));
        else:
            echo esc_html($title);
            if ($highlight):
                echo ' <span class="highlight">' . esc_html($highlight) . '</span>';
            endif;
        endif;
        ?>
    </h1>
</div>

<?php if ($hero_image): ?>
    <div class="hero-image">
        <?php echo wp_get_attachment_image($hero_image, 'full', false, ['alt' => 'Hero image']); ?>
    </div>
<?php endif; ?>
```

### templates/page-home.php

```php
<?php
/**
 * Template Name: Home
 */

get_header();

// Hero Section
get_template_part('template-parts/hero');

// Intro Section
$intro = get_field('intro_section');
if ($intro && $intro['intro_text']):
?>
    <section class="intro">
        <?php echo wp_kses_post($intro['intro_text']); ?>
    </section>
<?php endif; ?>

<?php
// Services Accordion
$accordion = get_field('services_accordion');
if ($accordion):
?>
    <section class="accordion accordion--services">
        <div class="accordion--services__left">
            <div class="accordion--services__card">
                <?php if ($accordion['card_eyebrow']): ?>
                    <?php get_template_part('components/eyebrow', null, ['text' => $accordion['card_eyebrow']]); ?>
                <?php endif; ?>
                
                <?php if ($accordion['button_text']): ?>
                    <?php get_template_part('components/button', null, [
                        'text' => $accordion['button_text'],
                        'url' => $accordion['button_url'] ?? '#',
                        'variant' => 'primary'
                    ]); ?>
                <?php endif; ?>
            </div>
        </div>
        <div class="accordion--services__right">
            <div class="accordion">
                <?php if (have_rows('services_accordion', 'accordion_items')): ?>
                    <?php while (have_rows('services_accordion', 'accordion_items')): the_row(); ?>
                        <article class="accordion__item <?php echo get_sub_field('active') ? 'active' : ''; ?>">
                            <div class="accordion__header">
                                <p><?php echo esc_html(get_sub_field('title')); ?></p>
                                <button class="accordion__toggle" aria-label="toggle <?php echo esc_attr(get_sub_field('title')); ?>">
                                    <?php echo get_sub_field('active') ? '×' : '+'; ?>
                                </button>
                            </div>
                            <div class="accordion__content">
                                <?php echo wp_kses_post(get_sub_field('content')); ?>
                                <?php if (get_sub_field('button_text')): ?>
                                    <?php get_template_part('components/button', null, [
                                        'text' => get_sub_field('button_text'),
                                        'url' => get_sub_field('button_url') ?? '#',
                                        'variant' => 'primary',
                                        'class' => 'accordion--services__button'
                                    ]); ?>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php endif; ?>

<?php get_footer(); ?>
```

### templates/page-services.php

```php
<?php
/**
 * Template Name: Services
 */

get_header();

// Hero Section
get_template_part('template-parts/hero');

// Intro Section
get_template_part('template-parts/intro');

// Services Accordion (Page variant)
$services = get_field('services_accordion');
if ($services):
?>
    <section class="accordion accordion--page accordion--dark">
        <div class="accordion--page__left"></div>
        <div class="accordion--page__right">
            <div class="accordion">
                <?php if (have_rows('services_accordion')): ?>
                    <?php while (have_rows('services_accordion')): the_row(); ?>
                        <article class="accordion__item <?php echo get_sub_field('active') ? 'active' : ''; ?>">
                            <div class="accordion__header">
                                <p><?php echo esc_html(get_sub_field('title')); ?></p>
                                <button class="accordion__toggle" aria-label="toggle <?php echo esc_attr(get_sub_field('title')); ?>">
                                    <?php echo get_sub_field('active') ? '×' : '+'; ?>
                                </button>
                            </div>
                            <div class="accordion__content">
                                <div class="accordion--page__content-wrapper">
                                    <div class="accordion--page__content-text">
                                        <p class="service-text-preview">
                                            <?php echo wp_kses_post(get_sub_field('preview_text')); ?>
                                        </p>
                                        <div class="service-text-full">
                                            <?php echo wp_kses_post(get_sub_field('full_text')); ?>
                                        </div>
                                        <a href="#" class="service-read-more" aria-label="read more">
                                            <span class="read-more-text">Read more</span>
                                            <span class="read-more-icon">+</span>
                                        </a>
                                        <?php if (get_sub_field('button_text')): ?>
                                            <a href="<?php echo esc_url(get_sub_field('button_url') ?: get_permalink(get_page_by_path('contact'))); ?>" class="accordion--page__button accordion--page__button-mobile">
                                                <?php echo esc_html(get_sub_field('button_text')); ?>
                                                <span class="button__icon">
                                                    <?php get_template_part('components/icon', 'arrow'); ?>
                                                </span>
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                    <div class="accordion--page__content-image">
                                        <?php if (get_sub_field('image')): ?>
                                            <?php echo wp_get_attachment_image(get_sub_field('image'), 'full', false, ['alt' => get_sub_field('title')]); ?>
                                        <?php endif; ?>
                                        <?php if (get_sub_field('button_text')): ?>
                                            <a href="<?php echo esc_url(get_sub_field('button_url') ?: get_permalink(get_page_by_path('contact'))); ?>" class="accordion--page__button accordion--page__button-desktop">
                                                <?php echo esc_html(get_sub_field('button_text')); ?>
                                                <span class="button__icon">
                                                    <?php get_template_part('components/icon', 'arrow'); ?>
                                                </span>
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php endif; ?>

<?php
// Testimonials Section
get_template_part('template-parts/testimonials');

// Feature Section
$feature = get_field('feature_section');
if ($feature):
    get_template_part('template-parts/feature', null, [
        'eyebrow' => $feature['eyebrow'],
        'description' => $feature['description'],
        'button_text' => $feature['button_text'],
        'button_url' => $feature['button_url'],
        'image' => $feature['image'],
        'variant' => 'services'
    ]);
endif;

// Projects Section
$projects = get_field('projects_section');
if ($projects):
    get_template_part('template-parts/projects', null, [
        'heading' => $projects['heading'],
        'button_text' => $projects['button_text'],
        'projects' => $projects['projects']
    ]);
endif;
?>

<?php get_footer(); ?>
```

### templates/page-projects.php

```php
<?php
/**
 * Template Name: Projects
 */

get_header();

$hero = get_field('hero_section');
?>

<section class="projects-index">
    <div class="projects-index-left">
        <h2><?php echo esc_html($hero['hero_title'] ?? 'Projects'); ?></h2>
        <?php if ($hero['description']): ?>
            <p class="projects-index-description">
                <?php echo wp_kses_post($hero['description']); ?>
            </p>
        <?php endif; ?>
        
        <?php get_template_part('template-parts/projects', 'filters'); ?>
        <div class="projects-accent-line"></div>
    </div>
    <div class="projects-index-right">
        <div class="projects-index__list">
            <?php if (have_rows('projects')): ?>
                <?php while (have_rows('projects')): the_row(); ?>
                    <article class="project-card project-card--index" data-type="<?php echo esc_attr(get_sub_field('type')); ?>">
                        <div class="project-card-image">
                            <?php if (get_sub_field('image')): ?>
                                <?php echo wp_get_attachment_image(get_sub_field('image'), 'full', false, ['alt' => get_sub_field('title')]); ?>
                            <?php endif; ?>
                        </div>
                        <div class="project-card-content">
                            <div class="project-card__info">
                                <p class="project-card__meta">
                                    <?php echo esc_html(ucfirst(get_sub_field('type'))); ?> / 
                                    <span class="project-status"><?php echo esc_html(get_sub_field('status')); ?></span>
                                </p>
                                <p class="project-card__location">
                                    <?php echo nl2br(esc_html(get_sub_field('location'))); ?>
                                </p>
                            </div>
                            <a href="<?php echo esc_url(get_sub_field('link') ?: '#'); ?>">
                                <svg class="project-card__arrow" width="19" height="16" viewBox="0 0 19 16" fill="none">
                                    <path d="M11 0.5L18.5 8M18.5 8L11 15.5M18.5 8H0.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

### template-parts/projects-filters.php

```php
<?php
// Projects filter component
?>
<div class="projects-filters">
    <div class="projects-index__filter-input-wrapper">
        <input type="text" class="projects-index__filter-input" placeholder="Filter results" id="project-filter-input">
        <button class="projects-index__filter-clear" aria-label="Clear filter" id="project-filter-clear">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
    <div class="projects-index__filters-buttons">
        <button class="projects-index__filter" data-filter="residential">Residential</button>
        <button class="projects-index__filter" data-filter="commercial">Commercial</button>
        <button class="projects-index__filter" data-filter="mixed">Mixed Use</button>
    </div>
    <div class="projects-index__filter-dropdown-wrapper">
        <button class="projects-index__filter-dropdown-toggle" id="project-filter-dropdown-toggle">
            <span class="filter-dropdown-text">Filter</span>
            <svg class="filter-dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button class="projects-index__filter-clear-mobile" id="project-filter-clear-mobile">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="projects-index__filter-dropdown" id="project-filter-dropdown">
            <button class="projects-index__filter-dropdown-item" data-filter="residential">Residential</button>
            <button class="projects-index__filter-dropdown-item" data-filter="commercial">Commercial</button>
            <button class="projects-index__filter-dropdown-item" data-filter="mixed">Mixed Use</button>
        </div>
    </div>
</div>
```

---

## Component Integration

### Using Existing Components

All components in `/components/` are ready to use with ACF:

```php
// Button from ACF
$button = get_field('button');
if ($button):
    get_template_part('components/button', null, [
        'text' => $button['text'],
        'url' => $button['url'],
        'variant' => $button['variant'] ?? 'primary'
    ]);
endif;

// Card from ACF Repeater
if (have_rows('cards')):
    while (have_rows('cards')): the_row();
        get_template_part('components/card', null, [
            'type' => get_sub_field('type'),
            'title' => get_sub_field('title'),
            'text' => get_sub_field('text'),
            'image' => get_sub_field('image')
        ]);
    endwhile;
endif;
```

---

## Asset Management

### 1. Copy Assets

Copy all assets to the WordPress theme:

```
assets/
├── css/
│   └── style.css (compiled from SCSS)
├── js/ (all JS files)
├── images/ (all images)
└── svg/ (all SVG files)
```

### 2. Update Asset Paths

In `functions.php`, ensure paths are correct:

```php
wp_enqueue_style('rivaland-style', get_template_directory_uri() . '/assets/css/style.css', [], '1.0.0');
```

### 3. SCSS Compilation

Keep SCSS source files for development. Compile to `assets/css/style.css`:

```bash
npm run build
```

---

## JavaScript Integration

All JavaScript files work as-is. Ensure they're enqueued in `functions.php`:

```php
wp_enqueue_script('mobile-menu', get_template_directory_uri() . '/assets/js/mobile-menu.js', [], '1.0.0', true);
```

**Note**: Update any hardcoded selectors to work with WordPress-generated HTML.

---

## Navigation Setup

### 1. Create Menu in WordPress

1. Go to **Appearance > Menus**
2. Create menu named "Primary Navigation"
3. Add pages: About, Services, Projects, News, Contact
4. Assign to "Primary Navigation" location

### 2. Update navigation.php

The navigation template uses `wp_nav_menu()` with custom walker if needed for active states.

---

## Page-by-Page Migration

### Step 1: Home Page

1. Create new page in WordPress
2. Assign "Home" template
3. Configure ACF fields:
   - Hero Section
   - Intro Section
   - Services Accordion
4. Test rendering

### Step 2: About Page

1. Create "About" page
2. Assign "About" template
3. Configure ACF fields:
   - Hero, Intro, Values, Team, Approach, Testimonials
4. Test all sections

### Step 3: Services Page

1. Create "Services" page
2. Assign "Services" template
3. Configure ACF fields
4. Test accordion functionality

### Step 4: Projects Page

1. Create "Projects" page
2. Assign "Projects" template
3. Add projects via ACF repeater
4. Test filtering functionality

### Step 5: News Page

1. Create "News" page
2. Assign "News" template
3. Create custom post type "News" (optional)
4. Or use ACF relationship field

### Step 6: Contact Page

1. Create "Contact" page
2. Assign "Contact" template
3. Configure contact form (use Contact Form 7 or similar)
4. Configure ACF fields

---

## Testing Checklist

### Functionality
- [ ] Navigation menu works on all devices
- [ ] Hamburger menu works on mobile/tablet
- [ ] Accordion expands/collapses correctly
- [ ] Project filters work
- [ ] Testimonials slider works
- [ ] Approach section scrolling works
- [ ] All buttons link correctly
- [ ] Forms submit correctly

### Responsive
- [ ] Desktop (1920px+)
- [ ] Desktop (1024px - 1920px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (≤768px)
- [ ] iPad Mini (768px)
- [ ] iPad Air (820px)

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance
- [ ] Images optimized
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Page load speed acceptable

---

## Additional Notes

### Custom Post Types (Optional)

For News, consider creating a custom post type:

```php
function register_news_post_type() {
    register_post_type('news', [
        'labels' => ['name' => 'News', 'singular_name' => 'News Item'],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-media-document'
    ]);
}
add_action('init', 'register_news_post_type');
```

### Contact Form Integration

Use Contact Form 7 or Gravity Forms, then integrate into contact template.

### Image Sizes

Register custom image sizes in `functions.php`:

```php
add_image_size('hero-image', 1920, 1080, true);
add_image_size('project-thumbnail', 416, 300, true);
```

---

## Support & Resources

- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)

---

**Last Updated**: 2024
**Version**: 1.0.0

