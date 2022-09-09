import { deepEqualObject } from "../../../../lib";
import {
  CommonInformationsStoreError,
  CommonInformationsStoreInput,
} from "./types";

export const validateStep = (state: CommonInformationsStoreInput) => {
  const informations = state.publicodesInformations;
  let errorInformations: Record<string, string> = {};
  informations.forEach((info) => {
    if (info.info === undefined) {
      errorInformations[info.question.rule.nom] =
        "Vous devez répondre à cette question";
    }
  });

  let errorState: CommonInformationsStoreError = {
    errorInformations,
    errorNotificationBloquante: state.notificationBloquante
      ? "Impossible de continuer la simulation avec ce paramètre"
      : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorInformations: {},
      errorNotificationBloquante: undefined,
    }),
    errorState,
  };
};
