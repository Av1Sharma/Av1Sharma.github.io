"""Copy verified static builds into the portfolio; record exact source commits."""
import argparse,json,shutil,subprocess,hashlib
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--f1',type=Path,required=True,help='F1-Telemetry-App checkout')
parser.add_argument('--dispatch',type=Path,required=True,help='DispatchLab checkout')
args=parser.parse_args();site=Path(__file__).resolve().parents[1];manifest={}
for name,repo,build in [('lap-lab',args.f1,args.f1/'web/dist'),('dispatch-lab',args.dispatch,args.dispatch/'dist')]:
    if not (build/'index.html').exists():raise SystemExit(f'Build {repo} first.')
    destination=site/name
    # Only generated directories owned by this script can be replaced.
    if destination.exists():shutil.rmtree(destination)
    shutil.copytree(build,destination)
    manifest[name]={'repository':subprocess.check_output(['git','-C',str(repo),'config','--get','remote.origin.url'],text=True).strip() if name=='lap-lab' else 'https://github.com/Av1Sharma/DispatchLab.git','commit':subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip(),'files':{str(p.relative_to(destination)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(destination.rglob('*')) if p.is_file()}}
(site/'project-builds.json').write_text(json.dumps(manifest,indent=2)+'\n')
