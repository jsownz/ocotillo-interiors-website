# Ocotillo Interiors Website

A custom Jekyll 4 website for Ocotillo Interiors featuring a unique full-screen logo fade-in effect and a two-column layout.

## Features

- Full-screen logo splash on page load with smooth fade transition
- Two-column layout: Navigation on left, content on right
- Custom color scheme: #4C4233 (main background), #F2EBE3 (logo background/content)
- Responsive design
- Clean, minimal aesthetic

## Setup

This project uses Ruby 3.0.0 with RVM.

### Installation

1. Ensure you're using Ruby 3.0.0 with the oi-web gemset:
   ```bash
   rvm use 3.0.0@oi-web
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Add your logo image to `assets/images/logo.png`

## Development

To run the development server:

```bash
rvm use 3.0.0@oi-web
bundle exec jekyll serve --livereload
```

Then visit `http://localhost:4000` in your browser.

## Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
│   └── default.html     # Main layout with logo fade effect
├── assets/
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript (logo fade animation)
│   └── images/         # Images including logo
├── index.md            # About page
├── portfolio.md        # Portfolio page
├── services.md         # Services page
└── contact.md          # Contact page
```

## Color Palette

- **Main Background:** `#4C4233`
- **Logo Splash Background:** `#F2EBE3`
- **Text on Dark:** `#F2EBE3`
- **Text on Light:** `#4C4233`
