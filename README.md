# Avi Sharma — personal website

A static portfolio for GitHub Pages. No build step or package installation is needed.

## Local preview

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000.
Use a server rather than opening the HTML files directly; asset and navigation paths are relative to the site root.

## Editing

- `index.html`: introduction, selected work, about, and contact.
- `projects/index.html`: project collection and category filters.
- `projects/*.html`: individual project pages and their source/demo links.
- `culture.html`: shows, movies, and music.
- `styles.css`: shared styling and responsive layouts.
- `site.js`: project filtering, browser history, and the footer year.

Core content and links work without JavaScript. JavaScript enables category filtering; the selected category is stored in the URL. Google Fonts is optional, with a system sans-serif fallback.

## Updating shared assets

After changing `styles.css`, `site.js`, or `favicon.svg`, run:

```sh
python3 scripts/version-assets.py
```

Commit the updated HTML files with the assets. The script adds content hashes to asset URLs so visitors load the matching files instead of a cached version from an earlier release. It is safe to run repeatedly and does not require a build step.

## Daybook

Daybook is included as a public browser app at `/daybook/` with a standalone Mac download. See [Daybook’s README](daybook/README.md) for setup, data storage, backups, tests, and build instructions.

## Rebuilt projects

The portfolio serves production builds of two independent apps:

- `/lap-lab/`: [F1-Telemetry-App](https://github.com/Av1Sharma/F1-Telemetry-App), React/TypeScript with bundled real OpenF1 historical data.
- `/dispatch-lab/`: [DispatchLab](https://github.com/Av1Sharma/DispatchLab), Svelte/TypeScript routing heuristics in a Web Worker. Replaces the retired SpotiStats demo.
- `/projects/photos-classifier.html`: [PhotosClassifier](https://github.com/Av1Sharma/PhotosClassifier), downloadable local Python/OpenCV desktop app.

The `/lap-lab/` and `/dispatch-lab/` directories contain production build output only. Their source code, dependency manifests, development servers, and tests live in the linked repositories. Do not run demo scripts from this website checkout: none are needed to view the deployed apps.

`project-builds.json` records each deployed build's source commit and SHA-256 hashes. To refresh the web apps, use clean checkouts of the source repositories, follow their READMEs to install dependencies and run their documented checks/builds, then sync the generated output:

To update web builds, run each source project's `npm ci`, `npm test`, and `npm run build`, then:

```sh
python3 scripts/sync-project-builds.py --f1 /path/to/F1-Telemetry-App --dispatch /path/to/DispatchLab
python3 scripts/check-project-links.py
```

PhotosClassifier downloads include a Mac arm64 app with models, a source archive, and SHA-256 checksums. No personal photos or face embeddings are included. Mac releases are ad-hoc signed, not notarized. The original Daybook downloads and project remain unchanged.

## Website project documentation

- [Daybook](daybook/README.md) documents the browser and Mac editions, local data storage, backup behavior, tests, and the native Mac build.
- [Lap Lab / F1 Telemetry](lap-lab/README.md) and [Dispatch Lab](dispatch-lab/README.md) explain that these folders are deployed builds and point to their source repositories for development instructions.
- Other project cards link to team, client, or separate project repositories. Their source and contribution guidance belongs in those repositories; this website checkout does not contain their code.

## Site maintenance scripts

- `scripts/version-assets.py` updates cache-busting hashes for shared website assets and Daybook modules.
- `scripts/sync-project-builds.py` copies verified Lap Lab and Dispatch Lab build output into this site and refreshes `project-builds.json`.
- `scripts/check-project-links.py` checks local links and assets on the listed project pages.

These are maintenance tools for the website, not project demo scripts.
