import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary1516 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ): number => {
    const ccInput = get().agreement1516Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1516
    );
    return sReference.computeReferenceSalary({
      salairesPendantPreavis: ccInput.salaryPeriods,
      salaires: salaryPeriods,
    });
  };
}
