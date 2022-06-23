import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
import { SalairesStoreSlice } from "../../steps/Salaires/store";

export const setLegalReferenceSalary = (
  get: GetState<SalairesStoreSlice>,
  set: SetState<SalairesStoreSlice>
) => {
  const salaireInput = get().salairesData.input;

  const sReference = new ReferenceSalaryFactory().create(
    SupportedCcIndemniteLicenciement.default
  );

  const primes = salaireInput.primes.filter((v) => v !== null) as number[];

  const salaires = salaireInput.salaryPeriods.filter(
    (v) => v.value !== undefined
  ) as { month: string; value: number }[];

  const refSalary = sReference.computeReferenceSalary({
    hasSameSalaire: salaireInput.hasSameSalaire === "oui",
    primes,
    salaire: salaireInput.salaireBrut
      ? parseFloat(salaireInput.salaireBrut)
      : undefined,
    salaires,
  });

  set(
    produce((state: SalairesStoreSlice) => {
      state.salairesData.input.refSalary = refSalary;
    })
  );
};
