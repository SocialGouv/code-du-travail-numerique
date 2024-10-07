import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { NoticeUsed } from "./types";

export const getDescription = (
  typeDeDepart: DepartOuMiseRetraite,
  noticeUsed: NoticeUsed,
  isSeniorityLessThan6Months: boolean,
  hasAgreement: boolean,
  hasAgreementResult: boolean,
  isAgreementSupported: boolean,
): string | undefined => {
  if (isSeniorityLessThan6Months) {
    switch (true) {
      case noticeUsed === NoticeUsed.none && !hasAgreement:
        return "Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter.";
      case noticeUsed === NoticeUsed.none && isAgreementSupported:
        return "Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter.";
      case noticeUsed === NoticeUsed.agreementLabor && isAgreementSupported:
        return "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective.";
    }
    return undefined;
  }

  if (!hasAgreement) {
    return "La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale.";
  } else if (!isAgreementSupported) {
    return "La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale.";
  } else {
    switch (noticeUsed) {
      case NoticeUsed.legal:
        if (hasAgreementResult) {
          return `La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus ${
            typeDeDepart === "depart-retraite" ? "courte" : "longue"
          } que la durée prévue par la convention collective.`;
        } else {
          return "En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale.";
        }
      case NoticeUsed.agreementLabor:
        return `La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus ${
          typeDeDepart === "depart-retraite" ? "courte" : "longue"
        } que la durée légale.`;
      case NoticeUsed.same:
      case NoticeUsed.none:
        return undefined;
    }
  }
};
