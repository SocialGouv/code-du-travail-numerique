import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import { AgreementSearchByEnterprise } from "../AgreementSearchByEnterprise";
import { ui } from "./ui";
import { wait } from "@testing-library/user-event/dist/utils";
import { searchEnterprises } from "../../Enterprise/enterprises.service";

jest.mock("../../Enterprise/enterprises.service", () => ({
  searchEnterprises: jest.fn(),
}));

describe("Trouver sa CC - recherche par nom d'entreprise CC", () => {
  describe("Test de l'autocomplete", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      jest.resetAllMocks();
      rendering = render(<AgreementSearchByEnterprise />);
    });
    it("Vérifier l'affichage de la recherche", async () => {
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
      userAction.setInput(ui.searchByEnterprise.input.get(), "carrefour");
      userAction.click(ui.searchByEnterprise.submitButton.get());
      await wait();
      expect(
        ui.searchByEnterprise.resultLines.carrefour.title.query()
      ).toBeInTheDocument();
      expect(
        ui.searchByEnterprise.resultLines.carrefour.link.query()
      ).toHaveAttribute(
        "href",
        "/outils/convention-collective/selection/345130488"
      );
    });

    it("Vérifier l'affichage de l'erreur si aucun résultat", async () => {
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );
      userAction = new UserAction();
      userAction.setInput(ui.searchByEnterprise.input.get(), "recherche");
      userAction.click(ui.searchByEnterprise.submitButton.get());
      await wait();
      expect(
        ui.searchByEnterprise.errorNotFound.error.query()
      ).toBeInTheDocument();
      expect(
        ui.searchByEnterprise.errorNotFound.info.query()
      ).toBeInTheDocument();
    });
  });
});
