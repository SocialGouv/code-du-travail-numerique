import { cdtnIdsGen } from "./indexing/idList";
const fs = require("fs");

const t0 = Date.now();

const play = async () => {
  let allIds = [];
  for await (const ids of cdtnIdsGen()) {
    allIds = allIds.concat(ids);
  }

  fs.writeFileSync("ids.json", JSON.stringify(allIds, null, 2));
};
play().catch((error) => {
  console.error(error);
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
  process.exit(1);
});
