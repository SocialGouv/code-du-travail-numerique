import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  contract: {
    originDepart: {
      question: byText("Qui est à l'origine du départ en retraite ?"),
      depart: byTestId(
        "originDepart - Le salarié décide lui-même de partir à la retraite"
      ),
      mise: byTestId(
        "originDepart - L'employeur décide de mettre le salarié à la retraite"
      ),
    },
    alert: byTestId("warning-origin-depart"),
  },
  agreement: {
    noAgreement: byTestId(
      "route - Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ),
    agreement: byTestId(
      "route -  Je sais quelle est ma convention collective et je la saisis."
    ),
    unknownAgreement: byTestId(
      "route - Je ne sais pas quelle est ma convention collective et je la recherche."
    ),
    agreementInput: byTestId("agreement-search-input"),
    agreementInputConfirm: byText(
      /Vous avez sélectionné la convention collective/
    ),
    agreementCompanyInput: byTestId("agreement-company-search-input"),
    agreementCompanySearchButton: byTestId("agreement-company-search-button"),
    agreementCompanyInputAsk: byText(
      "Précisez et sélectionnez votre entreprise"
    ),
    agreementCompanyInputConfirm: byText(/Vous avez sélectionné l'entreprise/),
    agreementPostalCodeInput: byTestId("agreement-postal-code-search-input"),
    searchItem: {
      agreement16: byText(
        "Transports routiers et activités auxiliaires du transport"
      ),
      agreement3239: byText("Particuliers employeurs et emploi à domicile"),
      carrefour: byText("CARREFOUR HYPERMARCHES"),
      bricomanie: byText("BRICOMANIE"),
    },
    ccChoice: {
      commerce: byText(
        "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
      ),
      transport: byText(
        "Transports routiers et activités auxiliaires du transport (IDCC 0016)"
      ),
      bureau: byText(
        "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils (IDCC 1486)"
      ),
    },
  },
  information: {
    agreement16: {
      categoryQuestion: byText(
        "Quelle est la catégorie professionnelle du salarié ?"
      ),
      categoryAnswers: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
      ),
    },
    agreement1090: {
      categoryQuestion: byText(
        "Quelle est la catégorie professionnelle du salarié ?"
      ),
      categoryAnswers: byTestId(
        "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle"
      ),
      echelonQuestion: byText("Quel est l'échelon du salarié ?"),
      echelonAnswers: byTestId(
        "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle - ouvriers - échelon"
      ),
    },
    agreement2264: {
      categoryQuestion: byText(
        "Quelle est la catégorie professionnelle du salarié ?"
      ),
      categoryAnswers: byTestId(
        "infos.contrat salarié - convention collective - hospitalisation privées - catégorie professionnelle"
      ),
    },
    agreement3239: {
      categoryQuestion: byText(
        "Quelle est la catégorie professionnelle du salarié ?"
      ),
      categoryAnswers: byTestId(
        "infos.contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
      ),
      alert: byTestId("alert-note"),
    },
    handicap: {
      question: byText(
        "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
      ),
      answerNon: byTestId(
        "infos.contrat salarié - travailleur handicapé - Non"
      ),
      answerOui: byTestId(
        "infos.contrat salarié - travailleur handicapé - Oui"
      ),
    },
  },
  seniority: {
    moreThanXYears: {
      question: byText(
        "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour) ?"
      ),
      questionAvec5ans: byText(
        "Le salarié a-t-il plus de 5 ans d'ancienneté dans l'entreprise (5 ans + 1 jour) ?"
      ),
      answerNon: byTestId("moreThanXYears - Non"),
      answerOui: byTestId("moreThanXYears - Oui"),
    },
    seniorityInMonths: {
      question: byText(
        "Quelle est l'ancienneté du salarié dans l'entreprise en mois ?"
      ),
      input: byTestId("seniority-months"),
      error: byText(/Vous devez répondre à cette question/),
    },
  },
  result: {
    resultat: byText(/À partir des éléments que vous avez saisis/),
    resultatLegal: byText(/Durée prévue par le code du travail/),
    resultatAgreement: byText(/Durée prévue par la convention collective/),
    data: byText(/Éléments saisis/),
    sources: byTestId("source-", { exact: false }),
    source: (index: number) => byTestId(`source-${index}`),
    print: byText("Imprimer le résultat"),
    noticeMiseRetraite: byTestId("notice-mise-retraite"),
    noticeDepartRetraite: byTestId("notice-depart-retraite"),
    originDepart: byTestId("situation-originDepart"),
    seniority: byTestId("situation-ancienneté"),
    travailleurHandicape: byTestId("situation-Travailleur handicapé"),
    decryptedDescription: byTestId("description-decrypted"),
    noticeWarning: byTestId("notice-warning"),
    noticeWarningDescription: byTestId("notice-warning-description"),
    noticeHandicap1: byTestId("situation-note-handicap-1"),
    noticeHandicap2: byTestId("situation-note-handicap-2"),
    conventionCollective: byTestId("situation-convention collective"),
    categorieProfessionnelle: byTestId("situation-Catégorie professionnelle"),
    echelon: byTestId("situation-Échelon"),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  title: byText("Calculer l'indemnité de licenciement"),
};
