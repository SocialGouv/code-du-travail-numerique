import {
  IndemnitePrecariteData,
  CalculationResult,
  CONTRACT_TYPE,
} from "../../types";

// Fonction utilitaire pour arrondir
export const round = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// Fonction utilitaire pour additionner
export const sum = (values: number[]): number => {
  return values.reduce((acc, val) => acc + val, 0);
};

// Fonction principale de calcul de l'indemnité de précarité
export const calculateIndemnitePrecarite = (
  data: Partial<IndemnitePrecariteData>
): any => {
  const salaryInfo = data.salaryInfo;

  if (!salaryInfo?.monthlySalary) {
    return {
      indemnite: 0,
      details: {
        totalSalaires: 0,
        rate: 0,
      },
    };
  }

  // Calcul de base : 10% du salaire brut total
  const totalSalaires =
    (salaryInfo.monthlySalary || 0) +
    (salaryInfo.variablePart || 0) +
    (salaryInfo.benefits || 0);
  const rate = 0.1; // 10%
  const indemnite = round(totalSalaires * rate);

  return {
    indemnite,
    details: {
      totalSalaires,
      rate,
    },
  };
};

// Fonction pour vérifier l'éligibilité
export const hasRightToIndemnite = (
  data: Partial<IndemnitePrecariteData>
): boolean => {
  if (!data.contractType) return false;
  if (!data.salaryInfo?.monthlySalary) return false;

  // Logique d'éligibilité basique
  return (
    data.contractType === CONTRACT_TYPE.CDD ||
    data.contractType === CONTRACT_TYPE.CTT
  );
};

// Fonction pour obtenir les messages de calcul
export const getCalculationMessages = (
  data: Partial<IndemnitePrecariteData>
): { errors: string[]; warnings: string[]; info: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  if (!data.contractType) {
    errors.push("Type de contrat manquant");
  }

  if (!data.salaryInfo?.monthlySalary) {
    errors.push("Salaire mensuel manquant");
  }

  return { errors, warnings, info };
};

// Fonction pour valider les données de calcul
export const validateCalculationData = (
  data: Partial<IndemnitePrecariteData>
): boolean => {
  return !!(data.contractType && data.salaryInfo?.monthlySalary);
};
