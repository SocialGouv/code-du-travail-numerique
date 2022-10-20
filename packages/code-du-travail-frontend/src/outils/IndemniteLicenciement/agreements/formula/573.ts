import {
  Formula,
  FormuleFactory,
  QuestionOuiNon,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula573 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0573
    );

    const category = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce de gros . catégorie professionnelle"
      )
      ?.info?.slice(1, -1) as any;

    const year = get().informationsData.input.publicodesInformations.find(
      (v) =>
        v.question.rule.nom ===
        "contrat salarié . convention collective . commerce de gros . age"
    )?.info;

    const firingType = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce de gros . licenciement économique"
      )
      ?.info?.slice(1, -1) as QuestionOuiNon | undefined;

    const cadreAuMoins15ans = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce de gros . cadre durant au moins de 15 ans"
      )
      ?.info?.slice(1, -1) as QuestionOuiNon | undefined;

    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      category,
      age: year ? parseInt(year) : 0,
      licenciementEco: firingType ?? QuestionOuiNon.non,
      cadreAuMoins15ans: cadreAuMoins15ans ?? QuestionOuiNon.non,
    });
  };
}
