import { InformationsStoreInput, InformationsStoreError } from "./types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { CONTRACT_TYPE } from "../../../types";

// Contrats exclus de l'indemnité de précarité
const EXCLUDED_CONTRACTS = [
  "CDD saisonnier",
  "CDD conclu avec un jeune (mineur ou majeur) pendant ses vacances scolaires ou universitaires",
  "CCD dans le cadre d'un congé de mobilité",
  "Contrat unique d'insertion (CUI) ou Parcours emploi compétences (PEC)",
  "Contrat de professionnalisation ou Contrat d'apprentissage",
  "Contrat pour lequel l'employeur s'est engagé à assurer un complément de formation professionnelle au salarié",
];

export const validateStep = (
  input: InformationsStoreInput,
  agreement?: Agreement
): { isValid: boolean; errorState: InformationsStoreError } => {
  const errors: InformationsStoreError = {
    contractType: undefined,
    criteria: undefined,
    finContratPeriodeDessai: undefined,
    propositionCDIFindeContrat: undefined,
    refusCDIFindeContrat: undefined,
    interruptionFauteGrave: undefined,
    refusRenouvellementAuto: undefined,
    cttFormation: undefined,
    ruptureContratFauteGrave: undefined,
    propositionCDIFinContrat: undefined,
    refusSouplesse: undefined,
  };

  // Validation du type de contrat
  if (!input.contractType) {
    errors.contractType = "Veuillez sélectionner un type de contrat";
  }

  if (input.contractType === CONTRACT_TYPE.CDD) {
    // Toujours valider les critères pour les CDD
    if (!input.criteria.cddType) {
      errors.criteria = { cddType: "Veuillez sélectionner un type de CDD" };
    } else if (EXCLUDED_CONTRACTS.includes(input.criteria.cddType)) {
      errors.criteria = {
        cddType:
          "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité.",
      };
    } else if (input.criteria.cddType === "Autres") {
      // Validation des questions CDD spécifiques
      validateCDDQuestions(input, errors);
    }
  }

  if (input.contractType === CONTRACT_TYPE.CTT) {
    validateCTTQuestions(input, errors);
  }

  // Vérifications spécifiques selon la convention collective
  if (agreement && input.criteria) {
    validateConventionSpecificRules(input, agreement, errors);
  }

  const isValid = !hasErrors(errors);
  return { isValid, errorState: errors };
};

const validateCDDQuestions = (
  input: InformationsStoreInput,
  errors: InformationsStoreError
) => {
  // Vérifier que toutes les questions CDD obligatoires sont répondues
  if (input.finContratPeriodeDessai === undefined) {
    errors.finContratPeriodeDessai = "Veuillez répondre à cette question";
  } else if (input.finContratPeriodeDessai === true) {
    errors.finContratPeriodeDessai =
      "Lorsque le CDD a été rompu pendant la période d'essai, le salarié en CDD n'a pas le droit à une prime de précarité.";
  }

  if (input.propositionCDIFindeContrat === undefined) {
    errors.propositionCDIFindeContrat = "Veuillez répondre à cette question";
  } else if (input.propositionCDIFindeContrat === true) {
    errors.propositionCDIFindeContrat =
      "Le salarié en CDD qui est immédiatement embauché dans l'entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n'a pas le droit à une prime de précarité.";
  }

  // Question conditionnelle : seulement si propositionCDIFindeContrat === false
  if (input.propositionCDIFindeContrat === false) {
    if (input.refusCDIFindeContrat === undefined) {
      errors.refusCDIFindeContrat = "Veuillez répondre à cette question";
    } else if (input.refusCDIFindeContrat === true) {
      errors.refusCDIFindeContrat =
        "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l'entreprise avec une rémunération au moins équivalente, n'a pas le droit à une prime de précarité.";
    }
  }

  if (input.interruptionFauteGrave === undefined) {
    errors.interruptionFauteGrave = "Veuillez répondre à cette question";
  } else if (input.interruptionFauteGrave === true) {
    errors.interruptionFauteGrave =
      "Lorsque le CDD est rompu de manière anticipée à l'initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n'a pas le droit à une prime de précarité.";
  }

  if (input.refusRenouvellementAuto === undefined) {
    errors.refusRenouvellementAuto = "Veuillez répondre à cette question";
  } else if (input.refusRenouvellementAuto === true) {
    errors.refusRenouvellementAuto =
      "Le salarié en CDD qui refuse le renouvellement de son CDD alors que son contrat prévoyait dès l'origine son renouvellement et ses modalités de renouvellement n'a pas le droit à une prime de précarité.";
  }
};

const validateCTTQuestions = (
  input: InformationsStoreInput,
  errors: InformationsStoreError
) => {
  // Vérifier que toutes les questions CTT obligatoires sont répondues
  if (input.cttFormation === undefined) {
    errors.cttFormation = "Veuillez répondre à cette question";
  } else if (input.cttFormation === true) {
    errors.cttFormation =
      "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité.";
  }

  if (input.ruptureContratFauteGrave === undefined) {
    errors.ruptureContratFauteGrave = "Veuillez répondre à cette question";
  } else if (input.ruptureContratFauteGrave === true) {
    errors.ruptureContratFauteGrave =
      "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l'initiative du salarié, pour faute grave du salarié ou en cas de force majeure, le salarié n'a pas le droit à une prime de précarité.";
  }

  if (input.propositionCDIFinContrat === undefined) {
    errors.propositionCDIFinContrat = "Veuillez répondre à cette question";
  } else if (input.propositionCDIFinContrat === true) {
    errors.propositionCDIFinContrat =
      "Le salarié en contrat de travail temporaire (contrat d'intérim) qui est immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission n'a pas le droit à une prime de précarité.";
  }

  if (input.refusSouplesse === undefined) {
    errors.refusSouplesse = "Veuillez répondre à cette question";
  } else if (input.refusSouplesse === true) {
    errors.refusSouplesse =
      "Le salarié en contrat d'intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n'a pas le droit à une prime de précarité.";
  }
};

const validateConventionSpecificRules = (
  input: InformationsStoreInput,
  agreement: Agreement,
  errors: InformationsStoreError
) => {
  // Validation des questions spécifiques aux conventions collectives

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

const hasErrors = (errors: InformationsStoreError): boolean => {
  return Object.values(errors).some((error) => {
    if (typeof error === "string") return !!error;
    if (typeof error === "object" && error !== null) {
      return Object.values(error).some((nestedError) => !!nestedError);
    }
    return false;
  });
};

export const isValidField = (value: any, type?: any): string | undefined => {
  if (value === undefined || value === null || value === "") {
    return "Ce champ est requis";
  }
  return undefined;
};

export { EXCLUDED_CONTRACTS };
