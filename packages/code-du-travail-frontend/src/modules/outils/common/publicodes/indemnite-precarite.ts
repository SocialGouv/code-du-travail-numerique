import { formatIdcc } from "@socialgouv/modeles-social";
import {
  CONTRACT_FAMILY,
  ContractFamily,
  FinALaDatePrevue,
  IssueContrat,
} from "../../indemnite-precarite/types";

export type IndemnitePrecariteSituationInput = {
  family: ContractFamily;
  typeCdd: string;
  finALaDatePrevue?: FinALaDatePrevue;
  issueContrat?: IssueContrat;
};

/** Valeur attendue par le modèle pour `contrat salarié . type de contrat`. */
const TYPE_CONTRAT_PUBLICODES: Record<ContractFamily, string> = {
  [CONTRACT_FAMILY.CDD]: "CDD",
  [CONTRACT_FAMILY.CTT]: "CTT",
  [CONTRACT_FAMILY.EXCLU]: "Exclu",
};

/**
 * Situation minimale permettant au modèle de trancher l'éligibilité, sans
 * connaître la rémunération. Elle est construite dès l'étape « Terme du
 * contrat » pour savoir s'il faut sauter l'étape « Rémunération ».
 */
export const mapToPublicodesSituationForEligibilityIndemnitePrecarite = ({
  family,
  typeCdd,
  finALaDatePrevue,
  issueContrat,
}: IndemnitePrecariteSituationInput): Record<string, string> => ({
  "contrat salarié . type de contrat": `'${TYPE_CONTRAT_PUBLICODES[family]}'`,
  "contrat salarié . type de cdd": `'${typeCdd}'`,
  // Les réponses de l'étape « Terme du contrat » manquent tant qu'elle n'a pas
  // été validée : on omet la clé plutôt que d'envoyer `undefined` au moteur.
  ...(finALaDatePrevue
    ? { "contrat salarié . fin à la date prévue": `'${finALaDatePrevue}'` }
    : {}),
  ...(issueContrat
    ? { "contrat salarié . issue du contrat": `'${issueContrat}'` }
    : {}),
});

export const mapToPublicodesSituationForCalculationIndemnitePrecarite = (
  salaireDeReference: number,
  input: IndemnitePrecariteSituationInput,
  ccn?: number
): Record<string, string> => ({
  "contrat salarié . convention collective": ccn
    ? `'IDCC${formatIdcc(ccn)}'`
    : "''",
  "contrat salarié . salaire de référence": `${salaireDeReference}`,
  ...mapToPublicodesSituationForEligibilityIndemnitePrecarite(input),
});
