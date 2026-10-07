# Lap Lab

Lap Lab is the deployed browser build of [F1-Telemetry-App](https://github.com/Av1Sharma/F1-Telemetry-App), a Formula 1 lap comparison and race archive app. It lets visitors compare qualifying telemetry, inspect sectors, replay circuits, and export lap data. The portfolio project page is [here](../projects/f1.html), and the live app is [here](https://av1sharma.github.io/lap-lab/).

## This directory

This directory contains static production output served by GitHub Pages: the app entry point, compiled JavaScript and CSS, and bundled data. It is not the source checkout. There is no package manifest, development server, test suite, or demo script here.

For source changes, dependencies, tests, supported data, and development/build commands, use the [source repository README](https://github.com/Av1Sharma/F1-Telemetry-App#readme). Follow the commands and prerequisites documented there.

## Updating the deployed build

Build and check the app in a source checkout using its README. Then, from this website repository root, sync both deployed apps and their manifest:

```sh
python3 scripts/sync-project-builds.py --f1 /path/to/F1-Telemetry-App --dispatch /path/to/DispatchLab
```

The script copies the generated build output and records the source commit and SHA-256 hashes in [`project-builds.json`](../project-builds.json). Review and commit the resulting `lap-lab/` and manifest changes together. The website link checker can then be run with `python3 scripts/check-project-links.py` from the repository root.

## Data and attribution

The deployed app includes a bundled Monza example and race archive data. Consult the source repository and its bundled notices for data sources, methodology, and licensing details; this deployment README does not replace those notices.
