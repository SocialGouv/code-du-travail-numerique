import {
  Formula,
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula2216 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: number,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC2216
    );

    const category = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle"
      )
      ?.info?.slice(1, -1) as any

    const year = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique . age"
      )
      ?.info as string

    const firingType = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique"
      )
      ?.info?.slice(1, -1) as any

    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority,
      refSalary: agreementRefSalary,
      category,
      age: year ? parseInt(year) : 0,
      isEconomicFiring: firingType && firingType === 'Oui' ? true : false,
    });

  }
}
