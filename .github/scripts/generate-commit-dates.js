const fetch = require('node-fetch');
const fs = require('fs');

const repos = [
  'Av1Sharma/SpotiStats',
  'Av1Sharma/F1-Telemetry-App',
  'bhsavionics/bhsavionics.github.io',
  'Av1Sharma/FRC-ScoutingApp',
  'Av1Sharma/Betterness',
  'COMET-FRC/C2025-Reefscape',
  'COMET-FRC/Melody',
  'Av1Sharma/ToDo',
  'Av1Sharma/studentvue-gradebook-viewer'
];

async function getLatestCommitDate(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) {
    console.error(`Failed to fetch ${repo}: ${res.status}`);
    return null;
  }
  const data = await res.json();
  return data[0]?.commit?.author?.date || null;
}

(async () => {
  const results = {};
  for (const repo of repos) {
    const date = await getLatestCommitDate(repo);
    results[repo] = date;
    console.log(`${repo}: ${date}`);
  }
  fs.writeFileSync('commit-dates.json', JSON.stringify(results, null, 2));
})(); 