import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary1483 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const ccInput = get().agreement1483Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1483
    );
    return sReference.computeReferenceSalary({
      salairesPendantPreavis: ccInput.noticeSalaryPeriods ?? [],
      salaires: salaryPeriods,
    });
  };
}
