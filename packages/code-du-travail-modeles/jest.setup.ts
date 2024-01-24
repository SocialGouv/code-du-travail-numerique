import {
  mergeIndemniteLicenciementModels,
  mergeIndemniteRuptureConventionnelleModels,
  mergePreavisRetraiteModels,
} from "./src/internal/merger";

(global as typeof globalThis).modelsIndemniteLicenciement =
  mergeIndemniteLicenciementModels();
(global as typeof globalThis).modelsIndemniteRuptureConventionnelle =
  mergeIndemniteRuptureConventionnelleModels();
(global as typeof globalThis).modelsPreavisRetraite =
  mergePreavisRetraiteModels();
