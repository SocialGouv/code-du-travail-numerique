import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { AgreementSearch } from "../AgreementSearch";
import { ui } from "./ui";
import { sendEvent } from "@socialgouv/matomo-next";
import { byText } from "testing-library-selector";
import { UserAction } from "src/modules/outils/common/utils/UserAction";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock the search function
const mockSearchAgreement = jest.fn((query: string): Agreement[] => {
  if (query === "16") {
    return [
      {
        url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
        id: "KALICONT000005635624",
        num: 16,
        shortTitle: "Transports routiers et activités auxiliaires du transport",
        slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
        title:
          "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
        contributions: true,
      },
    ];
  }
  return [];
});

// Mock AgreementSearchInput to use the mock version with our mocked search function
jest.mock("../AgreementSearch/AgreementSearchInput", () => ({
  AgreementSearchInput: (props: any) => {
    const { AgreementSearchInput: MockComponent } = jest.requireActual(
      "../AgreementSearch/__mocks__/AgreementSearchInput"
    );
    return (
      <MockComponent {...props} mockSearchAgreement={mockSearchAgreement} />
    );
  },
}));
describe("Trouver sa CC - recherche par nom de CC", () => {
  describe("Test de l'autocomplete", () => {
    let userAction: UserAction;

    beforeEach(() => {
      jest.resetAllMocks();
      userAction = new UserAction();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("Vérifier l'affichage des erreurs", async () => {
      mockSearchAgreement.mockReturnValue([]);
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "cccc");
      await waitFor(() => {
        expect(ui.searchByName.errorNotFound.error.query()).toBeInTheDocument();
        expect(ui.searchByName.errorNotFound.info.query()).toBeInTheDocument();
      });
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(
        ui.searchByName.errorNotFound.error.query()
      ).not.toBeInTheDocument();
      expect(
        ui.searchByName.errorNotFound.info.query()
      ).not.toBeInTheDocument();
    });
    it("Vérifier la navigation", async () => {
      mockSearchAgreement.mockReturnValue([
        {
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          id: "KALICONT000005635624",
          num: 16,
          shortTitle:
            "Transports routiers et activités auxiliaires du transport",
          slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
          title:
            "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          contributions: true,
        },
      ]);

      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "16");
      await waitFor(() => {
        expect(sendEvent).toHaveBeenCalledWith({
          action: "Trouver sa convention collective",
          category: "cc_search",
          name: '{"query":"16"}',
          value: undefined,
        });
      });
      expect(
        ui.searchByName.autocompleteLines.IDCC16.name.query()
      ).toBeInTheDocument();
      expect(
        ui.searchByName.autocompleteLines.IDCC16.link.query()
      ).toHaveAttribute(
        "href",
        "/convention-collective/16-transports-routiers-et-activites-auxiliaires-du-transport"
      );
      userAction.click(ui.searchByName.autocompleteLines.IDCC16.link.get());
    });

    it("Vérifier l'affichage des infos si moins 2 caractères", async () => {
      mockSearchAgreement.mockReturnValue([]);
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "cc");
      await waitFor(() => {
        expect(ui.searchByName.infoNotFound.query()).toBeInTheDocument();
      });
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(ui.searchByName.infoNotFound.query()).not.toBeInTheDocument();
    });

    it("Vérifier l'affichage du message d'erreur pour les mauvais code Naf", async () => {
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "1234A");
      await waitFor(() => {
        expect(
          byText(/Numéro d'identification \(IDCC\) incorrect./).get()
            .textContent
        ).toEqual(
          "Numéro d'identification (IDCC) incorrect. Il semblerait que vous ayez saisi un code APE (Activité Principale Exercée) ou NAF (Nomenclature des Activités Françaises) et dont l'objectif est d'identifier l'activité principale de l'entreprise."
        );
      });
    });

    it("Vérifier l'affichage du message d'erreur concernant du format du code", async () => {
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "12345366");

      expect(
        byText(/Numéro d'identification \(IDCC\) incorrect./).get().textContent
      ).toEqual(
        "Numéro d'identification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement."
      );
    });
  });
});
