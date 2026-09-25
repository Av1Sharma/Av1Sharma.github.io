# Daybook

A local task notebook with daily completion history and weekly reflection. No account, subscription, or GitHub login is required.

[Open in your browser](https://av1sharma.github.io/daybook/) · [Download for Mac](https://av1sharma.github.io/downloads/Daybook-1.3.0-universal.dmg) · [Watch the demo](https://av1sharma.github.io/projects/daybook.html#demo)

## Get started

**Browser:** Open Daybook, type a task, and press Enter. Use the same browser profile and website address when you return.

**Mac:** Download the disk image, open it, and drag Daybook into Applications. Requires macOS 13 or later; the universal app supports Apple silicon and Intel. It runs offline without Python, Node, or GitHub CLI. The app is ad-hoc signed, not Apple-notarized, so macOS may require first-launch approval in System Settings → Privacy & Security.

Every new notebook starts empty. The demo shows the original personal edition; its tasks and history are not bundled with this public edition.

## What you can do

- Add tasks with categories, due dates, importance, and estimated effort.
- Complete tasks into dated **Day done** history; undo or reopen them later.
- Set daily or weekly repeats. The next occurrence is scheduled from completion; missed days do not create a backlog of duplicates.
- Review weekly completions, overdue work, and unfinished tasks. Effort is an estimate, not tracked time.
- Create any number of **Check-ins** for your routines. These do not send notifications.
- Keep reference notes separately from actionable tasks.

## Your data and backups

There is no server-side notebook or automatic cloud sync. No analytics are included in the app.

| Version | Storage |
| --- | --- |
| Browser | This browser profile’s localStorage, key `daybook.public.notebook.v1` |
| Mac | `~/Library/Application Support/Daybook Public/notebook.json` |

Browser data can be lost if you clear site data or use a temporary/private session. Anyone with access to the same unlocked computer and browser profile may be able to access the notebook. The public Mac edition uses a separate folder from the original private edition.

Use **Back up notebook** regularly. In the browser this downloads JSON; on Mac it saves a timestamped file in the notebook’s `Backups` folder and reveals it in Finder. Use **Restore backup** to load a public-edition backup on either platform. Restore replaces the current notebook after confirmation; export the current notebook first. Invalid backups are rejected before saving. Backups are not encrypted.

Browser and Mac notebooks remain separate until you manually transfer a backup. The public edition does not import the original private edition’s screenshot history.

## Mac updates

Choose **Daybook → Downloads & Updates…** to open the public download page. Install newer versions manually after backing up. The public edition does not use the private GitHub updater, require GitHub CLI, or contact a private repository.

## Run locally

From the website repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/daybook/`. Keep the same address and port to retain the same browser storage. A local server or HTTPS is required; do not open the HTML directly with `file://`.

## Test and build

```sh
node --test daybook/tests/*.test.mjs
python3 daybook/scripts/build-mac.py
```

Building the Mac app requires macOS and Apple command-line developer tools, including Swift, `lipo`, `iconutil`, `codesign`, and `hdiutil`. The builder creates a universal app, verifies its ad-hoc signature, and produces a verified disk image and SHA-256 checksum in `daybook/release/`. No private signing key is needed. This does not produce Apple notarization.

## Source layout

- `index.html`, `style.css`, `app.js`: shared browser and Mac interface.
- `model.mjs`: task validation, recurrence, dates, and weekly calculations.
- `notebook.mjs`: public check-ins and validated backup restore.
- `macos/`: native shell, local persistence, backup export, and icon generation.
- `scripts/build-mac.py`: offline universal app and disk image build.
- `tests/`: task behavior, recurrence, backup validation, and check-ins.

Weekly backlog is reconstructed from task dates. Editing tasks or reopening completions can change past workload counts; it is not an immutable activity log.
