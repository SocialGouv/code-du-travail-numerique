import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
  mergeRuptureConventionnelle,
} from "./src/internal/merger";

global.modelsIndemniteLicenciement = mergeIndemniteLicenciementModels();
global.modelsPreavisRetraite = mergePreavisRetraiteModels();
global.modelsRuptureConventionnel = mergeRuptureConventionnelle();
