import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { IndemniteLicenciementStepName } from "..";
import { MainStore } from "../store";
import { validateAgreement1516 } from "./1516-organismes-formation";
import { validateAgreement1527 } from "./1527-immobilier";
import { validateAgreement29 } from "./29-hospitalisation-privee-but-non-lucratif";
import { validateAgreement16 } from "./16-transports-routiers";
import { validateAgreement44 } from "./44-industries-chimiques";

const validatorAgreement = (
  idcc: SupportedCcIndemniteLicenciement,
  step: IndemniteLicenciementStepName,
  get: StoreApi<any>["getState"],
  set: StoreApi<MainStore>["setState"]
): boolean => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1516(get, set);
    case SupportedCcIndemniteLicenciement.IDCC1527 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1527(get, set);
    case SupportedCcIndemniteLicenciement.IDCC0029 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement29(get, set);
    case SupportedCcIndemniteLicenciement.IDCC0016 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement16(get, set);
    case SupportedCcIndemniteLicenciement.IDCC0044 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement44(get, set);
    default:
      return true;
  }
};

export default validatorAgreement;
