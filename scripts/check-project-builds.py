"""Verify checked-in project build files against their SHA-256 manifest."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'project-builds.json').read_text())
for project, details in manifest.items():
    if not isinstance(details.get('files'), dict) or not details['files']:
        raise SystemExit(f'{project}: no files recorded in project-builds.json')
    for relative, expected in details['files'].items():
        path = (ROOT / project / relative).resolve()
        if ROOT / project not in path.parents or not path.is_file():
            raise SystemExit(f'{project}: missing or invalid build file {relative}')
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        if actual != expected:
            raise SystemExit(f'{project}: SHA-256 mismatch for {relative}')
print(f'Verified {sum(len(v["files"]) for v in manifest.values())} deployed project files.')
