import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../../common";
import React from "react";
import { EnterpriseAgreementSearch } from "../EnterpriseAgreementSearch";
import { ui } from "./ui";
import { wait } from "@testing-library/user-event/dist/utils";
import { searchEnterprises } from "../../queries";
import { sendEvent } from "../../../utils";

jest.mock("../../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("../../queries", () => ({
  searchEnterprises: jest.fn(),
}));

describe("Trouver sa CC - recherche par nom d'entreprise CC", () => {
  describe("Test de l'autocomplete", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("Vérifier l'affichage de la recherche", async () => {
      rendering = render(<EnterpriseAgreementSearch />);
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
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
              siret: "34513048802674",
              address: "N°6639 205 RUE SAINT-HONORE 75001 PARIS",
            },
            conventions: [
              {
                id: "2216",
                contributions: true,
                num: 2216,
                shortTitle:
                  "Commerce de détail et de gros à prédominance alimentaire",
                title:
                  "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
                slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
              },
            ],
          },
        ])
      );
      userAction = new UserAction();
      userAction.setInput(
        ui.enterpriseAgreementSearch.input.get(),
        "carrefour"
      );
      userAction.click(ui.enterpriseAgreementSearch.submitButton.get());
      await wait();
      expect(sendEvent).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(sendEvent.mock.calls).toEqual([
        [
          {
            action: "Trouver sa convention collective",
            category: "enterprise_search",
            name: '{"query":"carrefour"}',
          },
        ],
      ]);
      expect(
        ui.enterpriseAgreementSearch.resultLines.carrefour.title.query()
      ).toBeInTheDocument();
      expect(
        ui.enterpriseAgreementSearch.resultLines.carrefour.link.query()
      ).toHaveAttribute(
        "href",
        "/outils/convention-collective/entreprise/345130488?q=carrefour"
      );
      expect(
        ui.enterpriseAgreementSearch.childminder.title.query()
      ).toBeInTheDocument();
      expect(
        ui.enterpriseAgreementSearch.childminder.link.query()
      ).toHaveAttribute(
        "href",
        "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile"
      );
      expect(
        ui.enterpriseAgreementSearch.childminder.link.query()
      ).not.toHaveAttribute("target", "_blank");
    });

    it("Vérifier l'affichage de l'erreur si aucun résultat", async () => {
      rendering = render(<EnterpriseAgreementSearch />);
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );
      userAction = new UserAction();
      userAction.setInput(
        ui.enterpriseAgreementSearch.input.get(),
        "recherche"
      );
      userAction.click(ui.enterpriseAgreementSearch.submitButton.get());
      await wait();
      expect(
        ui.enterpriseAgreementSearch.errorNotFound.error.query()
      ).toBeInTheDocument();
      expect(
        ui.enterpriseAgreementSearch.errorNotFound.info.query()
      ).toBeInTheDocument();
    });

    it("Vérifier l'affichage de la recherche en mode widget", async () => {
      rendering = render(<EnterpriseAgreementSearch widgetMode />);
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
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
              siret: "34513048802674",
              address: "N°6639 205 RUE SAINT-HONORE 75001 PARIS",
            },
            conventions: [
              {
                id: "2216",
                contributions: true,
                num: 2216,
                shortTitle:
                  "Commerce de détail et de gros à prédominance alimentaire",
                title:
                  "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
                slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
              },
            ],
          },
        ])
      );
      userAction = new UserAction();
      userAction.setInput(
        ui.enterpriseAgreementSearch.input.get(),
        "carrefour"
      );
      userAction.click(ui.enterpriseAgreementSearch.submitButton.get());
      await wait();
      expect(
        ui.enterpriseAgreementSearch.resultLines.carrefour.title.query()
      ).toBeInTheDocument();
      expect(
        ui.enterpriseAgreementSearch.resultLines.carrefour.link.query()
      ).toHaveAttribute(
        "href",
        "/widgets/convention-collective/entreprise/345130488?q=carrefour"
      );
      expect(
        ui.enterpriseAgreementSearch.childminder.title.query()
      ).toBeInTheDocument();
      expect(
        ui.enterpriseAgreementSearch.childminder.link.query()
      ).toHaveAttribute(
        "href",
        "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile"
      );
      expect(
        ui.enterpriseAgreementSearch.childminder.link.query()
      ).toHaveAttribute("target", "_blank");
    });
  });
});
