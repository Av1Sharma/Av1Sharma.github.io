# Avi Sharma — personal website

A static portfolio for GitHub Pages. No build step or package installation is needed.

## Local preview

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000.
Use a server rather than opening the HTML files directly; asset and navigation paths are relative to the site root.

## Editing

- `index.html`: introduction, selected work, about, and contact.
- `projects/index.html`: all nine projects and category filters.
- `projects/*.html`: individual project pages and their source/demo links.
- `culture.html`: shows, movies, and music.
- `styles.css`: shared styling and responsive layouts.
- `site.js`: project filtering, browser history, and the footer year.

Core content and links work without JavaScript. JavaScript enables category filtering; the selected category is stored in the URL. Google Fonts is optional, with a system sans-serif fallback.
