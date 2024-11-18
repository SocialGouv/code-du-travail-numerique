import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import { AgreementSearch } from "../AgreementSearch";
import { ui } from "./ui";
import { wait } from "@testing-library/user-event/dist/utils";
import { act } from "react-dom/test-utils";
import { searchAgreement } from "../search";

jest.mock("../search", () => ({
  searchAgreement: jest.fn(),
}));

describe("Trouver sa CC - recherche par nom de CC", () => {
  describe("Test de l'autocomplete", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      jest.resetAllMocks();
      rendering = render(<AgreementSearch />);
    });
    it("Vérifier le déroulement de la liste & effacement", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
        ])
      );
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "16");
      await wait();
      expect(
        ui.searchByName.autocompleteLines.IDCC16.name.query()
      ).toBeInTheDocument();
      expect(
        ui.searchByName.autocompleteLines.IDCC16.link.query()
      ).toHaveAttribute(
        "href",
        "/convention-collective/16-transports-routiers-et-activites-auxiliaires-du-transport"
      );
      expect(ui.searchByName.input.get()).toHaveValue("16");
      userAction.click(ui.searchByName.inputCloseBtn.get());
      expect(ui.searchByName.input.get()).toHaveValue("");
    });
    it("Vérifier l'affichage des erreurs", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );
      userAction = new UserAction();
      userAction.setInput(ui.searchByName.input.get(), "cccc");
      await wait();
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
    it("Vérifier l'affichage des infos si moins 2 caractères", () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );
      act(async () => {
        userAction = new UserAction();
        userAction.setInput(ui.searchByName.input.get(), "cc");
        await wait();
        expect(ui.searchByName.infoNotFound.query()).toBeInTheDocument();
        userAction.click(ui.searchByName.inputCloseBtn.get());
        expect(ui.searchByName.infoNotFound.query()).not.toBeInTheDocument();
      });
    });
  });
});
