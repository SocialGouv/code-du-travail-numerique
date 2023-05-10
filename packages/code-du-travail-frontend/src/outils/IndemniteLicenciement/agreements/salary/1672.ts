import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary1672 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const ccInput = get().agreement1672Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1672
    );
    return sReference.computeReferenceSalary({
      salairesPendantPreavis: ccInput.noticeSalaryPeriods ?? [],
      salaires: salaryPeriods,
    });
  };
}
