import { AgreementSeniority } from ".";
import {
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";

export class AgreementSeniority1672 implements AgreementSeniority {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods,
    get,
  }): SeniorityResult {
    const professionalCategory =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - sociétés d'assurances - catégorie professionnelle"
      )?.info;
    const becameExecutiveAt =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - sociétés d'assurances - catégorie professionnelle - cadres - date du statut cadre"
      )?.info;

    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC1672
    );
    return seniority.computeSeniority({
      dateEntree,
      dateSortie,
      absencePeriods,
      isExecutive: professionalCategory === "'Cadres (Classes 5 à 7)'",
      becameExecutiveAt,
    });
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    dateSortie,
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
