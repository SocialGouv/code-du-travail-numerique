import { Agreement } from "src/modules/outils/indemnite-depart/types";
import {
  InformationsStoreInput,
  InformationsStoreError,
} from "../steps/Informations/store/types";

export const validateAgreementSpecificRules = (
  input: InformationsStoreInput,
  agreement: Agreement,
  errors: InformationsStoreError
) => {
  // Convention collective 3127 - Question hasEquivalentCdiRenewal
  if (
    agreement.num === 3127 &&
    input.criteria?.cddType ===
      "CDD dit de « mission ponctuelle ou occasionnelle »"
  ) {
    if (input.hasEquivalentCdiRenewal === undefined) {
      errors.hasEquivalentCdiRenewal = "Veuillez répondre à cette question";
    } else if (input.hasEquivalentCdiRenewal === "oui") {
      errors.hasEquivalentCdiRenewal =
        "Selon votre convention collective, lorsque le contrat de mission ponctuelle est transformé en CDI pour un poste et une durée équivalents, le salarié n'a pas le droit à une prime d'intervention.";
    }
  }

  // Convention collective 1486 - Question hasCdiProposal
  if (
    agreement.num === 1486 &&
    input.criteria?.cddType ===
      "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès"
  ) {
    if (input.hasCdiProposal === undefined) {
      errors.hasCdiProposal = "Veuillez répondre à cette question";
    } else if (input.hasCdiProposal === "oui") {
      errors.hasCdiProposal =
        "Selon votre convention collective, le salarié en contrat d'intervention qui, à l'issue de son contrat, a reçu une proposition d'un CDI, n'a pas le droit à une prime d'intervention.";
    }
  }

  // Convention collective 2511 - Question hasCdiRenewal
  if (
    agreement.num === 2511 &&
    input.criteria?.cddType === "CDD d'usage appelé contrat «d'intervention»"
  ) {
    if (input.hasCdiRenewal === undefined) {
      errors.hasCdiRenewal = "Veuillez répondre à cette question";
    } else if (input.hasCdiRenewal === "oui") {
      errors.hasCdiRenewal =
        "Selon votre convention collective, lorsque le contrat d'intervention est transformé en CDI, le salarié n'a pas le droit à une prime d'intervention.";
    }
  }

  // Convention collective 1516 - Question hasCdiRenewal
  if (agreement.num === 1516 && input.criteria?.cddType === "CDD d'usage") {
    if (input.hasCdiRenewal === undefined) {
      errors.hasCdiRenewal = "Veuillez répondre à cette question";
    } else if (input.hasCdiRenewal === "oui") {
      errors.hasCdiRenewal =
        "Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n'a pas le droit à une indemnité dite \"d'usage\".";
    }
  }
};
