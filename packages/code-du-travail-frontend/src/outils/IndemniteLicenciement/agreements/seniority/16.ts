import {
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { AgreementSeniority } from ".";

export class AgreementSeniority16 implements AgreementSeniority {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods,
    get,
  }): SeniorityResult {
    const categoriePro =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle"
      ).info;
    const becameExecutiveAt =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - date du statut cadre"
      )?.info;

    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC0016
    );
    return seniority.computeSeniority({
      dateEntree,
      dateSortie,
      absencePeriods,
      isExecutive: categoriePro === "'Ingénieurs et cadres'",
      becameExecutiveAt,
    });
  }
}
