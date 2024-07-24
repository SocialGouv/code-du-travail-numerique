import { formatIdcc } from "@socialgouv/modeles-social";
import { DepartOuMiseRetraite } from "../PreavisRetraite/steps/OriginStep/store";

const DEFAULT_SENIORITY_VALUE = "24";

export const mapToPublicodesSituationForCalculationPreavisRetraite = (
  departOuMiseRetraite: DepartOuMiseRetraite,
  ccn?: number,
  seniority?: string,
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
    "contrat salarié . ancienneté": seniority ?? DEFAULT_SENIORITY_VALUE,
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    "contrat salarié . mise à la retraite":
      departOuMiseRetraite === "mise-retraite" ? "oui" : "non",
    ...moreInfosPimped,
  };
};
