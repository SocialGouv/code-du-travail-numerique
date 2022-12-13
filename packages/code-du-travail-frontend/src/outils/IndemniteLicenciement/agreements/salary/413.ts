import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary413 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    _get: StoreApi<MainStore>["getState"]
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC413
    );
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
    });
  };
}
