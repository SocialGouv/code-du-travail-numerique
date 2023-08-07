import {
  QuestionOuiNon,
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary2120 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC2120
    );
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      isLicenciementDisciplinaire: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . banque . licenciement disciplinaire"
        )
        ?.info?.slice(1, -1) as QuestionOuiNon,
      isLicenciementEco: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . banque . licenciement économique"
        )
        ?.info?.slice(1, -1) as QuestionOuiNon,
    });
  };
}
