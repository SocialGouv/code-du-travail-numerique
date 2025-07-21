import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byTestId("next-button"), // Le bouton "Commencer" est le bouton next de la première étape
  },
  agreement: {
    agreement: byTestId(
      "route - Je sais quelle est ma convention collective et je la saisis."
    ),
    unknownAgreement: byTestId(
      "route - Je ne sais pas quelle est ma convention collective et je la recherche."
    ),
    skipAgreement: byTestId(
      "route - Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
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
  situation: {
    fauteGraveOui: byTestId("seriousMisconduct - Oui"),
    fauteGraveNon: byTestId("seriousMisconduct - Non"),
    handicapOui: byTestId("disabledWorker - Oui"),
    handicapNon: byTestId("disabledWorker - Non"),
    seniority: byTestId("seniority"),
  },
  next: byTestId("next-button"),
  previous: byTestId("previous-button"),
  activeStep: byTitle("onglet actif"),
  warning: byTestId("warning-alert"),
  warningTitle: byTestId("warning-title"),
  print: byTestId("print-button"),
  viewResultDetail: byText("Voir le détail du calcul"),
  result: byTestId("resultat"),
  noticeDescription: byTestId("notice-description"),
};
