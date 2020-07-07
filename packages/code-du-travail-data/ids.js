import { cdtnIdsGen } from "./indexing/idList";
const fs = require("fs");

const t0 = Date.now();

const hashFunction = (idObj) => {
  var hash = 0;
  if (idObj.length == 0) {
    return hash;
  }
  for (var i = 0; i < idObj.length; i++) {
    var char = idObj.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash >>> 0;
};

function djb2(idObj) {
  var i = idObj.length;
  var hash1 = 5381;
  var hash2 = 52711;

  while (i--) {
    const char = idObj.charCodeAt(i);
    hash1 = (hash1 * 33) ^ char;
    hash2 = (hash2 * 33) ^ char;
  }

  return (hash1 >>> 0) * 4096 + (hash2 >>> 0);
}

const play = async () => {
  let allIds = [];
  for await (const ids of cdtnIdsGen()) {
    allIds = allIds.concat(ids);
  }

  const hashed = new Map();

  allIds.forEach((idObj) => {
    const id = djb2(JSON.stringify(idObj)).toString(16);
    if (hashed.has(id)) {
      console.error("Collision ");
      console.log(idObj);
      console.log(id);
      console.log("with : ");
      console.log(hashed.get(id));
      console.log("-------");
    } else {
      hashed.set(id, idObj);
    }
  });

  fs.writeFileSync("all-ids.json", JSON.stringify(Array.from(hashed), null, 2));
};

play().catch((error) => {
  console.error(error);
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
  process.exit(1);
});
