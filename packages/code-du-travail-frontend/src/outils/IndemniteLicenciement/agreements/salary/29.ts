import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary29 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ): number => {
    const ccInput = get().agreement29Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0029
    );
    const category = get()
      .informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle"
      )
      ?.info?.slice(1, -1) as any;
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      professionalCategory: category,
      bestSalariesTotal:
        ccInput.hasSixBestSalaries === "oui"
          ? Number(ccInput.sixBestSalariesTotal)
          : undefined,
    });
  };
}
