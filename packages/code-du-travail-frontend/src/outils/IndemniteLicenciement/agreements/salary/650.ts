import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary650 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC650
    );
    const factory = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC650
    );
    const seniority = factory.computeSeniority({
      dateEntree: get().ancienneteData.input.dateEntree!,
      dateSortie: get().ancienneteData.input.dateSortie!,
      absencePeriods: get().ancienneteData.input.absencePeriods,
    });
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      seniority,
    });
  };
}
