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
    print(f'Updated {len(pages)} pages: {versions}')


if __name__ == '__main__':
    main()
