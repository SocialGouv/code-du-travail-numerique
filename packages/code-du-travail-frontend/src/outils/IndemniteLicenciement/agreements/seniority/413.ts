import {
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { AgreementSeniority } from ".";

export class AgreementSeniority413 implements AgreementSeniority {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods,
    get,
  }): SeniorityResult {
    const categoriePro =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.rule.nom ===
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle"
      ).info;
    const becameExecutiveAt =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.rule.nom ===
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps"
      )?.info;

    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC413
    );
    return seniority.computeSeniority({
      dateEntree,
      dateSortie,
      absencePeriods,
      isExecutive:
        categoriePro === "'Cadres'" ||
        categoriePro ===
          "'Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service'",
      becameExecutiveAt,
    });
  }

  computeRequiredSeniority({
    dateEntree,
    dateSortie,
    dateNotification,
    absencePeriods,
    get,
  }) {
    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1672
    );
    return seniority.computeRequiredSeniority({
      dateEntree,
      dateNotification,
      dateSortie,
      absencePeriods,
    });
  }
}