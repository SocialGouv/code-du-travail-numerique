import {
  byText,
  byLabelText,
  byTestId,
  byRole,
} from "testing-library-selector";

export const ui = {
  radio: {
    agreementSearchOption: byLabelText(
      /Je sais quelle est ma convention collective et je la saisis\./
    ),
    enterpriseSearchOption: byLabelText(
      /Je cherche mon entreprise pour trouver ma convention collective\./
    ),
  },
  buttonDisplayInfo: byText("Afficher les informations"),
  warning: {
    title: byText(
      "Nous n’avons pas de réponse pour cette convention collective"
    ),
    nonTreatedAgreement: byText(
      /Vous pouvez consulter les informations générales ci-dessous/
    ),
    noCdtUnextendedAgreement: byText(
      /Les dispositions de cette convention n’ont pas été étendues/
    ),
    noCdtNonTreatedAgreement: byText(
      /Nous vous invitons à consulter votre convention collective qui peut prévoir une réponse/
    ),
  },
  searchAgreementIntro: {
    buttonSearchAgreement: byRole("link", {
      name: "Je connais ma convention collective je la saisis",
    }),
    buttonSearchEnterprise: byRole("link", {
      name: "Je cherche mon entreprise pour trouver ma convention collective",
    }),
  },
  searchByName: {
    input: byLabelText(
      /Nom de la convention collective ou son numéro d’identification IDCC \(4 chiffres\)/
    ),
    inputCloseBtn: byTestId("AgreementSearchAutocomplete-autocomplete-close"),
    buttonPrevious: byRole("link", {
      name: "Précédent",
    }),
    autocompleteLines: {
      IDCC16: {
        name: byText(
          /Transports routiers et activités auxiliaires du transport \(IDCC 16\)/
        ),
        link: byRole("link", {
          name: "Transports routiers et activités auxiliaires du transport (IDCC 16)",
        }),
        button: byRole("button", {
          name: "Transports routiers et activités auxiliaires du transport (IDCC 16)",
        }),
      },
      IDCC1388: {
        name: byText(/Industrie du pétrole \(IDCC 1388\)/),
        link: byRole("link", {
          name: "Industrie du pétrole (IDCC 1388)",
        }),
        button: byRole("button", {
          name: "Industrie du pétrole (IDCC 1388)",
        }),
      },
      IDCC29: {
        name: byText(
          "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP) (IDCC 29)"
        ),
        link: byRole("link", {
          name: "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP) (IDCC 29)",
        }),
        button: byRole("button", {
          name: "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP) (IDCC 29)",
        }),
      },
    },
    errorNotFound: {
      error: byText(/Aucune convention collective n'a été trouvée\./),
      info: byText(/Vous ne trouvez pas votre convention collective \?/),
    },
    infoNotFound: byText(
      /Indiquez au moins 3 caractères afin d'affiner votre recherche/
    ),
  },
  searchByEnterprise: {
    input: byLabelText(/Nom de votre entreprise ou numéro Siren\/Siret/),
    inputLocation: byLabelText("Code postal ou Ville (optionnel)"),
    submitButton: byText("Rechercher"),
    resultLines: {
      carrefour: {
        title: byText("CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)"),
        link: byRole("link", {
          name: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        }),
      },
    },
    noEnterprise: byRole("link", {
      name: "Particuliers employeurs et emploi à domicile",
    }),
    errorNotFound: {
      error: byText(/Aucune entreprise n'a été trouvée\./),
      info: byText(/Vous ne trouvez pas votre entreprise \?/),
    },
  },
  selection: {
    carrefour: {
      title: byText("CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)"),
      activity: byText(
        "Activité : Location-bail de propriété intellectuelle et de produits similaires, à l’exception des œuvres soumises à copyright"
      ),
      address: byText("ZI ROUTE DE PARIS 14120 MONDEVILLE"),
    },
    agreement: {
      IDCC2216: {
        title: byText(
          "Commerce de détail et de gros à prédominance alimentaire"
        ),
        link: byRole("link", {
          name: "Commerce de détail et de gros à prédominance alimentaire",
        }),
      },
    },
  },
};
