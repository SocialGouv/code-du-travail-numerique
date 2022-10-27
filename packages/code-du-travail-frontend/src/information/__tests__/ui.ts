import { byTestId, byText } from "testing-library-selector";

export const ui = {
  accordionButton: (index) => byTestId(`contents-accordions-${index}`),
  tabButton: (index) => byTestId(`contents-tabs-${index}`),
  graphicBlock: {
    seeDetail: byText("Voir en détail"),
    download: byText(/Télécharger l‘infographie/),
  },
  separator: byTestId("block-separator"),
};
