# Dispatch Lab

Dispatch Lab is the deployed browser build of [DispatchLab](https://github.com/Av1Sharma/DispatchLab), an interactive vehicle-routing simulator. Visitors can edit delivery stops and fleet capacity, compare nearest-neighbor routing with Clarke–Wright savings and 2-opt, import CSV data, and export a plan as JSON. The app uses synthetic coordinates and straight-line distances; it runs in the browser and uses a Web Worker for routing calculations. See the [portfolio project page](../projects/dispatch-lab.html) or [open the live app](https://av1sharma.github.io/dispatch-lab/).

## This directory

This directory contains only the static production output served by GitHub Pages: the entry point and compiled JavaScript, CSS, and worker assets. The source code, package manifest, development server, tests, and demo scripts are not part of this deployment directory.

For development prerequisites, setup, algorithms, tests, and build commands, follow the [source repository README](https://github.com/Av1Sharma/DispatchLab#readme).

## Updating the deployed build

Build and check Dispatch Lab in a source checkout using its README. Then, from this website repository root, sync both deployed apps and their manifest:

```sh
python3 scripts/sync-project-builds.py --f1 /path/to/F1-Telemetry-App --dispatch /path/to/DispatchLab
```

The script copies the generated build output and records the source commit and SHA-256 hashes in [`project-builds.json`](../project-builds.json). Review and commit the resulting `dispatch-lab/` and manifest changes together. The website link checker can then be run with `python3 scripts/check-project-links.py` from the repository root.
