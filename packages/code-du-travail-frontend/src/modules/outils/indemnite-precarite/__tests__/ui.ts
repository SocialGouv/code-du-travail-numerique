import { byTestId, byText } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  contractType: {
    cdd: byTestId("contractType - Contrat à durée déterminée (CDD)"),
    ctt: byTestId(
      "contractType - Contrat de travail temporaire (Contrat d'intérim)"
    ),
  },
  cddType: byTestId("cddType"),
  cttQuestions: {
    cttFormation: {
      oui: byTestId("cttFormation - Oui"),
      non: byTestId("cttFormation - Non"),
    },
    ruptureContratFauteGrave: {
      oui: byTestId("ruptureContratFauteGrave - Oui"),
      non: byTestId("ruptureContratFauteGrave - Non"),
    },
    propositionCDIFinContrat: {
      oui: byTestId("propositionCDIFinContrat - Oui"),
      non: byTestId("propositionCDIFinContrat - Non"),
    },
    refusSouplesse: {
      oui: byTestId("refusSouplesse - Oui"),
      non: byTestId("refusSouplesse - Non"),
    },
  },
  cddQuestions: {
    finContratPeriodeDessai: {
      oui: byTestId("finContratPeriodeDessai - Oui"),
      non: byTestId("finContratPeriodeDessai - Non"),
    },
    propositionCDIFindeContrat: {
      oui: byTestId("propositionCDIFindeContrat - Oui"),
      non: byTestId("propositionCDIFindeContrat - Non"),
    },
    refusCDIFindeContrat: {
      oui: byTestId("refusCDIFindeContrat - Oui"),
      non: byTestId("refusCDIFindeContrat - Non"),
    },
    interruptionFauteGrave: {
      oui: byTestId("interruptionFauteGrave - Oui"),
      non: byTestId("interruptionFauteGrave - Non"),
    },
    refusRenouvellementAuto: {
      oui: byTestId("refusRenouvellementAuto - Oui"),
      non: byTestId("refusRenouvellementAuto - Non"),
    },
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
  next: byTestId("next-button"),
};
