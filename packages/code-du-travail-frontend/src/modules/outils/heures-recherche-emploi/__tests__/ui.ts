import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  agreement: {
    agreement: byText(
      "Je sais quelle est ma convention collective et je la saisis."
    ),
    unknownAgreement: byText(
      "Je ne sais pas quelle est ma convention collective et je la recherche."
    ),
    agreementInput: byTestId("AgreementSearchAutocomplete"),
    agreementInputConfirm: byText(
      /Vous avez sélectionné la convention collective/
    ),
    agreementCompanyInput: byTestId("enterprise-search-input"),
    agreementCompanyInputAsk: byText(
      "Précisez et sélectionnez votre entreprise"
    ),
    agreementCompanyInputConfirm: byText(/Vous avez sélectionné l'entreprise/),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  print: byText("Imprimer le résultat"),
  viewResultDetail: byText("Voir le détail du calcul"),
};
