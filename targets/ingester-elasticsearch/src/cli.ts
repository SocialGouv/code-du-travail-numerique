//

import { injest } from "@cdtn/ingester";

void (async function main() {
  try {
    await injest();
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
})();
