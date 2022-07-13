import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { GetState, SetState } from "zustand";
import { IndemniteLicenciementStepName } from "..";
import { MainStore } from "../store";
import { validateAgreement1516 } from "./1516-organismes-formation";

const validatorAgreement = (
  idcc: SupportedCcIndemniteLicenciement,
  step: IndemniteLicenciementStepName,
  get: GetState<any>,
  set: SetState<MainStore>
): boolean => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1516(get, set);
    default:
      return true;
  }
};

export default validatorAgreement;
