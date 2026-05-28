export const HOURS_PER_MONTH = (35 * 52) / 12;

export type ChallengerFormula =
  | "smic_hourly"
  | "smic_monthly_35h"
  | "smic_monthly_custom"
  | "smic_annual"
  | "smic_annual_custom_monthly"
  | "smic_annual_custom_week"
  | "smic_monthly_percent"
  | "smic_monthly_multiple";

export const CHALLENGER_FORMULAS: {
  value: ChallengerFormula;
  label: string;
  paramLabel?: string;
}[] = [
  { value: "smic_hourly", label: "SMIC horaire" },
  {
    value: "smic_monthly_35h",
    label: "SMIC mensuel — 35h (151,67 h × SMIC horaire)",
  },
  {
    value: "smic_monthly_custom",
    label: "SMIC mensuel personnalisé",
    paramLabel: "Nombre d'heures / semaine",
  },
  { value: "smic_annual", label: "SMIC annuel" },
  {
    value: "smic_annual_custom_monthly",
    label: "SMIC annuel personnalisé (mois)",
    paramLabel: "Nombre d'heures / mois",
  },
  {
    value: "smic_annual_custom_week",
    label: "SMIC annuel personnalisé (semaine)",
    paramLabel: "Nombre d'heures / semaine",
  },
  {
    value: "smic_monthly_percent",
    label: "% du SMIC mensuel",
    paramLabel: "Pourcentage (%)",
  },
  {
    value: "smic_monthly_multiple",
    label: "Multiple du SMIC mensuel",
    paramLabel: "Facteur (multiplicateur)",
  },
];

const CHALLENGER_FORMULA_VALUES: ChallengerFormula[] = CHALLENGER_FORMULAS.map(
  ({ value }) => value
);

export const isChallengerFormula = (
  value: string | undefined
): value is ChallengerFormula =>
  !!value && CHALLENGER_FORMULA_VALUES.includes(value as ChallengerFormula);

export function computeChallengerReference(
  formula: ChallengerFormula,
  parameter: string | null | undefined,
  smicHourly: number
): number {
  const param = parameter ? parseFloat(parameter) : NaN;
  switch (formula) {
    case "smic_hourly":
      return smicHourly;
    case "smic_monthly_35h":
      return smicHourly * HOURS_PER_MONTH;
    case "smic_monthly_custom":
      return isNaN(param) ? 0 : smicHourly * ((param * 52) / 12);
    case "smic_annual":
      return smicHourly * HOURS_PER_MONTH * 12;
    case "smic_annual_custom_monthly":
      return isNaN(param) ? 0 : smicHourly * param * 12;
    case "smic_annual_custom_week":
      return isNaN(param) ? 0 : smicHourly * param * 52;
    case "smic_monthly_percent":
      return isNaN(param) ? 0 : smicHourly * HOURS_PER_MONTH * (param / 100);
    case "smic_monthly_multiple":
      return isNaN(param) ? 0 : smicHourly * HOURS_PER_MONTH * param;
  }
}

export function formatChallengerEur(value: number): string {
  return (
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " €"
  );
}
