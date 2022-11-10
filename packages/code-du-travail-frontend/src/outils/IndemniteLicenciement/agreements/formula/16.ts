import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { AgreementFormula } from ".";
import { MainStore } from "../../store";
import { CategoryPro16 } from "@socialgouv/modeles-social";

export class AgreementFormula16 implements AgreementFormula {
  computeFormula = (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ): Formula => {
    const agreementFactoryFormula = new FormuleFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0016
    );
    if (!agreementFactoryFormula) throw new Error("Formula should be defined");
    const category: CategoryPro16 =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle"
      )?.info as CategoryPro16;
    const age = Number(
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - age"
      )?.info
    );
    let driveInability;
    if (category === "'Ouvriers'") {
      const driveInabilityTemporary =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - incapacité de conduite"
        )?.info;

      const driveInabilityDefinitive =
        get().informationsData.input.publicodesInformations.find(
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
    const haveRightToRetirement =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - droit à la retraite au titre du régime en vigueur dans l'entreprise"
      )?.info;
    const seniortyTAM = agreementSeniority.extraInfos
      ? agreementSeniority.extraInfos[
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre"
        ]
      : undefined;
    return agreementFactoryFormula.computeFormula({
      seniority: agreementSeniority.value,
      refSalary: agreementRefSalary,
      category,
      age,
      seniorityTAM: seniortyTAM,
      driveInability,
      haveRightToRetirement: haveRightToRetirement
        ? haveRightToRetirement === "'Oui'"
        : undefined,
    });
  };
}
