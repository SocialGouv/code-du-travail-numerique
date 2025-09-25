import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { AgreementSearch } from "../AgreementSearch";
import { ui } from "./ui";
import { sendEvent } from "../../utils";
import { byText } from "testing-library-selector";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

global.fetch = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

function mockFetch(data: any[]) {
  (fetch as any).mockResolvedValue({
    json: jest.fn().mockResolvedValue({ hits: { hits: data } }),
    ok: true,
  });
}

describe("AgreementSearch - Find CC by name", () => {
  describe("Autocomplete functionality", () => {
    let userAction: UserAction;

    beforeEach(() => {
      jest.resetAllMocks();
      userAction = new UserAction();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should display and clear error messages correctly", async () => {
      mockFetch([]);
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
    it("should handle navigation and analytics events correctly", async () => {
      mockFetch([
        {
          _source: {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
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

      expect(sendEvent).toHaveBeenCalledWith({
        action: "Trouver sa convention collective",
        category: "cc_select_p1",
        name: "idcc16",
        value: undefined,
      });

      userAction.click(ui.searchByName.buttonPrevious.get());
      expect(sendEvent).toHaveBeenLastCalledWith({
        action: "back_step_cc_search_p1",
        category: "view_step_cc_search_p1",
        name: "Trouver sa convention collective",
      });
    });

    it("should show info message when input has less than 2 characters", async () => {
      mockFetch([]);
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "cc");
      await waitFor(() => {
        expect(ui.searchByName.infoNotFound.query()).toBeInTheDocument();
      });
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(ui.searchByName.infoNotFound.query()).not.toBeInTheDocument();
    });

    it("should display error message for invalid NAF codes", async () => {
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "1234A");
      await waitFor(() => {
        expect(
          byText(/Numéro d’identification \(IDCC\) incorrect./).get()
            .textContent
        ).toEqual(
          "Numéro d’identification (IDCC) incorrect. Il semblerait que vous ayez saisi un code APE (Activité Principale Exercée) ou NAF (Nomenclature des Activités Françaises) et dont l’objectif est d’identifier l’activité principale de l’entreprise."
        );
      });
    });

    it("should display error message for invalid IDCC format", async () => {
      render(<AgreementSearch />);
      userAction.setInput(ui.searchByName.input.get(), "12345366");

      await waitFor(() => {
        expect(
          byText(/Numéro d’identification \(IDCC\) incorrect./).get()
            .textContent
        ).toEqual(
          "Numéro d’identification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement."
        );
      });
    });
  });
});
