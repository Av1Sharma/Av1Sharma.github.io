"""Verify local links, assets, and fragment targets in every HTML page."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ('id', 'name', 'data-view') and value:
                self.ids.add(value)
            if key in ('href', 'src', 'poster') and value:
                self.links.append(value)


pages = {}
for path in ROOT.rglob('*.html'):
    if any(part.startswith('.') or part == 'node_modules' for part in path.relative_to(ROOT).parts):
        continue
    page = Page(path)
    page.feed(path.read_text())
    pages[path.resolve()] = page

errors = []
for path, page in pages.items():
    for value in page.links:
        url = urlsplit(value)
        if url.scheme or url.netloc:
            continue
        local = unquote(url.path)
        target = ((ROOT / local.lstrip('/')) if local.startswith('/') else path.parent / local).resolve() if local else path
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            errors.append(f'{path.relative_to(ROOT)}: missing {value}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path.relative_to(ROOT)}: missing fragment {value}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'All local links, assets, and fragments valid in {len(pages)} pages.')
