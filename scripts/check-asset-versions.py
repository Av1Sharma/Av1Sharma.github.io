"""Fail when checked shared or Daybook asset URLs have stale cache keys."""
from hashlib import sha256
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def require_version(text: str, url: str, path: Path) -> None:
    digest = sha256(path.read_bytes()).hexdigest()[:12]
    if not re.search(rf'{re.escape(url)}\?v={digest}(?:["\'])', text):
        raise SystemExit(f'{path.relative_to(ROOT)}: expected {url}?v={digest}')


for asset in ('styles.css', 'site.js', 'favicon.svg'):
    path = ROOT / asset
    for page in [*ROOT.glob('*.html'), *(ROOT / 'projects').glob('*.html')]:
        require_version(page.read_text(), '/' + asset, path)

daybook = ROOT / 'daybook'
for asset in ('style.css', 'app.js'):
    require_version((daybook / 'index.html').read_text(), asset, daybook / asset)

module_versions = {}
for name in ('model.mjs', 'notebook.mjs', 'app.js'):
    path = daybook / name
    text = path.read_text()
    for dependency, version in module_versions.items():
        if not re.search(rf"\./{re.escape(dependency)}\?v={version}['\"]", text):
            raise SystemExit(f'{name}: expected {dependency}?v={version}')
    module_versions[name] = sha256(path.read_bytes()).hexdigest()[:12]

print('Shared website assets and Daybook module versions are current.')
