import { deepEqualObject } from "src/modules/utils/object";
import {
  SalairesStoreInput,
  SalairesStoreError,
  SalaryErrorType,
  SalaryFieldError,
} from "./types";

export type { SalaryErrorType, SalaryFieldError };

export const validateSalaryField = (
  value: string,
  isRequired: boolean = true
): SalaryFieldError | null => {
  if (!isRequired && (!value || value.trim() === "")) {
    return null;
  }

  if (isRequired && (!value || value.trim() === "")) {
    return {
      type: SalaryErrorType.REQUIRED,
      message: "Ce champ est requis",
    };
  }

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return {
      type: SalaryErrorType.INVALID_NUMBER,
      message: "Veuillez entrer un nombre",
    };
  }

  if (numericValue < 0) {
    return {
      type: SalaryErrorType.NEGATIVE_VALUE,
      message: "La valeur ne peut pas être négative",
    };
  }

  if (isRequired && numericValue === 0) {
    return {
      type: SalaryErrorType.ZERO_VALUE,
      message: "Vous devez saisir un montant supérieur à zéro",
    };
  }

  return null;
};

export const validateSalaryPeriods = (
  salaryPeriods: SalairesStoreInput["salaryPeriods"]
): Record<string, SalaryFieldError | null> => {
  const errors: Record<string, SalaryFieldError | null> = {};

  salaryPeriods.forEach((period, index) => {
    const valueStr = period.value?.toString() || "";
    const validationError = validateSalaryField(valueStr, true);
    errors[index.toString()] = validationError;
  });

  return errors;
};

export const validatePrimePeriods = (
  salaryPeriods: SalairesStoreInput["salaryPeriods"]
): Record<string, SalaryFieldError | null> => {
  const errors: Record<string, SalaryFieldError | null> = {};

  // Validation des primes uniquement pour les 3 premiers mois
  salaryPeriods.slice(0, 3).forEach((period, index) => {
    if (period.prime !== undefined) {
      const primeStr = period.prime.toString();
      const validationError = validateSalaryField(primeStr, false); // Les primes ne sont pas requises
      errors[index.toString()] = validationError;
    } else {
      errors[index.toString()] = null;
    }
  });

  return errors;
};

// Fonctions utilitaires pour les erreurs
export const getErrorMessage = (error: SalaryFieldError | null): string => {
  return error?.message || "";
};

export const hasErrorType = (
  error: SalaryFieldError | null,
  type: SalaryErrorType
): boolean => {
  return error?.type === type;
};

export const hasError = (
  index: number,
  value: number | string | undefined,
  errors?: Record<string, SalaryFieldError | null>
): boolean => {
  if (!errors) return false;
  const error = errors[index.toString()];
  return error !== null && error !== undefined;
};

export const hasPrimeError = (
  index: number,
  value: number | undefined,
  errors?: Record<string, SalaryFieldError | null>
): boolean => {
  if (!errors) return false;
  const error = errors[index.toString()];
  return error !== null && error !== undefined;
};

export const validateStep = (state: SalairesStoreInput) => {
  let errorSalaryPeriods: Record<string, SalaryFieldError | null> | undefined =
    undefined;
  let errorPrimes: Record<string, SalaryFieldError | null> | undefined =
    undefined;

  if (state.hasTempsPartiel === "non" && state.hasSameSalary === "non") {
    // Validation des salaires
    errorSalaryPeriods = validateSalaryPeriods(state.salaryPeriods);
    const hasSalaryErrors = Object.values(errorSalaryPeriods).some(
      (error) => error !== null
    );
    if (!hasSalaryErrors) {
      errorSalaryPeriods = undefined;
    }

    // Validation des primes
    errorPrimes = validatePrimePeriods(state.salaryPeriods);
    const hasPrimeErrors = Object.values(errorPrimes).some(
      (error) => error !== null
    );
    if (!hasPrimeErrors) {
      errorPrimes = undefined;
    }
  }

  const errorState: SalairesStoreError = {
    errorHasTempsPartiel: !state.hasTempsPartiel
      ? "Vous devez répondre à cette question"
      : undefined,
    errorTempsPartiel: state.hasTempsPartiel === "oui",
    errorHasSameSalary: !state.hasSameSalary
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSalary:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalary === "oui" &&
      !state.salary
        ? "Vous devez répondre à cette question"
        : state.hasTempsPartiel === "non" &&
            state.hasSameSalary === "oui" &&
            state.salary &&
            isNaN(parseFloat(state.salary))
          ? "Vous devez saisir un nombre"
          : state.hasTempsPartiel === "non" &&
              state.hasSameSalary === "oui" &&
              parseFloat(state.salary!) <= 0
            ? "Vous devez saisir un montant supérieur à zéro"
            : undefined,
    errorSalaryPeriods,
    errorPrimes,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasTempsPartiel: undefined,
      errorHasSameSalary: undefined,
      errorSalary: undefined,
      errorTempsPartiel: false,
      errorSalaryPeriods: undefined,
      errorPrimes: undefined,
    }),
    errorState,
  };
};
