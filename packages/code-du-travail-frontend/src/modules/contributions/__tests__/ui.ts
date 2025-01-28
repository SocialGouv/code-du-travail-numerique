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
  },
};
