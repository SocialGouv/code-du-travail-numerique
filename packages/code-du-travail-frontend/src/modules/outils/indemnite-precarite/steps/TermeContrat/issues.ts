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

const ISSUE_PERIODE_ESSAI: IssueOption = {
  value: ISSUE_CONTRAT.PERIODE_ESSAI,
  label: "Rupture pendant la période d'essai",
};

const ISSUE_FORCE_MAJEURE: IssueOption = {
  value: ISSUE_CONTRAT.FORCE_MAJEURE,
  label: "Rupture pour force majeure",
};

const ISSUE_EMBAUCHE_CDI_AUTRE_ENTREPRISE: IssueOption = {
  value: ISSUE_CONTRAT.EMBAUCHE_CDI_AUTRE_ENTREPRISE,
  label: "Rupture en cas d'embauche en CDI dans une autre entreprise",
};

const ISSUE_INAPTITUDE: IssueOption = {
  value: ISSUE_CONTRAT.INAPTITUDE,
  label:
    "Rupture pour inaptitude du salarié prononcée par le médecin du travail",
};

const ISSUE_AUTRE: IssueOption = {
  value: ISSUE_CONTRAT.AUTRE,
  label: "Autre",
};

/**
 * Les listes de rupture anticipée sont exhaustives : elles couvrent tous les
 * cadres de rupture prévus, et aucun n'ouvre droit à l'indemnité. Elles ne
 * proposent donc volontairement pas d'option « Autre ».
 */
const ISSUES_RUPTURE_ANTICIPEE_CDD: IssueOption[] = [
  ISSUE_PERIODE_ESSAI,
  ISSUE_FORCE_MAJEURE,
  { value: ISSUE_CONTRAT.FAUTE_GRAVE, label: "Rupture pour faute grave" },
  ISSUE_EMBAUCHE_CDI_AUTRE_ENTREPRISE,
  ISSUE_INAPTITUDE,
  {
    value: ISSUE_CONTRAT.COMMUN_ACCORD,
    label: "Rupture d'un commun accord entre l'employeur et le salarié",
  },
];

const ISSUES_RUPTURE_ANTICIPEE_CTT: IssueOption[] = [
  ISSUE_PERIODE_ESSAI,
  ISSUE_FORCE_MAJEURE,
  {
    value: ISSUE_CONTRAT.FAUTE_GRAVE,
    label: "Rupture pour faute grave du salarié",
  },
  ISSUE_INAPTITUDE,
  ISSUE_EMBAUCHE_CDI_AUTRE_ENTREPRISE,
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
  ISSUE_AUTRE,
];

const ISSUES_TERME_CTT: IssueOption[] = [
  {
    value: ISSUE_CONTRAT.EMBAUCHE_CDI,
    label:
      "Le salarié a été immédiatement embauché en CDI par l'entreprise utilisatrice",
  },
  {
    value: ISSUE_CONTRAT.REFUS_SOUPLESSE,
    label:
      "Le salarié a refusé la mise en œuvre de la souplesse prévue au contrat de mission",
  },
  ISSUE_AUTRE,
];

/** Libellé du contrat, utilisé dans les questions de l'étape 4. */
export const contractLabel = (family: ContractFamily): string =>
  family === CONTRACT_FAMILY.CTT ? "contrat d'intérim" : "CDD";

export const getIssueOptions = (
  family: ContractFamily,
  finALaDatePrevue: FinALaDatePrevue
): IssueOption[] => {
  const isCtt = family === CONTRACT_FAMILY.CTT;
  if (finALaDatePrevue === "non") {
    return isCtt ? ISSUES_RUPTURE_ANTICIPEE_CTT : ISSUES_RUPTURE_ANTICIPEE_CDD;
  }
  return isCtt ? ISSUES_TERME_CTT : ISSUES_TERME_CDD;
};

/**
 * La seconde question de l'étape change de formulation selon que le contrat est
 * allé à son terme ou qu'il a été rompu de manière anticipée.
 */
export const getIssueQuestionLabel = (
  family: ContractFamily,
  finALaDatePrevue: FinALaDatePrevue
): string =>
  finALaDatePrevue === "non"
    ? `Dans quel cadre le <strong>${contractLabel(family)}</strong> a été rompu&nbsp;?`
    : "Le salarié a-t-il été dans l'une des situations suivantes&nbsp;?";
