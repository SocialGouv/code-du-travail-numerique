import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula44 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0044
    );

    const category = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle"
      )
      ?.info?.slice(1, -1) as any;

    const year = get().informationsData.input.publicodesInformations.find(
      (v) =>
        v.question.rule.nom ===
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age"
    )?.info as string;

    const firingType = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique"
      )
      ?.info?.slice(1, -1) as string;

    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      category,
      age: year ? parseInt(year) : 0,
      isEconomicFiring: firingType && firingType === "Oui" ? true : false,
    });
  };
}
