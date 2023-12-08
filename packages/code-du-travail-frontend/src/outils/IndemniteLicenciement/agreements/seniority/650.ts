import {
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { AgreementSeniority } from ".";

export class AgreementSeniority650 implements AgreementSeniority {
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
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle"
      )?.info;
    const hasBeenExecutive =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre"
      )?.info;
    const hasBeenDayContract =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour"
      )?.info;
    const hasAllwaysBeenDayContract =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour"
      )?.info;
    const dateBeginDayContract =
      hasAllwaysBeenDayContract === "'Non'"
        ? get().informationsData.input.publicodesInformations.find(
            (item) =>
              item.question.name ===
              "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - date"
          )?.info
        : undefined;

    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC650
    );
    return seniority.computeSeniority({
      dateEntree,
      dateSortie,
      absencePeriods,
      categoriePro,
      hasBeenDayContract: hasBeenDayContract === "'Oui'",
      dateBecomeDayContract: dateBeginDayContract,
      hasBeenExecutive: hasBeenExecutive === "'Oui'",
    });
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods,
    get,
  }) {
    const categoriePro =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle"
      )?.info;
    const hasBeenExecutive =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre"
      )?.info;
    const hasBeenDayContract =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour"
      )?.info;
    const hasAllwaysBeenDayContract =
      get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour"
      )?.info;
    const dateBeginDayContract =
      hasAllwaysBeenDayContract === "'Non'"
        ? get().informationsData.input.publicodesInformations.find(
            (item) =>
              item.question.name ===
              "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - date"
          )?.info
        : undefined;

    const seniority = new SeniorityFactory().create(
      SupportedCcIndemniteLicenciement.IDCC650
    );
    return seniority.computeRequiredSeniority({
      dateEntree,
      dateSortie: dateNotification,
      absencePeriods,
      categoriePro,
      hasBeenDayContract: hasBeenDayContract === "'Oui'",
      dateBecomeDayContract: dateBeginDayContract,
      hasBeenExecutive: hasBeenExecutive === "'Oui'",
    });
  }
}
