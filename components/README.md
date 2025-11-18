# Components

This folder contains reusable HTML components that are loaded dynamically via JavaScript.

## Footer Component

The footer is loaded dynamically to ensure consistency across all pages.

### Usage

In any HTML file, replace the footer markup with:

```html
<div data-footer></div>
<script src="js/footer.js"></script>
```

### Benefits

- **Single Source of Truth**: Footer is defined once in `components/footer.html`
- **Consistency**: Same footer on every page automatically
- **Easy Updates**: Change footer once, updates everywhere
- **No Duplication**: No need to copy/paste footer HTML across pages

### How It Works

1. `js/footer.js` runs on page load
2. Finds the `[data-footer]` element
3. Fetches `components/footer.html`
4. Replaces the container with the footer HTML

### Adding New Components

To add more reusable components:

1. Create HTML file in `components/` folder
2. Create JavaScript loader in `js/` folder
3. Use `data-*` attributes to mark injection points
4. Follow the same pattern as `footer.js`

