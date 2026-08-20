import {
  CONTRACT_FAMILY,
  ContractFamily,
  FinALaDatePrevue,
  ISSUE_CONTRAT,
  IssueContrat,
} from "../../types";

export type IssueOption = {
  value: IssueContrat;
  label: string;
  hint?: string;
};

const ISSUES_RUPTURE_ANTICIPEE: IssueOption[] = [
  {
    value: ISSUE_CONTRAT.FORCE_MAJEURE,
    label: "Rupture anticipée pour force majeure",
  },
  {
    value: ISSUE_CONTRAT.FAUTE_GRAVE,
    label: "Rupture anticipée pour faute grave du salarié",
  },
  {
    value: ISSUE_CONTRAT.INITIATIVE_SALARIE,
    label: "Rupture anticipée à l'initiative du salarié",
  },
  { value: ISSUE_CONTRAT.AUTRE, label: "Autre" },
];

const ISSUES_TERME_CDD: IssueOption[] = [
  {
    value: ISSUE_CONTRAT.EMBAUCHE_CDI,
    label: "Le salarié a été immédiatement embauché en CDI dans l'entreprise",
  },
  {
    value: ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT,
    label: "Le salarié a refusé un CDI équivalent dans l'entreprise",
    hint: "Refus par le salarié d'un CDI où il aurait occupé le même emploi ou un emploi similaire avec une rémunération au moins équivalente.",
  },
  { value: ISSUE_CONTRAT.AUTRE, label: "Autre" },
];

const ISSUES_TERME_CTT: IssueOption[] = [
  {
    value: ISSUE_CONTRAT.EMBAUCHE_CDI,
    label:
      "Le salarié a été immédiatement embauché en CDI dans l'entreprise utilisatrice",
  },
  {
    // TODO métier : le libellé de l'infobulle reste à préciser (issue #7142).
    value: ISSUE_CONTRAT.REFUS_SOUPLESSE,
    label:
      "Refus de la mise en œuvre de la souplesse prévue au contrat de mission",
  },
  { value: ISSUE_CONTRAT.AUTRE, label: "Autre" },
];

/** Libellé court du contrat, utilisé dans les questions de l'étape 4. */
export const contractLabel = (family: ContractFamily): string =>
  family === CONTRACT_FAMILY.CTT ? "CTT" : "CDD";

export const getIssueOptions = (
  family: ContractFamily,
  finALaDatePrevue: FinALaDatePrevue
): IssueOption[] => {
  if (finALaDatePrevue === "non") {
    return ISSUES_RUPTURE_ANTICIPEE;
  }
  return family === CONTRACT_FAMILY.CTT ? ISSUES_TERME_CTT : ISSUES_TERME_CDD;
};
