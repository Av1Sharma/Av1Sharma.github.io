#!/usr/bin/env python3
"""Build the public Daybook universal Mac app without private keys or GitHub login."""
from pathlib import Path
import subprocess, shutil, plistlib, re, hashlib
ROOT=Path(__file__).resolve().parents[1]
VERSION='1.3.0'
build=ROOT/'build'; release=ROOT/'release'; app=build/'Daybook.app'
if app.exists(): shutil.rmtree(app)
resources=app/'Contents/Resources'; binaries=app/'Contents/MacOS'
resources.mkdir(parents=True); binaries.mkdir(parents=True); release.mkdir(exist_ok=True)
html=(ROOT/'index.html').read_text()
parts=[]
for name in ['model.mjs','notebook.mjs','app.js']:
    js=(ROOT/name).read_text()
    js=re.sub(r'^import .*?;\n','',js,flags=re.M)
    js=re.sub(r'\bexport (?=(?:const|function|class)\b)','',js)
    parts.append(js)
js='\n'.join(parts).replace('</script','<\\/script')
html=re.sub(r'<link rel="stylesheet" href="style.css[^\"]*">',lambda _: '<style>'+(ROOT/'style.css').read_text()+'</style>',html)
html=re.sub(r'<script type="module" src="app.js[^\"]*"></script>','',html)
html=html.replace('</body>','<script type="module">'+js+'</script></body>')
(resources/'index.html').write_text(html)
with (app/'Contents/Info.plist').open('wb') as f:
    plistlib.dump({'CFBundleExecutable':'Daybook','CFBundleIdentifier':'com.avisharma.daybook.public','CFBundleName':'Daybook','CFBundleDisplayName':'Daybook','CFBundlePackageType':'APPL','CFBundleShortVersionString':VERSION,'CFBundleVersion':'4','LSMinimumSystemVersion':'13.0','NSHighResolutionCapable':True,'NSPrincipalClass':'NSApplication','CFBundleIconFile':'Daybook.icns'},f)
cache=build/'ModuleCache'; cache.mkdir(exist_ok=True)
for arch in ['arm64','x86_64']:
    subprocess.run(['swiftc','-parse-as-library','-O','-target',arch+'-apple-macos13.0','-module-cache-path',str(cache),str(ROOT/'macos/Daybook.swift'),'-o',str(build/('Daybook-'+arch))],check=True)
subprocess.run(['lipo','-create',str(build/'Daybook-arm64'),str(build/'Daybook-x86_64'),'-output',str(binaries/'Daybook')],check=True)
subprocess.run(['swift','-module-cache-path',str(cache),str(ROOT/'macos/Icon.swift'),str(build/'Daybook.iconset')],check=True)
subprocess.run(['iconutil','-c','icns',str(build/'Daybook.iconset'),'-o',str(resources/'Daybook.icns')],check=True)
subprocess.run(['codesign','--force','--sign','-','--identifier','com.avisharma.daybook.public',str(app)],check=True)
subprocess.run(['codesign','--verify','--deep','--strict',str(app)],check=True)
stage=build/'dmg-stage'
if stage.exists(): shutil.rmtree(stage)
stage.mkdir(); shutil.copytree(app,stage/'Daybook.app',symlinks=True)
(stage/'Applications').symlink_to('/Applications')
(stage/'Read me.txt').write_text('Daybook '+VERSION+' — Public edition\n\nDrag Daybook into Applications. Requires macOS 13 or later, Intel or Apple silicon.\n\nNo account or GitHub CLI needed. Your notebook starts empty and stays on this Mac in ~/Library/Application Support/Daybook Public/notebook.json. Browser and Mac notebooks are separate; use Back up notebook and Restore backup to transfer them.\n\nThis app is ad-hoc signed, not Apple-notarized. macOS may require first-launch approval in System Settings > Privacy & Security.\n\nFor newer versions, choose Daybook > Downloads & Updates. Updates are downloaded and installed manually.\n')
dmg=release/('Daybook-'+VERSION+'-universal.dmg')
subprocess.run(['hdiutil','create','-volname','Daybook','-srcfolder',str(stage),'-ov','-format','UDZO',str(dmg)],check=True)
subprocess.run(['hdiutil','verify',str(dmg)],check=True)
(release/'SHA256SUMS.txt').write_text(hashlib.sha256(dmg.read_bytes()).hexdigest()+'  '+dmg.name+'\n')
print(dmg)
