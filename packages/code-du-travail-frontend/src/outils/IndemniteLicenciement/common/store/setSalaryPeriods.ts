import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepMergeArray } from "../../../../lib";
import { AncienneteStoreSlice } from "../../steps/Anciennete/store";
import { SalaryPeriods } from "../../steps/Salaires/components/SalaireTempsPlein";
import { SalairesStoreSlice } from "../../steps/Salaires/store";
import { computeSalaryPeriods } from "../usecase";

export const setSalaryPeriods = (
  get: GetState<AncienneteStoreSlice & SalairesStoreSlice>,
  set: SetState<AncienneteStoreSlice & SalairesStoreSlice>
) => {
  const ancienneteInput = get().ancienneteData.input;
  const hasSameSalaire = get().salairesData.input.hasSameSalaire;
  if (hasSameSalaire === "non") {
    const periods = computeSalaryPeriods({
      dateEntree: ancienneteInput.dateEntree ?? "",
      dateNotification: ancienneteInput.dateNotification ?? "",
      absencePeriods: ancienneteInput.absencePeriods,
    });
    const p: SalaryPeriods[] = periods.map((v) => ({
      month: v,
      value: undefined,
    }));
    const salaryPeriods = deepMergeArray(
      p,
      get().salairesData.input.salaryPeriods,
      "month"
    );
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input.salaireBrut = undefined;
        state.salairesData.input.salaryPeriods = salaryPeriods;
      })
    );
  } else {
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input.hasPrimes = undefined;
        state.salairesData.input.salaryPeriods = [];
      })
    );
  }
};
