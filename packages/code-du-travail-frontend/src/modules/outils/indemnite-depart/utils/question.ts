import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../common";
import { IndemniteDepartType, Agreement } from "../types";

export const generateSameSalaryQuestion = (
  type: IndemniteDepartType,
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
      : type === IndemniteDepartType.LICENCIEMENT
        ? "la notification du licenciement"
        : "la fin du contrat"
  }&nbsp;?`;
};

export const generateSalaireTempsPleinQuestion = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string => {
  return `${
    salaryPeriods.length === 1
      ? "Salaire mensuel brut du dernier mois"
      : `Salaires mensuels bruts des ${salaryPeriods.length} derniers mois`
  } et ${
    Math.min(salaryPeriods.length, 3) === 1
      ? "primes du dernier mois"
      : `primes des ${Math.min(salaryPeriods.length, 3)} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? "l'arrêt de travail"
      : type === IndemniteDepartType.LICENCIEMENT
        ? "la notification du licenciement"
        : "la fin du contrat"
  }`;
};

export const generateResultSameSalary = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string => {
  return `Salaire mensuel brut identique${
    salaryPeriods.length === 1
      ? ` `
      : ` durant les ${salaryPeriods.length} derniers mois `
  }précédant ${
    arretTravail === "oui"
      ? `l'arrêt de travail`
      : type === IndemniteDepartType.LICENCIEMENT
        ? "la notification du licenciement"
        : "la fin du contrat"
  }`;
};

export const generateResultSalaireTempsPlein = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string => {
  return `${
    salaryPeriods.length === 1
      ? "Salaire mensuel brut perçu le dernier mois"
      : `Salaires mensuels bruts perçus au cours des ${salaryPeriods.length} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? "l'arrêt de travail"
      : type === IndemniteDepartType.LICENCIEMENT
        ? "la notification du licenciement"
        : "la fin du contrat"
  }`;
};

export const generateSmallText = (
  agreement?: Agreement
): string | undefined => {
  return agreement && agreement.num === 3239
    ? undefined
    : "Prendre en compte les primes et avantages en nature.";
};
