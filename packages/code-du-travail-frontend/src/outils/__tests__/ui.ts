import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  agreement: {
    agreement: byText(
      "Je sais quelle est ma convention collective (je la saisis)"
    ),
    unknownAgreement: byText(
      "Je ne sais pas quelle est ma convention collective (je la recherche)"
    ),
    noAgreement: byText(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)"
    ),
    agreementInput: byTestId("agreement-search-input"),
    agreementInputConfirm: byText(
      /Vous avez sélectionné la convention collective/
    ),
    agreementCompanyInput: byTestId("agreement-company-search-input"),
    agreementCompanyInputAsk: byText(
      "Précisez et sélectionnez votre entreprise"
    ),
    agreementCompanyInputConfirm: byText(/Vous avez sélectionné l'entreprise/),
    agreementPostalCodeInput: byTestId("agreement-postal-code-search-input"),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  print: byText("Imprimer le résultat"),
};
