import {
  byLabelText,
  byRole,
  byTestId,
  byText,
} from "testing-library-selector";

export const ui = {
  enterpriseAgreementSearch: {
    input: byLabelText(/Nom de votre entreprise ou numéro Siren\/Siret/),
    inputLocation: byLabelText("Code postal ou Ville (optionnel)"),
    submitButton: byText("Rechercher"),
    buttonPrevious: byText("Précédent"),
    childminder: {
      title: byText("Particuliers employeurs et emploi à domicile"),
      link: byRole("link", {
        name: "Particuliers employeurs et emploi à domicile",
      }),
    },
    resultTitle: byTestId("result-title"),
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
    description: {
      notFound: byText(
        "Nous n’avons pas d’informations concernant cette convention collective"
      ),
      unknown: byText(
        "Cette convention collective déclarée par l’entreprise n’est pas reconnue par notre site"
      ),
      known: byText(
        "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective"
      ),
    },
    agreement: {
      IDCC2216: {
        title: byText(
          "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
        ),
        link: byRole("link", {
          name: "Commerce de détail et de gros à prédominance alimentaire IDCC 2216",
        }),
      },
    },
  },
};
