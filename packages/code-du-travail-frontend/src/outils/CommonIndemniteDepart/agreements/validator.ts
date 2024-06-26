import { SupportedCc } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { IndemniteDepartStepName } from "..";
import { MainStore } from "../store";
import { validateAgreement1516 } from "./1516-organismes-formation";
import { validateAgreement1527 } from "./1527-immobilier";
import { validateAgreement16 } from "./16-transports-routiers";
import { validateAgreement44 } from "./44-industries-chimiques";
import { validateAgreement2609 } from "./2609-batiment-etam";
import { validateAgreement2614 } from "./2614-travaux-public";
import { validateAgreement2596 } from "./2596-coiffure";
import { validateAgreement2120 } from "./2120-banques";
import { validateAgreement2148 } from "./2148-telecommunications";
import { validateAgreement1672 } from "./1672-societes-assurances";
import { validateAgreement1483 } from "./1483-habillement-textiles-commerce-de-detail";
import { validateAgreement1702 } from "./1702-ouvriers-travaux-public";
import { validateAgreement1740 } from "./1740-batiment-region-parisienne";

const validatorAgreement = (
  idcc: SupportedCc | null | undefined,
  step: IndemniteDepartStepName,
  get: StoreApi<any>["getState"],
  set: StoreApi<MainStore>["setState"]
): boolean => {
  switch (true) {
    case SupportedCc.IDCC1516 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1516(get, set);
    case SupportedCc.IDCC1527 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1527(get, set);
    case SupportedCc.IDCC0016 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement16(get, set);
    case SupportedCc.IDCC0044 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement44(get, set);
    case SupportedCc.IDCC2596 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement2596(get, set);
    case SupportedCc.IDCC2609 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement2609(get, set);
    case SupportedCc.IDCC2120 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement2120(get, set);
    case SupportedCc.IDCC2148 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement2148(get, set);
    case SupportedCc.IDCC2614 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement2614(get, set);
    case SupportedCc.IDCC1672 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1672(get, set);
    case SupportedCc.IDCC1483 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1483(get, set);
    case SupportedCc.IDCC1702 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1702(get, set);
    case SupportedCc.IDCC1740 === idcc &&
      step === IndemniteDepartStepName.Salaires:
      return validateAgreement1740(get, set);
    default:
      return true;
  }
};

export default validatorAgreement;
