import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula1597 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1597
    );
    let hasMoreThan55Years = false;
    const year = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age"
      )
      ?.info as string
    if (year && parseInt(year) > 55) {
      hasMoreThan55Years = true;
    } else {
      const moreThan55YearsQuestion = get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age plus de 55 ans"
        )
        ?.info?.slice(1, -1);
      if (moreThan55YearsQuestion && moreThan55YearsQuestion === "Oui") {
        hasMoreThan55Years = true;
      }
    }
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      hasMoreThan55Years,
    });
  };
}
