import { formatIdcc } from "@socialgouv/modeles-social";
import { DepartOuMiseRetraite } from "../PreavisRetraite/steps/OriginStep/store";

export const mapToPublicodesSituationForCalculationPreavisRetraite = (
  departOuMiseRetraite: DepartOuMiseRetraite,
  seniority: string,
  ccn?: number,
  moreInfos?: Record<string, string>
): Record<string, string | undefined> => {
  const moreInfosPimped = moreInfos?.["contrat salarié . travailleur handicapé"]
    ? {
        ...moreInfos,
        "contrat salarié . travailleur handicapé":
          moreInfos["contrat salarié . travailleur handicapé"] === "'Oui'"
            ? "oui"
            : "non",
      }
    : moreInfos;
  return {
    "contrat salarié . ancienneté": seniority,
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    "contrat salarié . mise à la retraite":
      departOuMiseRetraite === "mise-retraite" ? "oui" : "non",
    ...moreInfosPimped,
  };
};
