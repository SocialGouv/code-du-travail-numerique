import { Evaluation, Unit } from "publicodes";

import { PublicodesSupportedSimulator } from ".";

export type PublicodesIndemniteLicenciementResult = {
  type: PublicodesSupportedSimulator.IndemniteLicenciement;
  value: Evaluation;
  unit?: Unit;
};
