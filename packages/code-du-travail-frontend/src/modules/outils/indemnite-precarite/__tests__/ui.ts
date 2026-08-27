import { fireEvent } from "@testing-library/react";
import { byTestId, byText } from "testing-library-selector";
import {
  INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE,
  INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE,
} from "@socialgouv/modeles-social";
import { FinALaDatePrevue, ISSUE_CONTRAT, IssueContrat } from "../types";

export const ui = {
  error: {
    contractType: byText("Veuillez sélectionner un type de contrat"),
    finALaDatePrevue: byText("Veuillez répondre à cette question"),
    issueContrat: byText("Veuillez sélectionner l'issue du contrat"),
  },
  introduction: {
    startButton: byText("Commencer"),
  },
  /** Étape 3 : `optionId` provient de `getContractOptions`. */
  contractType: (optionId: string) => byTestId(`contractType-${optionId}`),
  cddRemplacement: byTestId("contractType-cdd-remplacement"),
  cddAccroissement: byTestId("contractType-cdd-accroissement"),
  ctt: byTestId("contractType-contrat-travail-temporaire"),
  autres: byTestId("contractType-autres"),
  /** Étape 4 */
  finALaDatePrevue: {
    oui: byTestId("finALaDatePrevue-oui"),
    non: byTestId("finALaDatePrevue-non"),
  },
  issueContrat: (issue: IssueContrat) => byTestId(`issueContrat-${issue}`),
  remuneration: {
    typeRemuneration: {
      total: byTestId("typeRemuneration-total"),
      mensuel: byTestId("typeRemuneration-mensuel"),
    },
    salaireTotal: byTestId("salaireTotal"),
    /** `index` est 1-based, comme les libellés « mois N ». */
    salaireMensuel: (index: number) => byTestId(`salaireMensuel-${index}`),
    dureeContrat: byTestId("dureeContrat"),
  },
  result: {
    amount: byTestId("resultat"),
    presentation: byText(
      /À partir des éléments que vous avez saisis, le montant de votre indemnité est estimé à/
    ),
    noIndemnity: byTestId("no-indemnity-message"),
    noIndemnityMessage: byText(INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE),
    noFinDeMissionMessage: byText(INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE),
    excludedContracts: byTestId("excluded-contracts"),
    title: (label: string) => byText(label),
  },
  next: byTestId("next-button"),
};

type JourneyOptions = {
  /** `id` de l'option de l'étape 3. Par défaut le CDD générique. */
  contractOptionId?: string;
  finALaDatePrevue?: FinALaDatePrevue;
  issueContrat?: IssueContrat;
};

/** Étapes 1 et 2 : introduction puis convention collective. */
export const startSimulator = () => {
  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.next.get());
};

/**
 * Déroule le parcours jusqu'à l'étape « Rémunération » (ou jusqu'au résultat
 * si la situation saisie ne donne pas droit à l'indemnité).
 */
export const fillContractSteps = ({
  contractOptionId = "cdd-remplacement",
  finALaDatePrevue = "oui",
  issueContrat = ISSUE_CONTRAT.AUTRE,
}: JourneyOptions = {}) => {
  fireEvent.click(ui.contractType(contractOptionId).get());
  fireEvent.click(ui.next.get());

  if (contractOptionId === "autres") return;

  fireEvent.click(ui.finALaDatePrevue[finALaDatePrevue].get());
  fireEvent.click(ui.issueContrat(issueContrat).get());
  fireEvent.click(ui.next.get());
};

/** Étape 5 : saisie du montant total puis passage au résultat. */
export const fillRemunerationTotal = (montant: number) => {
  fireEvent.click(ui.remuneration.typeRemuneration.total.get());
  fireEvent.change(ui.remuneration.salaireTotal.get(), {
    target: { value: `${montant}` },
  });
  fireEvent.click(ui.next.get());
};

const ISSUES_DISQUALIFIANTES: Record<FinALaDatePrevue, IssueContrat[]> = {
  oui: [
    ISSUE_CONTRAT.EMBAUCHE_CDI,
    ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT,
    ISSUE_CONTRAT.REFUS_SOUPLESSE,
  ],
  non: [
    ISSUE_CONTRAT.PERIODE_ESSAI,
    ISSUE_CONTRAT.FORCE_MAJEURE,
    ISSUE_CONTRAT.FAUTE_GRAVE,
    ISSUE_CONTRAT.EMBAUCHE_CDI_AUTRE_ENTREPRISE,
    ISSUE_CONTRAT.INAPTITUDE,
    ISSUE_CONTRAT.COMMUN_ACCORD,
  ],
};

/** Une situation disqualifiante envoie directement à l'écran de résultat. */
export const isDisqualifying = ({
  contractOptionId,
  finALaDatePrevue = "oui",
  issueContrat = ISSUE_CONTRAT.AUTRE,
}: JourneyOptions): boolean =>
  contractOptionId === "autres" ||
  ISSUES_DISQUALIFIANTES[finALaDatePrevue].includes(issueContrat);

/** Parcours nominal complet, de l'introduction au résultat. */
export const runJourney = (
  options: JourneyOptions & { montant?: number } = {}
) => {
  const { montant = 3000, ...contractOptions } = options;
  startSimulator();
  fillContractSteps(contractOptions);
  if (isDisqualifying(contractOptions)) return;
  fillRemunerationTotal(montant);
};
