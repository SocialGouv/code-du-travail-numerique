import { fireEvent, render, RenderResult } from "@testing-library/react";
import { EnterpriseAgreementSearchInput } from "../EnterpriseAgreementSearchInput";
import { searchEnterprises } from "../../queries";
import { ui } from "./ui";
import { sendEvent } from "../../../utils";
import { wait } from "@testing-library/user-event/dist/utils";
import { TrackingAgreementSearchAction } from "../../../convention-collective/tracking";

jest.mock("../../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("../../queries", () => ({
  searchEnterprises: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("EnterpriseAgreementSearchInput", () => {
  let rendering: RenderResult;
  const enterprise = {
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
    conventions: [],
  };

  describe("Form mode", () => {
    beforeEach(async () => {
      rendering = render(
        <EnterpriseAgreementSearchInput
          onAgreementSelect={() => {}}
          trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        />
      );
    });
    it("should navigate correctly with one treated agreement on enterprise", async () => {
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            ...enterprise,
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
              {
                id: "1747",
                contributions: false,
                num: 1747,
                shortTitle:
                  "Activités industrielles de boulangerie et pâtisserie",
                title:
                  "Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993. Mise à jour par avenant n°10 du 11 octobre 2011.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635691",
                slug: "1747-activites-industrielles-de-boulangerie-et-patisserie",
              },
            ],
          },
        ])
      );
      fireEvent.change(ui.enterpriseAgreementSearch.input.get(), {
        target: { value: "carrefour" },
      });
      fireEvent.click(ui.enterpriseAgreementSearch.submitButton.get());
      await wait();
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toHaveBeenCalledWith({
        action: "Trouver sa convention collective",
        category: "enterprise_search",
        name: '{"query":"carrefour"}',
        value: "",
      });
      fireEvent.click(
        ui.enterpriseAgreementSearch.resultLines.carrefour.title.get()
      );
      fireEvent.click(
        rendering.getByText(
          "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
        )
      );
      expect(
        rendering.queryByText(
          "Nous n'avons pas de réponse pour cette convention collective"
        )
      ).not.toBeInTheDocument();
      fireEvent.click(
        rendering.getByText(
          "Activités industrielles de boulangerie et pâtisserie IDCC 1747"
        )
      );
      expect(
        rendering.queryByText(
          "Nous n'avons pas de réponse pour cette convention collective"
        )
      ).toBeInTheDocument();
    });

    it("should display correct message if there is no agreements on enterprise", async () => {
      (searchEnterprises as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            ...enterprise,
            conventions: [],
          },
        ])
      );
      fireEvent.change(ui.enterpriseAgreementSearch.input.get(), {
        target: { value: "carrefour" },
      });
      fireEvent.click(ui.enterpriseAgreementSearch.submitButton.get());
      await wait();
      fireEvent.click(
        ui.enterpriseAgreementSearch.resultLines.carrefour.title.get()
      );
      expect(
        rendering.getByText(
          "Aucune convention collective n'a été déclarée pour l'entreprise"
        )
      ).toBeInTheDocument();
    });
  });
});
