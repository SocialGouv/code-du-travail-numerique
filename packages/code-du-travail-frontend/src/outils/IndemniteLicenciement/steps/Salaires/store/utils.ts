import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../../../common";

export const generateSameSalaryQuestion = (
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string => {
  return `Le salaire mensuel brut a-t-il été le même ${
    salaryPeriods.length === 1
      ? `pour le mois`
      : `durant les ${salaryPeriods.length} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? `l'arrêt de travail`
      : `la notification du licenciement`
  } ?`;
};

export const generateSalaireTempsPleinQuestion = (
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string => {
  return `Salaire mensuel brut ${
    salaryPeriods.length === 1
      ? "du dernier mois"
      : `des ${salaryPeriods.length} derniers mois`
  } et ${
    Math.min(salaryPeriods.length, 3) === 1
      ? "primes du dernier mois"
      : `primes des ${Math.min(salaryPeriods.length, 3)} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? "l'arrêt de travail"
      : "la notification du licenciement"
  }`;
};
