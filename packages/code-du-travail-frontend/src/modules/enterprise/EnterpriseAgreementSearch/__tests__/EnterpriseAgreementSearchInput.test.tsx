import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { EnterpriseAgreementSearchInput } from "../EnterpriseAgreementSearchInput";
import { searchEnterprises } from "../../queries";
import { ui } from "./ui";
import { sendEvent } from "../../../utils";
import { TrackingAgreementSearchAction } from "../../../convention-collective/tracking";

// Mock des dépendances
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

// Mock de LocationSearchInput pour simuler la saisie de la localisation
jest.mock("../LocationSearchInput", () => ({
  LocationSearchInput: ({ onLocationChange, defaultValue }) => (
    <input
      data-testid="location-search-input"
      value={defaultValue?.city || ""}
      onChange={(e) =>
        onLocationChange({ city: e.target.value, codesPostaux: ["75001"] })
      }
    />
  ),
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

  describe("Form mode (with onAgreementSelect)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      rendering = render(
        <EnterpriseAgreementSearchInput
          onAgreementSelect={() => {}}
          trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
          level={2}
        />,
        { legacyRoot: true }
      );
    });

    // Vos tests existants ici (je les omets pour brevité, mais conservez-les)

    it("should handle search with non-Latin1 characters in location", async () => {
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
                  "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
                slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
              },
            ],
          },
        ])
      );
      fireEvent.change(ui.enterpriseAgreementSearch.input.get(), {
        target: { value: "carrefour" },
      });
      fireEvent.change(rendering.getByTestId("location-search-input"), {
        target: { value: "Château-Thierry😊" }, // Ajout d'un emoji pour forcer non-Latin1
      });
      fireEvent.click(ui.enterpriseAgreementSearch.submitButton.get());
      await waitFor(() => {
        expect(searchEnterprises).toHaveBeenCalledWith({
          query: "carrefour",
          codesPostaux: ["75001"],
        });
        expect(sendEvent).toHaveBeenCalledWith({
          action: "Trouver sa convention collective",
          category: "enterprise_search",
          name: expect.stringContaining('{"query":"carrefour"'),
          value: "",
        });
        expect(
          ui.enterpriseAgreementSearch.resultLines.carrefour.title.get()
        ).toBeInTheDocument();
      });
      fireEvent.click(
        ui.enterpriseAgreementSearch.resultLines.carrefour.title.get()
      );
      expect(
        rendering.getByText(
          "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Navigation mode (without onAgreementSelect)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      rendering = render(
        <EnterpriseAgreementSearchInput
          trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
          level={2}
        />,
        { legacyRoot: true }
      );
    });

    it("should render enterprise cards with correct href including encoded queries (non-Latin1 characters)", async () => {
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
                  "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
                slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
              },
            ],
          },
        ])
      );
      fireEvent.change(ui.enterpriseAgreementSearch.input.get(), {
        target: { value: "carrefour" },
      });
      fireEvent.change(rendering.getByTestId("location-search-input"), {
        target: { value: "Château-Thierry😊" }, // Emoji pour tester non-Latin1
      });
      fireEvent.click(ui.enterpriseAgreementSearch.submitButton.get());
      await waitFor(() => {
        expect(searchEnterprises).toHaveBeenCalledWith({
          query: "carrefour",
          codesPostaux: ["75001"],
        });
        expect(sendEvent).toHaveBeenCalledWith({
          action: "Trouver sa convention collective",
          category: "enterprise_search",
          name: expect.stringContaining('{"query":"carrefour"'),
          value: "",
        });
        const enterpriseCard =
          ui.enterpriseAgreementSearch.resultLines.carrefour.title.get();
        expect(enterpriseCard).toBeInTheDocument();
        // Vérifie que le href contient la query encodée (avec modification, il inclut base64 valide)
        const href = enterpriseCard.closest("a")?.getAttribute("href");
        expect(href).toContain("?q=carrefour&cp=");
        // Verify the base64 encoded location can be decoded properly
        const cpMatch = href?.match(/cp=([^&]+)/);
        if (cpMatch) {
          const decoded = JSON.parse(
            decodeURIComponent(escape(atob(cpMatch[1])))
          );
          expect(decoded.city).toBe("Château-Thierry😊");
        }
      });
    });
  });
});
