import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary1486 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1486
    );
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      catPro: get()
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
