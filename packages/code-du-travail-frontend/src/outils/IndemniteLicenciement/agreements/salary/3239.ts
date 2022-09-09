import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary3239 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC3239
    );
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      catPro: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
        )
        ?.info?.slice(1, -1) as any,
    });
  };
}
