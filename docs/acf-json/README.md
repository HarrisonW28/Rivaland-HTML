# ACF JSON Import Files

This directory contains ACF (Advanced Custom Fields) JSON export files for all component blocks with variation integration.

## Import Instructions

### Method 1: Import via ACF UI (Recommended)

1. Install and activate **Advanced Custom Fields Pro** (or ACF Free)
2. Go to **Custom Fields > Tools** in WordPress admin
3. Click **Import Field Groups**
4. Select the JSON file you want to import
5. Click **Import**

### Method 2: Automatic Sync (Recommended for Development)

1. Create an `acf-json` folder in your theme root: `wp-content/themes/rivaland/acf-json/`
2. Copy all JSON files from this directory to the `acf-json` folder
3. ACF will automatically sync field groups when you edit them in the admin
4. Changes made in the admin will be saved back to the JSON files

### Method 3: Programmatic Import

You can also import these programmatically using ACF's import functions in your theme's `functions.php`.

## Available Field Groups

### Component Blocks

1. **Button Block** (`group_button-block.json`)
   - Variants: primary, secondary, outline, ghost
   - Sizes: sm, md, lg
   - Icon toggle option

2. **Card Block** (`group_card-block.json`)
   - Types: project, news, service, feature, default
   - Variants: light, dark
   - Conditional fields based on card type

3. **Eyebrow Block** (`group_eyebrow-block.json`)
   - Variants: primary, secondary, light, dark
   - HTML tag options: p, span, div

4. **Hero Block** (`group_hero-block.json`)
   - Types: home, about, services
   - Color schemes: light, dark
   - White navbar option
   - Background/image options

5. **Intro Block** (`group_intro-block.json`)
   - Variants: default, about
   - WYSIWYG content editor

6. **Accordion Block** (`group_accordion-block.json`)
   - Types: services, page
   - Variants: light, dark
   - Left column card (for services type)
   - Repeater for accordion items
   - Conditional fields for page type (preview text, images)

7. **Feature Block** (`group_feature-block.json`)
   - Types: standard, team
   - Variants: light, dark
   - Optional button with variant selection
   - Image and content fields

8. **Projects Block** (`group_projects-block.json`)
   - Filter toggle option
   - Project type selection (residential, commercial, mixed)
   - Status selection
   - Repeater for projects

9. **News Block** (`group_news-block.json`)
   - Repeater for news items
   - Optional view all button
   - Image, eyebrow, title, text, link fields

10. **Testimonials Block** (`group_testimonials-block.json`)
    - Variants: light, dark
    - Repeater for testimonials
    - Autoplay options
    - Author image support

11. **Section Block** (`group_section-block.json`)
    - Types: intro, services, projects, news, feature, testimonial, default
    - Variants: light, dark
    - Wrapper for other content

## Block Registration

These field groups are configured for ACF Blocks. To use them, you'll need to register the blocks in your theme's `functions.php`:

```php
// Register ACF Blocks
add_action('acf/init', 'register_acf_blocks');
function register_acf_blocks() {
    if (function_exists('acf_register_block_type')) {
        // Button Block
        acf_register_block_type([
            'name' => 'button-block',
            'title' => 'Button',
            'description' => 'Button component with variants',
            'render_template' => 'template-parts/blocks/button.php',
            'category' => 'rivaland',
            'icon' => 'button',
            'keywords' => ['button', 'link', 'cta'],
            'supports' => ['align' => false]
        ]);
        
        // Card Block
        acf_register_block_type([
            'name' => 'card-block',
            'title' => 'Card',
            'description' => 'Card component with types and variants',
            'render_template' => 'template-parts/blocks/card.php',
            'category' => 'rivaland',
            'icon' => 'grid-view',
            'keywords' => ['card', 'project', 'news'],
            'supports' => ['align' => false]
        ]);
        
        // Add other blocks similarly...
    }
}
```

## Usage in Templates

Once imported, you can use these blocks in the Gutenberg editor or reference them in templates:

```php
// Get field values
$button_text = get_field('button_text');
$button_variant = get_field('button_variant') ?: 'primary';
$button_size = get_field('button_size') ?: 'md';

// Use with component
get_template_part('components/button', null, [
    'text' => $button_text,
    'url' => get_field('button_url'),
    'variant' => $button_variant,
    'size' => $button_size,
    'show_icon' => get_field('button_show_icon')
]);
```

## Field Naming Convention

All fields follow a consistent naming pattern:
- Field keys: `field_[component]_[field_name]`
- Field names: `[component]_[field_name]` (snake_case)
- Group keys: `group_[component]_block`

## Conditional Logic

Many fields use conditional logic to show/hide fields based on selections:
- Card fields change based on card type
- Accordion fields change based on accordion type
- Hero fields change based on hero type

## Notes

- All field groups are set to `"show_in_rest": 0` for performance
- Field groups use `"position": "normal"` and `"style": "default"`
- Required fields are marked with `"required": 1`
- Default values are provided where appropriate
- UI select fields are enabled for better UX

## Support

For questions or issues with these field groups, refer to:
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [ACF Block Documentation](https://www.advancedcustomfields.com/resources/acf_register_block_type/)

