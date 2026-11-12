"""Copy verified static builds into the portfolio; record exact source commits."""
import argparse,json,shutil,subprocess,hashlib
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--f1',type=Path,help='F1-Telemetry-App checkout')
parser.add_argument('--dispatch',type=Path,help='DispatchLab checkout')
args=parser.parse_args();site=Path(__file__).resolve().parents[1]
if not (args.f1 or args.dispatch):parser.error('Provide --f1 and/or --dispatch.')
manifest=json.loads((site/'project-builds.json').read_text())
projects=[]
if args.f1:projects.append(('lap-lab',args.f1,args.f1/'web/dist'))
if args.dispatch:projects.append(('dispatch-lab',args.dispatch,args.dispatch/'dist'))
for name,repo,build in projects:
    if not (build/'index.html').exists():raise SystemExit(f'Build {repo} first.')
    destination=site/name
    # Only generated directories owned by this script can be replaced.
    readme=(destination/'README.md').read_bytes() if (destination/'README.md').exists() else None
    if destination.exists():shutil.rmtree(destination)
    shutil.copytree(build,destination)
    if readme is not None:(destination/'README.md').write_bytes(readme)
    manifest[name]={'repository':subprocess.check_output(['git','-C',str(repo),'config','--get','remote.origin.url'],text=True).strip(),'commit':subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip(),'files':{str(p.relative_to(destination)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(destination.rglob('*')) if p.is_file()}}
(site/'project-builds.json').write_text(json.dumps(manifest,indent=2)+'\n')
