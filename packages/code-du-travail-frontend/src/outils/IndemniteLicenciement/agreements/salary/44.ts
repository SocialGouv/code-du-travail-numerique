import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary44 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0044
    );
    const ccInput = get().agreement44Data.input;
    const category = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle"
      )
      ?.info?.slice(1, -1) as any;
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      category,
      hasVariablePay: ccInput.hasVariablePay === "oui",
    });
  };
}
