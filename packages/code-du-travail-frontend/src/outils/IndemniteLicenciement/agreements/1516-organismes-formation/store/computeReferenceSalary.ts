import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { MainStore } from "../../../store";

export const computeReferenceSalary = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
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
};
