import { byTestId, byText } from "testing-library-selector";

export const ui = {
  error: {
    contractType: byText(
      "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité."
    ),
    calculation: byText(
      "Une erreur est survenue lors du calcul. Veuillez réessayer."
    ),
  },
  introduction: {
    startButton: byText("Commencer"),
  },
  contractType: {
    cdd: byTestId("contractType - Contrat à durée déterminée (CDD)"),
    ctt: byTestId(
      "contractType - Contrat de travail temporaire (Contrat d'intérim)"
    ),
  },
  cddType: (value: string) => byTestId(`cddType-${value}`),
  cttQuestions: {
    cttFormation: byTestId("cttQuestions-cttFormation-checkbox"),
    ruptureContratFauteGrave: byTestId(
      "cttQuestions-ruptureContratFauteGrave-checkbox"
    ),
    propositionCDIFinContrat: byTestId(
      "cttQuestions-propositionCDIFinContrat-checkbox"
    ),
    refusSouplesse: byTestId("cttQuestions-refusSouplesse-checkbox"),
  },
  cddQuestions: {
    finContratPeriodeDessai: byTestId(
      "cddQuestions-finContratPeriodeDessai-checkbox"
    ),
    propositionCDIFindeContrat: byTestId(
      "cddQuestions-propositionCDIFindeContrat-checkbox"
    ),
    refusCDIFindeContrat: byTestId(
      "cddQuestions-refusCDIFindeContrat-checkbox"
    ),
    interruptionFauteGrave: byTestId(
      "cddQuestions-interruptionFauteGrave-checkbox"
    ),
    refusRenouvellementAuto: byTestId(
      "cddQuestions-refusRenouvellementAuto-checkbox"
    ),
  },
  agreementQuestions: {
    hasCdiProposal: byTestId("hasCdiProposal-hasCdiProposal-checkbox"),
    hasCdiRenewal: byTestId("hasCdiRenewal-hasCdiRenewal-checkbox"),
    hasEquivalentCdiRenewal: byTestId(
      "hasEquivalentCdiRenewal-hasEquivalentCdiRenewal-checkbox"
    ),
  },
  remuneration: {
    typeRemuneration: {
      total: byTestId("typeRemuneration-total"),
      mensuel: byTestId("typeRemuneration-mensuel"),
    },
    salaireTotal: byTestId("salaireTotal"),
    salaireMensuel: (index: number) => byTestId(`salaireMensuel-${index}`),
    addSalaire: byTestId("addSalaire"),
    removeSalaire: (index: number) => byTestId(`removeSalaire-${index}`),
  },
  result: {
    presentation: byText(
      "À partir des éléments que vous avez saisis, le montant de votre indemnité est estimé à"
    ),
    disqualification: byTestId("disqualification-message"),
    disqualificationTitle: byText(
      "Vous n'avez pas droit à l'indemnité de précarité"
    ),
  },
  next: byTestId("next-button"),
};
