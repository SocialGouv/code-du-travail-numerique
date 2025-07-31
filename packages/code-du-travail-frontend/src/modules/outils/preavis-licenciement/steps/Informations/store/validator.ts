import { InformationsStoreError, InformationsStoreInput } from "./types";
import { RuleType } from "@socialgouv/modeles-social";
import { StatusStoreInput } from "../../Status/store";
import { deepEqualObject } from "src/lib";
import {
  isDate,
  isPositiveNumber,
} from "src/modules/outils/common/utils/validators";

export const validateStep = (
  state: InformationsStoreInput,
  statusState: StatusStoreInput
) => {
  const informations = state.publicodesInformations;

  // Pour le préavis de licenciement, on n'utilise pas de note spécifique
  const note = undefined;

  let errorInformations: Record<string, string> = {};
  informations.forEach((info) => {
    const error = isValidField(info.info, info.question.rule.cdtn?.type);
    if (error !== undefined) {
      errorInformations[info.question.rule.nom] = error;
    }
  });

  let errorState: InformationsStoreError = {
    errorInformations,
    errorPublicodes: state.informationError
      ? "Une erreur liée au moteur de calcul nous empêche de continuer la simulation. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste."
      : undefined,
  };

  const isValid = deepEqualObject(errorState, {
    errorInformations: {},
    errorPublicodes: undefined,
  });
  return { isValid, errorState };
};

export const isValidField = (
  value: string | undefined | null,
  type: RuleType | undefined
): string | undefined => {
  if (value === undefined || value === null || value === "") {
    return "Vous devez répondre à cette question";
  }
  switch (type) {
    case RuleType.Liste:
      return undefined;
    case RuleType.OuiNon:
      return value !== "'Oui'" && value !== "'Non'"
        ? "Vous devez répondre à cette question"
        : undefined;
    case RuleType.Date:
      return isDate(value);
    default:
      return isPositiveNumber(value);
  }
};
