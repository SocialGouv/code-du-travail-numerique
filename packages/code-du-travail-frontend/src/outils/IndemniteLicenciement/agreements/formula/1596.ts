import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";

export class AgreementFormula1596 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: StoreApi<MainStore>["getState"]
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1596
    );
    if (!agreementFactoryFormula) throw new Error("Formula should be defined");

    const year = get().informationsData.input.publicodesInformations.find(
      (v) =>
        v.question.rule.nom ===
        "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age"
    )?.info as string;
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      hasMoreThan55Years: parseInt(year) > 55,
    });
  };
}
