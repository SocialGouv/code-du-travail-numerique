import type { PublicodesBase } from "../PublicodesBase";
import type { PublicodesIndemniteLicenciementResult } from "../types";
import type { IndemniteDepartOutput } from "./types";

export interface AgreementIndemniteCompute {
  calculate: (
    args: Record<string, string | undefined>,
    publicodes: PublicodesBase<PublicodesIndemniteLicenciementResult>,
    disableIneligibilityWithSeniority?: boolean
  ) => IndemniteDepartOutput<PublicodesIndemniteLicenciementResult>;
}
