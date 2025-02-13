import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";

export const informationToSituation = (
  informationData: Array<PublicodesInformation>
) =>
  informationData.reduce(
    (acc, v) => ({ ...acc, [v.question.rule.nom]: v.info }),
    {}
  );
