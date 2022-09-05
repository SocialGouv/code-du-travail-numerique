import {
  Formula,
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula1486 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: number,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1486
    );
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority,
      refSalary: agreementRefSalary,
      category: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement . autres . catégorie professionnelle"
        )
        ?.info?.slice(1, -1) as any,
      typeLicenciement: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement"
        )
        ?.info?.slice(1, -1) as any,
    });
  };
}
