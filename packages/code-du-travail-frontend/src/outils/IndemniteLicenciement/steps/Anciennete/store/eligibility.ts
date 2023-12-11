import {
  getSupportedAgreement,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { AncienneteStoreInput } from "./types";
import { Agreement } from "@socialgouv/cdtn-utils";
import { CommonInformationsStoreInput } from "../../../../CommonSteps/Informations/store";
import {
  getAgreementRequiredSeniority,
  getAgreementSeniority,
} from "../../../agreements/seniority";
import { StoreApi } from "zustand";
import { MainStore } from "../../../store";

export const getErrorEligibility = (
  get: StoreApi<MainStore>["getState"],
  state: AncienneteStoreInput,
  stateInfo: CommonInformationsStoreInput,
  isInaptitude: boolean,
  agreement?: Agreement
) => {
  if (
    isInaptitude ||
    !state.dateEntree ||
    !state.dateNotification ||
    !state.dateSortie
  ) {
    return;
  }

  const factory = new SeniorityFactory().create(
    SupportedCcIndemniteLicenciement.default
  );
  const requiredSeniorityLegal = factory.computeRequiredSeniority({
    dateEntree: state.dateEntree,
    dateNotification: state.dateNotification,
    dateSortie: state.dateSortie,
    absencePeriods: state.absencePeriods,
  }).value;

  let requiredSeniorityAgreement = 0;
  if (agreement) {
    requiredSeniorityAgreement = getAgreementRequiredSeniority(
      getSupportedAgreement(agreement.num),
      get as StoreApi<MainStore>["getState"]
    ).value;
  }

  let minimalSeniorityInMonth = 8;
  let minimalSeniorityError =
    "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.";
  let requiredSeniorityInYear = Math.max(
    requiredSeniorityLegal,
    requiredSeniorityAgreement
  );
  switch (agreement?.num) {
    case 3239:
      requiredSeniorityInYear = requiredSeniorityAgreement;
      if (stateInfo.publicodesInformations[0].info === "'Assistant maternel'") {
        minimalSeniorityInMonth = 9;
        minimalSeniorityError =
          "L’indemnité de licenciement n’est pas due lorsque l’ancienneté de l'assistant maternel est inférieure à 9 mois.";
      }
      break;
    case 2596:
      requiredSeniorityInYear = requiredSeniorityAgreement;
      if (
        stateInfo.publicodesInformations?.length > 0 &&
        (stateInfo.publicodesInformations[0]?.info === "'Cadres'" ||
          stateInfo.publicodesInformations[0]?.info === "'Agents de maîtrise'")
      ) {
        minimalSeniorityInMonth = 0;
      }
      break;
    case 1404:
      requiredSeniorityInYear = requiredSeniorityAgreement;
      if (
        stateInfo.publicodesInformations?.length > 0 &&
        stateInfo.publicodesInformations[0]?.info === "'Oui'" // CDI d'opération
      ) {
        minimalSeniorityInMonth = 0;
      }
      break;
  }
  const isEligible = requiredSeniorityInYear >= minimalSeniorityInMonth / 12;
  return !isEligible ? minimalSeniorityError : undefined;
};
