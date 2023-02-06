import { PublicodesInformation } from "../store";

export const informationToSituation = (
  informationData: Array<PublicodesInformation>
) =>
  informationData.reduce(
    (acc, v) => ({ ...acc, [v.question.rule.nom]: v.info }),
    {}
  );
