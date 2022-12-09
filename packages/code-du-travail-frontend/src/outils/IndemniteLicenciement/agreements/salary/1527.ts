import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary1527 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const ccInput = get().agreement1527Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1527
    );
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      hasCommission: ccInput.hasCommission === "oui",
      salaryContract: Number(ccInput.contractSalary),
    });
  };
}
