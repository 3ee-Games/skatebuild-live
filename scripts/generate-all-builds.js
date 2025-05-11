const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');

function gatherBuilds(root) {
  const users = readdirSync(root, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const builds = [];
  for (const user of users) {
    const userDir = path.join(root, user);
    for (const fileName of readdirSync(userDir).filter(f => f.endsWith('.json'))) {
      const filePath = path.join(userDir, fileName);
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      builds.push({
        name:             data.name,
        build_type:       data.build_type,
        skating_type:     data.skating_type,
        owner_username:   data.owner_username,
        slug:             data.slug,
        created:          data.created
      });
    }
  }
  return builds;
}

const buildsRoot = path.resolve('data/builds');
const allBuilds = gatherBuilds(buildsRoot);
const outPath = path.join(buildsRoot, 'all-builds.json');
writeFileSync(outPath, JSON.stringify(allBuilds, null, 2));
console.log(`Wrote ${allBuilds.length} builds to ${outPath}`);
