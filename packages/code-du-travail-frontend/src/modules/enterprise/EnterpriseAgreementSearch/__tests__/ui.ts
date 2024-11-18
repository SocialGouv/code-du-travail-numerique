import {
  byText,
  byLabelText,
  byTestId,
  byRole,
} from "testing-library-selector";

export const ui = {
  enterpriseAgreementSearch: {
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
  enterpriseAgreementSelection: {
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
