import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byTestId("commencer"),
  },
  contract: {
    originDepart: {
      question: byText("Qui est à l’origine du départ en retraite ?"),
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
      "route - Je ne souhaite pas renseigner ma convention collective (je passe l'étape)"
    ),
    agreement: byTestId(
      "route - Je sais quelle est ma convention collective (je la saisis)"
    ),
    unknownAgreement: byTestId(
      "route - Je ne sais pas quelle est ma convention collective (je la recherche)"
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
      categoryQuestion: byText("Qui est à l’origine du départ en retraite ?"),
      categoryAnswers: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
      ),
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
      answerNon: byTestId("moreThanXYears - Non"),
      answerOui: byTestId("moreThanXYears - Oui"),
    },
    seniorityInMonths: {
      question: byText(
        "Quelle est l'ancienneté du salarié dans l'entreprise en mois ?"
      ),
      input: byTestId("seniorityInMonths"),
      error: byText(/Vous devez répondre à cette question/),
    },
  },
  result: {
    resultat: byText(/À partir des éléments que vous avez saisis/),
    resultatLegal: byText(/Durée prévue par le code du travail/),
    resultatAgreement: byText(/Durée prévue  par la convention collective/),
    data: byText(/Éléments saisis/),
    sources: byTestId("source-", { exact: false }),
    source: (index: number) => byTestId(`source-${index}`),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  title: byText("Calculer l'indemnité de licenciement"),
};
