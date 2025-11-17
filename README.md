# Rivaland HTML Website

A modern, responsive HTML website for Rivaland built with modular SCSS architecture.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

Watch SCSS files and auto-compile:

```bash
npm run dev
```

### Production Build

Compile and minify CSS:

```bash
npm run build
```

## 📁 Project Structure

```
Rivaland-HTML/
├── assets/              # Static assets (images, logos, icons)
│   ├── images/         # Image files
│   └── svg/            # SVG icons and graphics
│       ├── arrow.svg
│       └── logo.svg
├── docs/               # Documentation
│   ├── ARCHITECTURE.md
│   ├── MOBILE_RESPONSIVE_STYLES.md
│   └── WORDPRESS_MIGRATION_PLAN.md
├── scss/               # SCSS source files (7-1 Pattern)
│   ├── abstracts/      # Variables and mixins
│   ├── base/           # Base styles
│   ├── components/     # Reusable components
│   ├── layout/         # Layout-specific styles
│   ├── _responsive.scss # Responsive breakpoints
│   └── style.scss      # Main entry point
├── js/                 # JavaScript modules
│   ├── accordion.js    # Services accordion functionality
│   ├── mobile-menu.js  # Mobile navigation menu
│   ├── mobile-layout.js # Mobile button repositioning
│   ├── approach.js     # Approach section scroll & progress
│   └── testimonials.js # Testimonial carousel
├── *.html              # HTML pages
├── style.css           # Compiled CSS (generated)
├── package.json        # Dependencies and scripts
└── vercel.json         # Vercel deployment config
```

## 📄 Pages

- `index.html` - Homepage
- `about.html` - About page
- `services.html` - Services page
- `projects.html` - Projects page
- `news.html` - News page
- `contact.html` - Contact page

## 🎨 SCSS Architecture

The project uses the **7-1 Pattern** for SCSS organization:

- **abstracts/**: Variables, mixins, functions
- **base/**: Reset, typography, utilities
- **components/**: Reusable UI components
- **layout/**: Page-specific layouts
- **_responsive.scss**: Media queries and breakpoints

See `scss/README.md` for detailed structure.

## 🛠️ Available Scripts

- `npm run sass` - Compile SCSS once
- `npm run sass:watch` - Watch and auto-compile SCSS
- `npm run sass:prod` - Compile minified CSS for production
- `npm run dev` - Start development (watch mode)
- `npm run build` - Build for production

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: up to 480px
- Tablet: up to 768px
- Desktop: 1024px and above

See `docs/MOBILE_RESPONSIVE_STYLES.md` for detailed responsive documentation.

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Quick Deploy to Vercel

```bash
npm run build
vercel
```

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md) - Project architecture overview
- [Mobile Responsive Styles](./docs/MOBILE_RESPONSIVE_STYLES.md) - Responsive design guide
- [WordPress Migration Plan](./docs/WORDPRESS_MIGRATION_PLAN.md) - Future migration strategy
- [Deployment Guide](./DEPLOYMENT.md) - Deployment instructions

## 🎯 Features

- ✅ Modular SCSS architecture (7-1 Pattern)
- ✅ Fully responsive design
- ✅ Component-based structure
- ✅ Dark hero variant for about page
- ✅ Accordion components
- ✅ Feature sections with images
- ✅ Mobile navigation menu
- ✅ Optimized for production

## 🔧 Technologies

- HTML5
- SCSS/SASS
- Vanilla JavaScript
- Node.js / npm

## 📝 License

ISC

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues, please refer to the documentation in the `docs/` folder.

