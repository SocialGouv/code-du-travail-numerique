import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "./src/internal/merger";

(global as any).engine = new Engine(mergeIndemniteLicenciementModels());
