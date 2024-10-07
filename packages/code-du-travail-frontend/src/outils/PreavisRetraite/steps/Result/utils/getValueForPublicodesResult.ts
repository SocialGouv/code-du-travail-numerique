import { RuleType } from "@socialgouv/modeles-social";
import { PublicodesInformation } from "../../../../CommonIndemniteDepart/steps/Informations/store";

const reverseValues = (
  values: Record<string, string>,
): Record<string, string> =>
  Object.entries(values).reduce((state, [key, value]) => {
    state[value] = key;
    return state;
  }, {});

export const getValueForPublicodesResult = (
  info: PublicodesInformation,
): string | undefined => {
  if (
    info.info &&
    info.question.rule.cdtn &&
    info.question.rule.cdtn.type === RuleType.Liste
  ) {
    return reverseValues(info.question.rule.cdtn.valeurs)[info.info];
  }
  return info.info;
};
