import {
  byLabelText,
  byRole,
  byTestId,
  byText,
} from "testing-library-selector";
import { searchAgreement } from "../../convention-collective";

export const ui = {
  cdtAnswerTitle: byRole("heading", {
    level: 2,
    name: /Réponse d'après le Code du Travail/,
  }),
  branchAnswerTitle: byRole("heading", {
    level: 2,
    name: /Votre réponse pour la convention/,
  }),
  generic: {
    buttonDisplayInfo: byText(/Afficher les informations$/),
    learnMoreLink: byRole("link", { name: /En savoir plus/ }),
    nonTreatedInfo: byText(
      /Cette réponse correspond à ce que prévoit le code du travail/
    ),
    missingRouteError: byText(
      /Veuillez sélectionner l'une des options ci-dessus/
    ),
    noAgreementBanner: byTestId("no-agreement-banner"),
    radioNoAgreement: byLabelText(
      /Je ne souhaite pas renseigner ma convention collective\./
    ),
    agreementRequiredError: byText(
      /Veuillez sélectionner une convention collective/
    ),
    enterpriseRequiredError: byText(
      /Le nom de l'entreprise doit être renseigné/
    ),
    enterpriseSelectionRequiredError: byText(
      /Veuillez sélectionner une entreprise dans la liste/
    ),
    conventionSelectionRequiredError: byText(
      /Veuillez sélectionner une convention collective/
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
