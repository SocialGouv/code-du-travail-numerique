import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { AgreementSalary } from ".";
import { MainStore } from "../../store";
import { CategoryPro16 } from "@socialgouv/modeles-social/bin";

export class AgreementSalary16 implements AgreementSalary {
  computeSalary = (
    salaryPeriods: SalaryPeriods[],
    get: StoreApi<MainStore>["getState"]
  ): number => {
    const ccInput = get().agreement16Data.input;
    const sReference = new ReferenceSalaryFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0016
    );
    const category: CategoryPro16 = get().informationsData.input.publicodesInformations.find(
      (item) =>
        item.question.name ===
        "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle"
    )?.info as CategoryPro16;
    let driveInability;
    if (category === "'Ouvriers'") {
      const driveInabilityTemporary = get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - incapacité de conduite"
      )?.info;

      const driveInabilityDefinitive = get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - incapacité de conduite définitive"
      )?.info;
      driveInability =
        driveInabilityTemporary === "'Oui'" &&
        driveInabilityDefinitive === "'Oui'"
          ? "definitive"
          : driveInabilityTemporary === "'Oui'"
          ? "temporary"
          : undefined;
    }

    return sReference.computeReferenceSalary({
      salaires: salaryPeriods,
      category,
      hasVariablePay: ccInput.hasVariablePay === "oui",
      driveInability,
    });
  };
}
