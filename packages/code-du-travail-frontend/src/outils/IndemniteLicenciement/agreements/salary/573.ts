import {
  QuestionOuiNon,
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary573 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0573
    );

    const firingType = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique"
      )
      ?.info?.slice(1, -1) as QuestionOuiNon | undefined;

    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      licenciementEco: firingType ?? QuestionOuiNon.non,
    });
  };
}