import { SalaryPeriods } from "@socialgouv/modeles-social";
import { OuiNon } from "../common";
import { IndemniteDepartType, Agreement, OriginRetraite } from "../types";

/**
 * Libellé de l'évènement de rupture qui sert de point de référence aux
 * questions sur les salaires et sur l'arrêt de travail.
 */
export const getRuptureEventLabel = (
  type: IndemniteDepartType,
  originRetraite?: OriginRetraite
): string => {
  switch (type) {
    case IndemniteDepartType.RETRAITE:
      return originRetraite === "mise-retraite"
        ? "la notification de la mise à la retraite"
        : "la notification du départ à la retraite";
    case IndemniteDepartType.LICENCIEMENT:
      return "la notification du licenciement";
    default:
      return "la fin du contrat";
  }
};

/**
 * Nom nu de l'évènement de retraite, pour les tournures qui portent déjà leur
 * préposition (« préavis de… », « Indemnité de… »).
 */
export const getRetraiteOriginLabel = (
  originRetraite?: OriginRetraite
): string =>
  originRetraite === "mise-retraite"
    ? "mise à la retraite"
    : "départ à la retraite";

/**
 * Variante nominale du libellé, pour les phrases qui ne parlent pas de
 * notification (« au moment de… »).
 */
export const getRuptureLabel = (
  type: IndemniteDepartType,
  originRetraite?: OriginRetraite
): string => {
  switch (type) {
    case IndemniteDepartType.RETRAITE:
      return originRetraite === "mise-retraite"
        ? "de la mise à la retraite"
        : "du départ à la retraite";
    case IndemniteDepartType.RUPTURE_CONVENTIONNELLE:
      return "de la rupture conventionnelle";
    default:
      return "du licenciement";
  }
};

export const generateSameSalaryQuestion = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[],
  originRetraite?: OriginRetraite
): string => {
  return `Le salaire mensuel brut a-t-il été le même ${
    salaryPeriods.length === 1
      ? `pour le mois`
      : `durant les ${salaryPeriods.length} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? `l'arrêt de travail`
      : getRuptureEventLabel(type, originRetraite)
  }&nbsp;?`;
};

export const generateSameSalaryQuestionSubLabel = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[]
): string | undefined => {
  if (
    type === IndemniteDepartType.RUPTURE_CONVENTIONNELLE &&
    (!arretTravail || arretTravail === "non")
  ) {
    const periodeTexte =
      salaryPeriods.length === 1
        ? "le mois"
        : `les ${salaryPeriods.length} mois`;

    return `Pour l'estimation, vous pouvez saisir les derniers mois connus avant la demande d'homologation. Attention, l'indemnité versée devra être calculée sur ${periodeTexte} précédant la rupture du contrat.`;
  }
  return undefined;
};

export const generateSalaireTempsPleinQuestion = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[],
  originRetraite?: OriginRetraite
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
      : getRuptureEventLabel(type, originRetraite)
  }`;
};

export const generateResultSameSalary = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[],
  originRetraite?: OriginRetraite
): string => {
  return `Salaire mensuel brut identique${
    salaryPeriods.length === 1
      ? ` `
      : ` durant les ${salaryPeriods.length} derniers mois `
  }précédant ${
    arretTravail === "oui"
      ? `l'arrêt de travail`
      : getRuptureEventLabel(type, originRetraite)
  }`;
};

export const generateResultSalaireTempsPlein = (
  type: IndemniteDepartType,
  arretTravail: OuiNon | undefined,
  salaryPeriods: SalaryPeriods[],
  originRetraite?: OriginRetraite
): string => {
  return `${
    salaryPeriods.length === 1
      ? "Salaire mensuel brut perçu le dernier mois"
      : `Salaires mensuels bruts perçus au cours des ${salaryPeriods.length} derniers mois`
  } précédant ${
    arretTravail === "oui"
      ? "l'arrêt de travail"
      : getRuptureEventLabel(type, originRetraite)
  }`;
};

export const generateSmallText = (
  agreement?: Agreement
): string | undefined => {
  return agreement && agreement.num === 3239
    ? undefined
    : "Prendre en compte les primes et avantages en nature.";
};

export const shouldShowDateSortie = (agreement?: Agreement): boolean => {
  // Pour la CC 3239 (particuliers employeurs), seule la date de notification compte : la date de fin du préavis n'est pas demandée à l'utilisateur.
  return agreement?.num !== 3239;
};
