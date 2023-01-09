import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { Agreement } from "../../../../conventions/Search/api/type";
import { CommonInformationsStoreInput } from "../../../CommonSteps/Informations/store";
import { AncienneteStoreInput } from "../../steps/Anciennete/store";
import { validateStep } from "../../steps/Anciennete/store/validator";
import { ContratTravailStoreInput } from "../../steps/ContratTravail/store";
import { validateStep1517 } from "../1517-commerces-de-detail-non-alimentaires";

export const customSeniorityValidator = (
  state: AncienneteStoreInput,
  stateContratTravail: ContratTravailStoreInput,
  information: CommonInformationsStoreInput,
  agreeement?: Agreement
): any => {
  let idcc: SupportedCcIndemniteLicenciement | null = null;
  if (agreeement) {
    idcc = `IDCC${agreeement.num}` as SupportedCcIndemniteLicenciement;
  }
  switch (idcc) {
    case SupportedCcIndemniteLicenciement.IDCC1517:
      return validateStep1517(state, stateContratTravail, information);
    default: {
      return validateStep(state, stateContratTravail, information);
    }
  }
};
