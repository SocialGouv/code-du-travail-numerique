import { formatReadable } from "../../common/date";
import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumber } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective,
  dateEntree: string,
  dateSortie: string,
  salaireRef: number,
  absencePeriods: number
): Record<string, string> => {
  const agreement: Record<string, string> = ccn
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : {};
  return {
    ...{
      "contrat salarié - date d'embauche": formatReadable(dateEntree),
    },
    ...{
      "contrat salarié - date de fin de contrat": formatReadable(dateSortie),
    },
    ...{
      "contrat salarié - total absences": absencePeriods.toString(),
    },
    ...{
      "contrat salarié - salaire de référence": formatNumber(salaireRef),
    },
    ...agreement,
    ...{
      "indemnité de licenciement": "oui",
    },
  };
};
