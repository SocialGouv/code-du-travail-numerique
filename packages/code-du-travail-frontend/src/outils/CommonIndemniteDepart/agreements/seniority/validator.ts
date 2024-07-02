import { getSupportedAgreement, SupportedCc } from "@socialgouv/modeles-social";
import { Agreement } from "../../../types";
import { CommonInformationsStoreInput } from "../../../CommonSteps/Informations/store";
import { AncienneteStoreInput } from "../../steps/Anciennete/store";
import { validateStep } from "../../steps/Anciennete/store/validator";
import { ContratTravailStoreInput } from "../../steps/ContratTravail/store";

export const customSeniorityValidator = (
  state: AncienneteStoreInput,
  stateContratTravail: ContratTravailStoreInput,
  information: CommonInformationsStoreInput,
  agreeement?: Agreement
): any => {
  let idcc: SupportedCc | null | undefined = null;
  if (agreeement) {
    idcc = getSupportedAgreement(agreeement.num);
  }
  return validateStep(state, stateContratTravail, information);
};
