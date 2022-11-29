import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula650 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC650
    );
    if (!agreementFactoryFormula) throw new Error("Formula should be defined");
    const year = get().informationsData.input.publicodesInformations.find(
      (v) =>
        v.question.rule.nom ===
        "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age"
    )?.info as string;
    const parseYear = year ? parseInt(year) : 0;
    let interpretedYear = parseYear;
    if (parseYear === 49) {
      const ruleYear = get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 50 ans"
        )
        ?.info?.slice(1, -1);
      if (ruleYear && ruleYear === "Oui") interpretedYear = 50;
    } else if (parseYear === 54) {
      const ruleYear = get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans"
        )
        ?.info?.slice(1, -1);
      if (ruleYear && ruleYear === "Oui") interpretedYear = 55;
    } else if (parseYear === 59) {
      const ruleYear = get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 60 ans"
        )
        ?.info?.slice(1, -1);
      if (ruleYear && ruleYear === "Oui") interpretedYear = 60;
    }
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      age: interpretedYear,
    });
  };
}
