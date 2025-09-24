import { byTestId } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byTestId("next-button"), // Le bouton "Commencer" est le bouton next de la première étape
  },
  agreement: {
    skipAgreement: byTestId(
      "route-Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ),
  },
  situation: {
    fauteGraveOui: byTestId("seriousMisconduct-Oui"),
    fauteGraveNon: byTestId("seriousMisconduct-Non"),
    handicapOui: byTestId("disabledWorker-Oui"),
    handicapNon: byTestId("disabledWorker-Non"),
    seniority: byTestId("seniority"),
  },
  next: byTestId("next-button"),
  print: byTestId("print-button"),
  result: byTestId("resultat"),
};
