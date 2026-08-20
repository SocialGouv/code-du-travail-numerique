import { formatIdcc } from "@socialgouv/modeles-social";
import {
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
}: IndemnitePrecariteSituationInput): Record<string, string | undefined> => ({
  "contrat salarié . type de contrat": `'${family === "EXCLU" ? "Exclu" : family}'`,
  "contrat salarié . type de cdd": `'${typeCdd}'`,
  "contrat salarié . fin à la date prévue": finALaDatePrevue
    ? `'${finALaDatePrevue}'`
    : undefined,
  "contrat salarié . issue du contrat": issueContrat
    ? `'${issueContrat}'`
    : undefined,
});

export const mapToPublicodesSituationForCalculationIndemnitePrecarite = (
  salaireDeReference: number,
  input: IndemnitePrecariteSituationInput,
  ccn?: number
): Record<string, string | undefined> => ({
  "contrat salarié . convention collective": ccn
    ? `'IDCC${formatIdcc(ccn)}'`
    : "''",
  "contrat salarié . salaire de référence": `${salaireDeReference}`,
  ...mapToPublicodesSituationForEligibilityIndemnitePrecarite(input),
});
