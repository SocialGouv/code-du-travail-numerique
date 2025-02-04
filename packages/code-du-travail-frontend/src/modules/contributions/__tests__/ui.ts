import { byText } from "testing-library-selector";
import { searchAgreement } from "../../convention-collective";

export const ui = {
  generic: {
    buttonDisplayInfo: byText(/Afficher les informations$/),
    linkDisplayInfo: byText(
      "Afficher les informations sans sélectionner une convention collective"
    ),
    title: byText("Que dit le code du travail ?"),
    nonTreatedInfo: byText(
      /Cette réponse correspond à ce que prévoit le code du travail/
    ),
  },
};
export const mockAgreementSearch = (idcc) =>
  (searchAgreement as jest.Mock).mockImplementation(() =>
    Promise.resolve([
      {
        ...idcc,
        url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635267",
        effectif: 31273,
        cdtnId: "8c50f32b7d",
        title:
          "Convention collective nationale deo l'industrie du pétrole du 3 septembre 1985.  Etendue par arrêté du 31 juillet 1986 JORF 9 août 1986.",
        contributions: false,
      },
    ])
  );
