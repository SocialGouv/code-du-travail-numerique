import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "./src/internal/merger";

module.exports = () => {
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  global.__engine__ = new Engine(mergeIndemniteLicenciementModels());
  global.engine = new Engine(mergeIndemniteLicenciementModels());

  console.log("hello hello");
};
