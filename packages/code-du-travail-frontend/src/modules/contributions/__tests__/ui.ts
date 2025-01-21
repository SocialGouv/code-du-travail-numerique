import { byText } from "testing-library-selector";

export const ui = {
  generic: {
    linkDisplayInfo: byText(
      "Afficher les informations sans sélectionner une convention collective"
    ),
    title: byText("Que dit le code du travail ?"),
    nonTreatedInfo: byText(
      /Cette réponse correspond à ce que prévoit le code du travail/
    ),
    noCdtDescription: byText(
      "La convention collective est nécessaire pour obtenir une réponse car le code du travail ne prévoit rien sur ce sujet."
    ),
  },
};
