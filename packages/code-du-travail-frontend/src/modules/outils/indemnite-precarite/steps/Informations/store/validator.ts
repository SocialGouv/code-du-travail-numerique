import {
  InformationsStoreInput,
  InformationsStoreError,
  DisqualificationReason,
  CddConditionKey,
  CttConditionKey,
  AgreementConditionKey,
} from "./types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { CONTRACT_TYPE } from "../../../types";
import {
  CDD_TYPES,
  EXCLUDED_CONTRACTS,
} from "../../../agreements/cddTypesFactory";

const CDD_CONDITION_ORDER: CddConditionKey[] = [
  "finContratPeriodeDessai",
  "propositionCDIFindeContrat",
  "refusCDIFindeContrat",
  "interruptionFauteGrave",
  "refusRenouvellementAuto",
];

const CTT_CONDITION_ORDER: CttConditionKey[] = [
  "cttFormation",
  "ruptureContratFauteGrave",
  "propositionCDIFinContrat",
  "refusSouplesse",
];

type AgreementConditionConfig = {
  idcc: number;
  cddType: string;
  key: AgreementConditionKey;
};

const AGREEMENT_CONDITIONS: AgreementConditionConfig[] = [
  {
    idcc: 1486,
    cddType: CDD_TYPES.INTERVENTION_FOIRES_SALONS,
    key: "hasCdiProposal",
  },
  { idcc: 1516, cddType: CDD_TYPES.USAGE_1516, key: "hasCdiRenewal" },
  {
    idcc: 2511,
    cddType: CDD_TYPES.USAGE_INTERVENTION_2511,
    key: "hasCdiRenewal",
  },
  {
    idcc: 3127,
    cddType: CDD_TYPES.MISSION_PONCTUELLE,
    key: "hasEquivalentCdiRenewal",
  },
];

export const validateStep = (
  input: InformationsStoreInput
): { isValid: boolean; errorState: InformationsStoreError } => {
  const errors: InformationsStoreError = {
    contractType: undefined,
    criteria: undefined,
  };

  // Validation du type de contrat (obligatoire)
  if (!input.contractType) {
    errors.contractType = "Veuillez sélectionner un type de contrat";
  }

  // Validation du type de CDD (obligatoire si contractType === CDD)
  if (input.contractType === CONTRACT_TYPE.CDD && !input.criteria?.cddType) {
    errors.criteria = { cddType: "Veuillez sélectionner un type de CDD" };
  }

  const isValid = !hasErrors(errors);
  return { isValid, errorState: errors };
};

export const computeDisqualificationReason = (
  input: InformationsStoreInput,
  agreement?: Agreement
): DisqualificationReason | undefined => {
  // 1. Type de CDD exclu (saisonnier, jeune en vacances, CUI/PEC, etc.)
  if (
    input.contractType === CONTRACT_TYPE.CDD &&
    input.criteria?.cddType &&
    EXCLUDED_CONTRACTS.includes(input.criteria.cddType)
  ) {
    return { kind: "excludedCddType", subtype: input.criteria.cddType };
  }

  // 2. Conditions CDD (uniquement pour le type "Autres")
  if (
    input.contractType === CONTRACT_TYPE.CDD &&
    input.criteria?.cddType === "Autres"
  ) {
    for (const key of CDD_CONDITION_ORDER) {
      if (input[key] === true) {
        return { kind: "cddCondition", key };
      }
    }
  }

  // 3. Conditions CTT
  if (input.contractType === CONTRACT_TYPE.CTT) {
    for (const key of CTT_CONDITION_ORDER) {
      if (input[key] === true) {
        return { kind: "cttCondition", key };
      }
    }
  }

  // 4. Conditions spécifiques aux conventions collectives
  if (agreement && input.criteria?.cddType) {
    const condition = AGREEMENT_CONDITIONS.find(
      (c) =>
        c.idcc === agreement.num && c.cddType === input.criteria?.cddType
    );
    if (condition && input[condition.key] === true) {
      return {
        kind: "agreementCondition",
        idcc: condition.idcc,
        key: condition.key,
      };
    }
  }

  return undefined;
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

export const isValidField = (value: any, _type?: any): string | undefined => {
  if (value === undefined || value === null || value === "") {
    return "Ce champ est requis";
  }
  return undefined;
};

export { EXCLUDED_CONTRACTS } from "../../../agreements/cddTypesFactory";
