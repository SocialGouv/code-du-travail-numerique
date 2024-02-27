import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
  mergeRuptureConventionnelle,
} from "./src/internal/merger";

(global as typeof globalThis).modelsIndemniteLicenciement =
  mergeIndemniteLicenciementModels();
(global as typeof globalThis).modelsPreavisRetraite =
  mergePreavisRetraiteModels();
(global as typeof globalThis).modelsRuptureConventionnel =
  mergeRuptureConventionnelle();
