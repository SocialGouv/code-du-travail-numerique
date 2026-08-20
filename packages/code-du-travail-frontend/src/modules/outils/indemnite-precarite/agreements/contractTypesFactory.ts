import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { CONTRACT_FAMILY, ContractOption, TYPE_CDD } from "../types";

const CDD_REMPLACEMENT: ContractOption = {
  id: "cdd-remplacement-accroissement",
  label: "CDD de remplacement ou d'accroissement temporaire d'activité",
  hint: "Le motif de l'embauche en CDD est obligatoirement indiqué dans le contrat de travail.",
  family: CONTRACT_FAMILY.CDD,
  typeCdd: TYPE_CDD.AUTRES,
};

const CTT: ContractOption = {
  id: "contrat-travail-temporaire",
  label: "Contrat de travail temporaire (CTT)",
  family: CONTRACT_FAMILY.CTT,
  typeCdd: TYPE_CDD.AUTRES,
};

export const AUTRES_CONTRATS: ContractOption = {
  id: "autres",
  label: "Autres",
  family: CONTRACT_FAMILY.EXCLU,
  typeCdd: TYPE_CDD.AUTRES,
};

const HINT_EVENEMENTIEL =
  "CDD conclu pour la réalisation d'un événement ou d'une manifestation dans le secteur d'activité d'organisation des foires, salons et congrès.";

/**
 * Types de CDD spécifiques prévus par certaines conventions collectives
 * (issue #7436). Une convention absente de cette table suit le cas générique.
 */
const AGREEMENT_CONTRACT_OPTIONS: Record<number, ContractOption[]> = {
  1090: [
    {
      id: "1090-usage-convoyeurs",
      label: "CDD d'usage conclu avec les convoyeurs de véhicules",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_CONVOYEURS,
    },
  ],
  1486: [
    {
      id: "1486-usage-enqueteurs-vacataires",
      label: "CDD d'usage pour les enquêteurs vacataires",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_ENQUETEURS_VACATAIRES,
    },
    {
      id: "1486-usage-intervention-evenementiel",
      label: "CDD d'usage / CDD d'intervention pour le secteur évènementiel",
      hint: HINT_EVENEMENTIEL,
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_INTERVENTION_EVENEMENTIEL,
    },
  ],
  1516: [
    {
      id: "1516-usage-formateurs",
      label: "CDD d'usage pour les formateurs",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_FORMATEURS,
    },
  ],
  1979: [
    {
      id: "1979-usage-extra",
      label: "CDD d'usage / CDD d'extra",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_EXTRA,
    },
  ],
  2098: [
    {
      id: "2098-usage-intervention-evenementiel",
      label: "CDD d'usage / CDD d'intervention pour le secteur évènementiel",
      hint: HINT_EVENEMENTIEL,
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_INTERVENTION_EVENEMENTIEL,
    },
    {
      id: "2098-optimisation-lineaire",
      label: "CDD d'optimisation linéaire",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.OPTIMISATION_LINEAIRE,
    },
    {
      id: "2098-animation-commerciale",
      label: "CDD d'animation commerciale",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.ANIMATION_COMMERCIALE,
    },
  ],
  2511: [
    {
      id: "2511-usage-intervention",
      label: "CDD d'usage / contrat d'intervention",
      hint: "CDD conclu pour l'organisation d'une manifestation sportive nationale, internationale ou d'une ampleur exceptionnelle.",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_INTERVENTION_SPORT,
    },
  ],
  3127: [
    {
      id: "3127-usage-mission-ponctuelle",
      label: "CDD d'usage / CDD de mission ponctuelle ou occasionnelle",
      family: CONTRACT_FAMILY.CDD,
      typeCdd: TYPE_CDD.USAGE_MISSION_PONCTUELLE,
    },
  ],
};

/**
 * Liste unique et à plat des types de contrat proposés à l'étape 3, dans
 * l'ordre : options génériques, options conventionnelles, puis « Autres ».
 */
export function getContractOptions(agreement?: Agreement): ContractOption[] {
  const agreementOptions = agreement
    ? (AGREEMENT_CONTRACT_OPTIONS[agreement.num] ?? [])
    : [];
  return [CDD_REMPLACEMENT, CTT, ...agreementOptions, AUTRES_CONTRATS];
}

export function findContractOption(
  id: string | undefined,
  agreement?: Agreement
): ContractOption | undefined {
  if (!id) return undefined;
  return getContractOptions(agreement).find((option) => option.id === id);
}
