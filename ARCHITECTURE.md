# SCSS Architecture Documentation

## Overview

This project uses a **modular SCSS architecture** based on the **7-1 Pattern**, adapted for this specific project. This structure follows industry best practices for maintainable, scalable stylesheets.

## Directory Structure

```
scss/
├── abstracts/          # Non-outputting SCSS (variables, mixins, functions)
│   ├── _variables.scss # All design tokens (colors, spacing, typography, etc.)
│   └── _mixins.scss    # Reusable mixins (button effects, utilities)
│
├── base/              # Base styles and resets
│   └── _base.scss     # Global resets, typography, base element styles
│
├── components/        # Reusable UI components
│   ├── _intro.scss    # Intro section component
│   ├── _services.scss # Services section with accordion
│   ├── _feature.scss  # Feature section component
│   ├── _projects.scss # Projects section component
│   └── _news.scss     # News section component
│
├── layout/            # Major layout sections
│   ├── _hero.scss     # Hero section (full-width header)
│   ├── _navigation.scss # Navigation bar and menu
│   └── _footer.scss   # Site footer
│
├── _responsive.scss    # All media queries (kept at root for simplicity)
└── style.scss         # Main entry point (imports all partials)
```

## Why This Structure?

### 1. **Abstracts** (No CSS Output)
- Contains only variables, mixins, and functions
- No actual CSS is generated from these files
- Shared across all other files

### 2. **Base** (Foundation)
- Global resets and base element styles
- Typography defaults
- Applied to the entire site

### 3. **Layout** (Structure)
- Major page sections that define layout
- Hero, navigation, footer
- Typically full-width or structural elements

### 4. **Components** (Reusable UI)
- Self-contained, reusable components
- Can be used multiple times on a page
- Intro, services, feature, projects, news sections

### 5. **Responsive** (Media Queries)
- All breakpoints in one place
- Easy to maintain and update
- Overrides default styles for different screen sizes

## Import Order

The `style.scss` file imports in this specific order:

1. **Abstracts** → Variables and mixins (must be first)
2. **Base** → Foundation styles
3. **Layout** → Structural components
4. **Components** → UI components
5. **Responsive** → Media queries (must be last)

This order ensures:
- Variables are available to all files
- Base styles apply first
- Components can override base
- Responsive styles override everything

## Best Practices Followed

✅ **7-1 Pattern** - Industry-standard SCSS architecture  
✅ **BEM-like naming** - Clear, semantic class names  
✅ **Single Responsibility** - Each file has one purpose  
✅ **DRY Principle** - Variables and mixins prevent repetition  
✅ **Logical Grouping** - Related styles grouped together  
✅ **Scalable** - Easy to add new components/sections  

## File Naming

- **Partials**: Start with underscore (`_variables.scss`)
- **Main file**: No underscore (`style.scss`)
- **Imports**: No underscore or extension (`@import 'abstracts/variables'`)

## Compilation

```bash
# Development (with source maps)
npm run sass

# Watch mode (auto-compile)
npm run sass:watch

# Production (compressed, no source maps)
npm run sass:prod
```

## Adding New Styles

### New Component?
1. Create `scss/components/_new-component.scss`
2. Add `@import 'components/new-component';` to `style.scss` in the components section

### New Variable?
1. Add to `scss/abstracts/_variables.scss`
2. Use throughout other files

### New Mixin?
1. Add to `scss/abstracts/_mixins.scss`
2. Use with `@include mixin-name;`

### New Responsive Rule?
1. Add to `scss/_responsive.scss`
2. Follow existing breakpoint structure

## Benefits

- **Maintainability**: Easy to find and update specific styles
- **Scalability**: Simple to add new features without cluttering
- **Collaboration**: Multiple developers can work on different files
- **Performance**: Only compile what you need
- **Organization**: Clear structure for onboarding new developers

