import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumber, formatOuiNon } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective | undefined,
  seniority: string,
  inaptitude: boolean,
  hasSameSalaire: boolean,
  primes: number,
  salaire: number,
  salaires: number[]
): Record<string, string> => {
  const agreement: Record<string, string> = ccn?.selected
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.selected.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : { "contrat salarié - convention collective": "''" };

  const salary: Record<string, string> = salaire
    ? {
        "contrat salarié . indemnité de licenciement . salaire des 12 derniers mois":
          formatNumber(salaire),
      }
    : {};

  const salaries: Record<string, string> = {};
  if (salaires?.length) {
    salaries[
      "contrat salarié . indemnité de licenciement . nombre de dernier salaire"
    ] = formatNumber(salaires.length);
    for (let i = 1; i <= 12; i++) {
      salaries[
        "contrat salarié . indemnité de licenciement . salaire du mois " + i
      ] = formatNumber(salaires[i]);
    }
  }

  return {
    ...agreement,
    // ...salary,
    ...salaries,
    ...{
      "contrat salarié . ancienneté en année": seniority,
      "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
        formatOuiNon(inaptitude),
      "indemnité de licenciement": "oui",
      "contrat salarié . indemnité de licenciement . même salaire sur les 12 derniers mois":
        formatOuiNon(hasSameSalaire),
    },
  };
};
