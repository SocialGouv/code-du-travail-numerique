import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { EnterpriseAgreementSelectionLink } from "../EnterpriseAgreementSelectionLink";
import { ui } from "./ui";
import { sendEvent } from "../../../utils";
import { UserAction } from "src/common";

jest.mock("../../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => {}),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
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
  address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
  firstMatchingEtablissement: {
    siret: "34513048800017",
    address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
  },
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

describe("Trouver sa CC - recherche par nom d'entreprise CC", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  it("Vérifier l'affichage de la selection", async () => {
    rendering = render(
      <EnterpriseAgreementSelectionLink enterprise={defaultEnterprise} />
    );
    userAction = new UserAction();
    expect(
      ui.enterpriseAgreementSelection.carrefour.title.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.carrefour.activity.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.carrefour.address.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.title.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.description.known.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).toHaveAttribute(
      "href",
      "/convention-collective/2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire"
    );
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).not.toHaveAttribute("target", "_blank");
    userAction.click(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.get()
    );
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "Trouver sa convention collective",
      category: "cc_select_p2",
      name: "idcc2216",
    });
  });

  it("Vérifier l'affichage de la selection avec une CC sans slug", async () => {
    rendering = render(
      <EnterpriseAgreementSelectionLink
        enterprise={{
          ...defaultEnterprise,
          conventions: [
            {
              ...defaultEnterprise.conventions[0],
              slug: "",
            },
          ],
        }}
      />
    );
    expect(
      ui.enterpriseAgreementSelection.description.unknown.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).not.toBeInTheDocument();
  });

  it("Vérifier l'affichage de la selection avec une CC sans url et contribution", async () => {
    rendering = render(
      <EnterpriseAgreementSelectionLink
        enterprise={{
          ...defaultEnterprise,
          conventions: [
            {
              ...defaultEnterprise.conventions[0],
              url: undefined,
              contributions: false,
            },
          ],
        }}
      />
    );
    expect(
      ui.enterpriseAgreementSelection.description.notFound.query()
    ).toBeInTheDocument();
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).not.toBeInTheDocument();
  });

  it("Vérifier l'affichage de la selection en widgetMode", async () => {
    rendering = render(
      <EnterpriseAgreementSelectionLink
        enterprise={defaultEnterprise}
        widgetMode
      />
    );
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).toHaveAttribute(
      "href",
      "/convention-collective/2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire"
    );
    expect(
      ui.enterpriseAgreementSelection.agreement.IDCC2216.link.query()
    ).toHaveAttribute("target", "_blank");
  });
});
