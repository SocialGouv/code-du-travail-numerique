import { act, render, screen } from "@testing-library/react";
import React from "react";
import { EnterpriseAgreementSelectionLink } from "../EnterpriseAgreementSelectionLink";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => {}),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

const defaultEnterprise = {
  activitePrincipale:
    "Location-bail de propriété intellectuelle et de produits similaires, à l’exception des œuvres soumises à copyright",
  etablissements: 1294,
  highlightLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  simpleLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  matching: 1294,
  siren: "345130488",
  siret: "34513048800013",
  address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
  firstMatchingEtablissement: {
    siret: "34513048800017",
    address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
  },
  matchingEtablissementCount: 5,
  conventions: [
    {
      id: "2216",
      contributions: true,
      num: 2216,
      shortTitle: "Commerce de détail et de gros à prédominance alimentaire",
      title:
        "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
      slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
    },
  ],
};

describe("EnterpriseAgreementSelectionLink - dégradation accords", () => {
  beforeAll(() => {
    // jsdom n'implémente pas scrollIntoView (utilisé par le focus du titre)
    Element.prototype.scrollIntoView = jest.fn();
  });

  it("affiche quand même les conventions collectives de l'entreprise quand l'API accords renvoie une erreur (500 PISTE)", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ message: "Internal Server Error" }),
    }) as unknown as typeof fetch;

    await act(async () => {
      render(
        <EnterpriseAgreementSelectionLink
          enterprise={defaultEnterprise}
          level={2}
        />
      );
    });

    // La convention collective de l'entreprise reste affichée (lien IDCC)
    expect(screen.getByRole("link", { name: /IDCC 2216/ })).toBeInTheDocument();

    // ... et la section accords affiche une alerte d'erreur, sans planter le rendu
    expect(
      await screen.findByText(
        "Erreur lors du chargement des accords d'entreprise"
      )
    ).toBeInTheDocument();

    // Le titre n'affiche pas "undefined" accord (compteur retombé à 0)
    expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
  });
});
