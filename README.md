# Avi Sharma — personal website

A static portfolio for GitHub Pages. No build step or package installation is needed.

## Local preview

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000.
Use a server rather than opening the HTML files directly; asset and navigation paths are relative to the site root.

## Editing

- `index.html`: academic-style introduction, selected projects, experience, and personal interests.
- `downloads/Avi-Sharma-Resume.pdf`: downloadable CV linked from the homepage.
- `projects/index.html`: seven short project entries; the homepage features three selections.
- `projects/*.html`: individual project pages and their source/demo links.
- `culture.html`: shows, movies, and music.
- `styles.css`: shared styling and responsive layouts.
- `site.js`: the footer year on legacy pages.

Core content and links work without JavaScript. Project pages share the homepage’s name, contact details, typography, and document layout. The site uses system sans-serif fonts with a white background and blue text links.

## Updating shared assets

After changing `styles.css`, `site.js`, or `favicon.svg`, run:

```sh
python3 scripts/version-assets.py
```

Commit the updated HTML files with the assets. The script adds content hashes to asset URLs so visitors load the matching files instead of a cached version from an earlier release. It is safe to run repeatedly and does not require a build step.

## Daybook

Daybook is included as a public browser app at `/daybook/` with a standalone Mac download. See [Daybook’s README](daybook/README.md) for setup, data storage, backups, tests, and build instructions.

## Lap Lab

`/lap-lab/` contains the production build of [F1-Telemetry-App](https://github.com/Av1Sharma/F1-Telemetry-App), a React/TypeScript app with bundled OpenF1 historical data. Source code, dependencies, and tests live in that repository; see [the deployment README](lap-lab/README.md).

`project-builds.json` records the build's source commit and SHA-256 hashes. After building and testing in the source checkout, sync it with:

```sh
python3 scripts/sync-project-builds.py --f1 /path/to/F1-Telemetry-App
python3 scripts/check-project-links.py
```

## Site maintenance scripts

- `scripts/version-assets.py` updates cache-busting hashes for shared website assets and Daybook modules.
- `scripts/sync-project-builds.py` copies verified Lap Lab build output into this site and refreshes `project-builds.json`.
- `scripts/check-project-links.py` checks local links and assets across every HTML page, including fragment targets.

These are maintenance tools for the website, not project demo scripts.

## Dispatch Lab and Photos Classifier

`/dispatch-lab/` serves the bundled routing demo. Its source and tests live in [DispatchLab](https://github.com/Av1Sharma/DispatchLab). Sync a tested production build with `python3 scripts/sync-project-builds.py --dispatch /path/to/DispatchLab`. Pass `--f1` as well to update both apps; omitted builds are preserved.

[Photos Classifier](projects/photos-classifier.html) links to its repository and the local 2.1.0 Python source download.
