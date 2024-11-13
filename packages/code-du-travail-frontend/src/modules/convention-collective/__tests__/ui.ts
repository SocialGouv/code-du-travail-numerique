import {
  byText,
  byLabelText,
  byTestId,
  byRole,
} from "testing-library-selector";

export const ui = {
  searchByName: {
    input: byLabelText(
      /Nom de la convention collective ou son numéro d’identification IDCC \(4 chiffres\)/
    ),
    inputCloseBtn: byTestId("AgreementSearchAutocomplete-autocomplete-close"),
    autocompleteLines: {
      IDCC16: {
        name: byText(
          /Transports routiers et activités auxiliaires du transport \(IDCC 16\)/
        ),
        link: byRole("link", {
          name: "Transports routiers et activités auxiliaires du transport (IDCC 16)",
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
