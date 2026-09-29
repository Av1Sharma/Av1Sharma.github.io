"""Verify local assets and links in the portfolio's changed project pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]
class Links(HTMLParser):
    def __init__(self,path):super().__init__();self.path=path
    def handle_starttag(self,tag,attrs):
        for key,value in attrs:
            if key not in ('href','src') or not value or value.startswith(('#','mailto:','http:','https:','data:')):continue
            path=unquote(urlsplit(value).path)
            target=ROOT/path.lstrip('/') if path.startswith('/') else self.path.parent/path
            if target.is_dir():target=target/'index.html'
            if not target.exists():raise ValueError(f'{self.path.relative_to(ROOT)}: missing {value}')
files=['index.html','projects/index.html','projects/f1.html','projects/dispatch-lab.html','projects/spotistats.html','projects/photos-classifier.html','lap-lab/index.html','dispatch-lab/index.html']
for name in files:
    path=ROOT/name;Links(path).feed(path.read_text())
print(f'All local links and assets valid in {len(files)} pages.')
