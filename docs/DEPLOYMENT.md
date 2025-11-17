# Deployment Guide

This guide covers deployment options for the Rivaland HTML website.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Build Process

### Development Build

```bash
npm install
npm run dev
```

This will:
- Install dependencies
- Watch SCSS files and auto-compile to CSS

### Production Build

```bash
npm install
npm run build
```

This will:
- Compile SCSS to minified CSS
- Generate production-ready `style.css` file

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is configured via `vercel.json` and provides automatic deployments from Git.

#### Setup Steps:

1. **Install Vercel CLI** (optional, for local testing):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will automatically detect the configuration

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

#### Configuration:

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `.` (root)
- Framework: None (static site)

#### Environment Variables:

No environment variables are currently required.

---

### Option 2: Netlify

#### Setup Steps:

1. **Create `netlify.toml`** (if not exists):
   ```toml
   [build]
     command = "npm run build"
     publish = "."

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Import your Git repository
   - Set build command: `npm run build`
   - Set publish directory: `.`

3. **Deploy via CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

---

### Option 3: GitHub Pages

#### Setup Steps:

1. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select source: GitHub Actions

---

### Option 4: Traditional Web Hosting (cPanel, FTP, etc.)

#### Steps:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload all files EXCEPT:
     - `node_modules/`
     - `package.json`
     - `package-lock.json`
     - `scss/` folder (optional, if you want to keep source)
     - `.git/`
     - `.gitignore`
     - Documentation files

3. **Required files for production**:
   - All `.html` files
   - `style.css` (compiled)
   - `script.js`
   - `assets/` folder
   - `vercel.json` (if using Vercel)

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check responsive design on mobile devices
- [ ] Test all navigation links
- [ ] Verify images load correctly
- [ ] Test contact forms (if applicable)
- [ ] Check browser console for errors
- [ ] Verify CSS is minified in production
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

## Continuous Deployment

### Vercel/Netlify

Both platforms support automatic deployments:
- Push to `main` branch → automatic production deployment
- Push to other branches → preview deployment

### Manual Deployment

For traditional hosting, repeat the build and upload process after each change.

## Troubleshooting

### CSS Not Loading

- Ensure `style.css` is in the root directory
- Check file paths in HTML files
- Verify build completed successfully

### Images Not Loading

- Check `assets/images/` folder exists
- Verify image file names match HTML references
- Check file permissions on server

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Verify all SCSS files compile without errors

## Performance Optimization

### Before Deployment:

1. **Minify CSS** (already done with `npm run build`)
2. **Optimize Images**:
   - Use WebP format where possible
   - Compress images before upload
   - Consider using a CDN for images

3. **Enable Compression**:
   - Configure server to gzip/brotli compress CSS and HTML

4. **Cache Headers**:
   - Set appropriate cache headers for static assets

## Support

For issues or questions, refer to:
- `docs/ARCHITECTURE.md` - Project architecture
- `docs/MOBILE_RESPONSIVE_STYLES.md` - Responsive design documentation
- `scss/README.md` - SCSS structure guide

