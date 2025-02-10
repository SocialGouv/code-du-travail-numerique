import { render } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import { AgreementSearch } from "../AgreementSearch";
import { ui } from "./ui";
import { wait } from "@testing-library/user-event/dist/utils";
import { sendEvent } from "../../utils";
import { byText } from "testing-library-selector";

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

function mockFetch(data) {
  (fetch as any).mockResolvedValue({
    json: jest.fn().mockResolvedValue({ hits: { hits: data } }),
    ok: true,
  });
}

describe("Trouver sa CC - recherche par nom de CC", () => {
  describe("Test de l'autocomplete", () => {
    let userAction: UserAction;
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("Vérifier l'affichage des erreurs", async () => {
      mockFetch([]);
      render(<AgreementSearch />);
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "cccc");
      await wait(300);
      expect(ui.searchByName.errorNotFound.error.query()).toBeInTheDocument();
      expect(ui.searchByName.errorNotFound.info.query()).toBeInTheDocument();
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(
        ui.searchByName.errorNotFound.error.query()
      ).not.toBeInTheDocument();
      expect(
        ui.searchByName.errorNotFound.info.query()
      ).not.toBeInTheDocument();
    });
    it("Vérifier la navigation", async () => {
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
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "16");
      await wait(300);
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toHaveBeenLastCalledWith({
        action: "Trouver sa convention collective",
        category: "cc_search",
        name: '{"query":"16"}',
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
      expect(sendEvent).toHaveBeenCalledTimes(2);
      expect(sendEvent).toHaveBeenLastCalledWith({
        action: "Trouver sa convention collective",
        category: "cc_select_p1",
        name: "idcc0016",
      });
      userAction.click(ui.searchByName.buttonPrevious.get());
      expect(sendEvent).toHaveBeenCalledTimes(3);
      expect(sendEvent).toHaveBeenLastCalledWith({
        action: "back_step_cc_search_p1",
        category: "view_step_cc_search_p1",
        name: "Trouver sa convention collective",
      });
    });

    it("Vérifier l'affichage des infos si moins 2 caractères", async () => {
      mockFetch([]);
      render(<AgreementSearch />);
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "cc");
      await wait(300);
      expect(ui.searchByName.infoNotFound.query()).toBeInTheDocument();
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(ui.searchByName.infoNotFound.query()).not.toBeInTheDocument();
    });

    it("Vérifier l'affichage du message d'erreur pour les mauvais code Naf", async () => {
      render(<AgreementSearch />);
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "1234A");
      await wait(300);
      expect(
        byText(/Numéro d’indentification \(IDCC\) incorrect./).get().textContent
      ).toEqual(
        "Numéro d’indentification (IDCC) incorrect. Il semblerait que vous ayez saisi un code APE (Activité Principale Exercée) ou NAF (Nomenclature des Activités Françaises) et dont l’objectif est d’identifier l’activité principale de l’entreprise."
      );
    });

    it("Vérifier l'affichage du message d'erreur concernant du format du code", async () => {
      render(<AgreementSearch />);
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "12345366");
      await wait(300);
      expect(
        byText(/Numéro d’indentification \(IDCC\) incorrect./).get().textContent
      ).toEqual(
        "Numéro d’indentification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement."
      );
    });
  });
});
