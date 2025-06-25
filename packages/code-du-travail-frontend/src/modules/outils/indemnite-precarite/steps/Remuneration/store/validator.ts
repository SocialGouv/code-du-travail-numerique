import { RemunerationStoreInput, RemunerationStoreError } from "./types";

export const validateStep = (
  input: RemunerationStoreInput
): { isValid: boolean; errorState: RemunerationStoreError } => {
  const errorState: RemunerationStoreError = {};
  let isValid = true;

  // Validation du salaire mensuel
  if (!input.salaryInfo?.monthlySalary || input.salaryInfo.monthlySalary <= 0) {
    errorState.monthlySalary = "Veuillez saisir un salaire mensuel valide";
    isValid = false;
  }

  // Validation de la partie variable (optionnelle mais doit être positive si renseignée)
  if (input.salaryInfo?.variablePart && input.salaryInfo.variablePart < 0) {
    errorState.variablePart = "La partie variable ne peut pas être négative";
    isValid = false;
  }

  // Validation des avantages (optionnels mais doivent être positifs si renseignés)
  if (input.salaryInfo?.benefits && input.salaryInfo.benefits < 0) {
    errorState.benefits = "Les avantages ne peuvent pas être négatifs";
    isValid = false;
  }

  return { isValid, errorState };
};
