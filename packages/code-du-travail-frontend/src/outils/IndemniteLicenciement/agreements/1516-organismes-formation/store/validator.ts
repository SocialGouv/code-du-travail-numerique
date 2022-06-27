import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { MainStore } from "../../../store";
import {
  Agreement1516StoreInput,
  Agreement1516StoreError,
  Agreement1516StoreSlice,
} from "./types";

export const validateAgreement1516 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement1516Data.input);
  set(
    produce((state: Agreement1516StoreSlice) => {
      state.agreement1516Data.hasBeenSubmit = isValid ? false : true;
      state.agreement1516Data.isStepValid = isValid;
      state.agreement1516Data.error = errorState;
    })
  );

  if (isValid) {
    let refSalary = 0;

    const salaireInput = get().salairesData.input;
    const ccInput = get().agreement1516Data.input;

    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1516
    );

    const primes = ccInput.primes.filter((v) => v !== null) as number[];

    const salaires = salaireInput.salaryPeriods.filter(
      (v) => v.value !== undefined
    ) as { month: string; value: number }[];

    const salairesPendantPreavis = ccInput.salaryPeriods.filter(
      (v) => v.value !== undefined
    ) as { month: string; value: number }[];

    refSalary = sReference.computeReferenceSalary({
      hasSameSalaire: salaireInput.hasSameSalaire === "oui",
      salairesPendantPreavis,
      salaire: salaireInput.salaireBrut
        ? parseFloat(salaireInput.salaireBrut)
        : undefined,
      salaires,
      primesPendantPreavis: primes,
    });

    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input.agreementRefSAlary = refSalary;
      })
    );
  }

  return isValid;
};

export const validateStep = (state: Agreement1516StoreInput) => {
  const errorState: Agreement1516StoreError = {
    errorHasReceivedPrimes: !state.hasReceivedPrimes
      ? "Vous devez répondre à cette question"
      : undefined,
    errorHasReceivedSalaries: !state.hasReceivedSalaries
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSalaryPeriods:
      state.hasReceivedSalaries === "oui" &&
      (state.salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.salaryPeriods))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
    errorPrimes:
      state.hasReceivedPrimes === "oui" &&
      (state.primes.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.primes))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasReceivedPrimes: undefined,
      errorHasReceivedSalaries: undefined,
      errorSalaryPeriods: undefined,
      errorPrimes: undefined,
    }),
    errorState,
  };
};
