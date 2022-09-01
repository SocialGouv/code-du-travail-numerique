import {
  Formula,
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula2264 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: number,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC2264
    );
    let seniorityNonCadre;
    const seniorityInfo =
      get().informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps"
      )?.info;
    if (seniorityInfo) {
      seniorityNonCadre = parseFloat(seniorityInfo);
    }
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority,
      refSalary: agreementRefSalary,
      category: get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle"
        )
        ?.info?.slice(1, -1) as any,
      seniorityNonCadre,
    });
  };
}
