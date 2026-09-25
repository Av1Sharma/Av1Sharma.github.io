#!/usr/bin/env python3
"""Refresh static asset cache keys after editing CSS, JavaScript, or the favicon."""
from hashlib import sha256
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ('styles.css', 'site.js', 'favicon.svg')


def main():
    versions = {name: sha256((ROOT / name).read_bytes()).hexdigest()[:12] for name in ASSETS}
    pages = [*ROOT.glob('*.html'), *(ROOT / 'projects').glob('*.html')]
    for page in pages:
        original = page.read_text()
        updated = original
        for name, version in versions.items():
            updated = re.sub(
                rf'((?:href|src)="/{re.escape(name)})(?:\?[^"\s]*)?(\")',
                rf'\1?v={version}\2',
                updated,
            )
        if updated != original:
            page.write_text(updated)
    # Version the public Daybook module graph from its leaves upward.
    app_root = ROOT / 'daybook'
    if app_root.exists():
        module_versions = {}
        for name in ('model.mjs', 'notebook.mjs', 'app.js'):
            path = app_root / name
            source = path.read_text()
            for dependency, version in module_versions.items():
                source = re.sub(
                    rf"(from ['\"]\./{re.escape(dependency)})(?:\?[^'\"]*)?(['\"])",
                    rf'\1?v={version}\2', source,
                )
            if source != path.read_text():
                path.write_text(source)
            module_versions[name] = sha256(path.read_bytes()).hexdigest()[:12]
        page = app_root / 'index.html'
        source = page.read_text()
        for name in ('style.css', 'app.js'):
            version = sha256((app_root / name).read_bytes()).hexdigest()[:12]
            source = re.sub(rf'((?:href|src)="{re.escape(name)})(?:\?[^"\s]*)?(\")', rf'\1?v={version}\2', source)
        page.write_text(source)
    print(f'Updated {len(pages)} portfolio pages and Daybook asset versions.')


if __name__ == '__main__':
    main()
