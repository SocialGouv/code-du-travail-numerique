import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { IndemniteLicenciementStepName } from "..";
import { MainStore } from "../store";
import { validateAgreement1516 } from "./1516-organismes-formation";
import { validateAgreement1527 } from "./1527-immobilier";
import { validateAgreement29 } from "./29-hospitalisation-privee-but-non-lucratif";
import { validateAgreement16 } from "./16-transports-routiers";
import { validateAgreement44 } from "./44-industries-chimiques";
import { validateAgreement2609 } from "./2609-batiment-etam";
import { validateAgreement2614 } from "./2614-travaux-public";
import { validateAgreement2596 } from "./2596-coiffure";
import { validateAgreement2148 } from "./2148-telecommunications";
import { validateAgreement1672 } from "./1672-societes-assurances";
import { validateAgreement1483 } from "./1483-habillement-textiles-commerce-de-detail";
import { validateAgreement1702 } from "./1702-ouvriers-travaux-public";

const validatorAgreement = (
  idcc: SupportedCcIndemniteLicenciement | null,
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
    case SupportedCcIndemniteLicenciement.IDCC2596 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement2596(get, set);
    case SupportedCcIndemniteLicenciement.IDCC2609 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement2609(get, set);
    case SupportedCcIndemniteLicenciement.IDCC2148 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement2148(get, set);
    case SupportedCcIndemniteLicenciement.IDCC2614 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement2614(get, set);
    case SupportedCcIndemniteLicenciement.IDCC1672 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1672(get, set);
    case SupportedCcIndemniteLicenciement.IDCC1483 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1483(get, set);
    case SupportedCcIndemniteLicenciement.IDCC1702 === idcc &&
      step === IndemniteLicenciementStepName.Salaires:
      return validateAgreement1702(get, set);
    default:
      return true;
  }
};

export default validatorAgreement;
