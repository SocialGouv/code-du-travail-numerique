import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
import { formatNumberAsString } from "../../../../publicodes";
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

  refSalary = sReference.computeReferenceSalary({
    salairesPendantPreavis: ccInput.salaryPeriods,
    salaires: salaireInput.salaryPeriods,
  });

  set(
    produce((state: SalairesStoreSlice) => {
      state.salairesData.input.agreementRefSalary = refSalary;
    })
  );
};
