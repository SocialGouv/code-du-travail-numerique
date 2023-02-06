import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
} from "./src/internal/merger";

(global as typeof globalThis).modelsIndemniteLicenciement = mergeIndemniteLicenciementModels();
(global as typeof globalThis).modelsPreavisRetraite = mergePreavisRetraiteModels();
