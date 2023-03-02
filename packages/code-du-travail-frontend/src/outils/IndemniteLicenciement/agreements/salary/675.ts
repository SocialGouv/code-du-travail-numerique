import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";

export class AgreementSalary675 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0675
    );
    const catPro = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie"
      )
      ?.info?.slice(1, -1) as any;
    const isAgentMaitriseOrCadre =
      catPro === "Agents de maîtrise" || catPro === "Cadres";
    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      isAgentMaitriseOrCadre,
    });
  };

  computeExtraInfo = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): Record<string, string | number> => {
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0675
    );
    const catPro = get()
      .informationsData.input.publicodesInformations.find(
        (v) =>
          v.question.rule.nom ===
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie"
      )
      ?.info?.slice(1, -1) as any;
    const isAgentMaitriseOrCadre =
      catPro === "Agents de maîtrise" || catPro === "Cadres";
    return sReference.computeExtraInfo
      ? sReference.computeExtraInfo({
          salaires: salaryPeriods,
          isAgentMaitriseOrCadre,
        })
      : {};
  };
}
