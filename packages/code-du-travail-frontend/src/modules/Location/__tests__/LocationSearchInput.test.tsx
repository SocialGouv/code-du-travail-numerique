import { getByLabelText, render, RenderResult } from "@testing-library/react";
import { LocationSearchInput } from "../LocationSearchInput";
import { searchCities } from "../searchCities";
import { UserAction } from "../../../common";
import { byLabelText } from "testing-library-selector";
import { screen } from "@testing-library/dom";
import { wait } from "@testing-library/user-event/dist/utils";
import { ui } from "./ui";

jest.mock("../searchCities", () => ({
  searchCities: jest.fn(),
}));

describe("LocationSearchInput", () => {
  let userAction: UserAction;
  beforeEach(() => {
    jest.resetAllMocks();
    render(<LocationSearchInput />);
  });
  it("Vérifier le déroulement de la liste de ville et sa fermeture", async () => {
    (searchCities as jest.Mock).mockImplementation(() =>
      Promise.resolve([
        {
          nom: "Paris",
          codesPostaux: [
            "75001",
            "75002",
            "75003",
            "75004",
            "75005",
            "75006",
            "75007",
            "75008",
            "75009",
            "75010",
            "75011",
            "75012",
            "75013",
            "75014",
            "75015",
            "75016",
            "75017",
            "75018",
            "75019",
            "75020",
            "75116",
          ],
          population: 2133111,
          codeDepartement: "75",
          code: "75056",
          _score: 0.43270345181469244,
        },
      ])
    );
    userAction = new UserAction();
    userAction.setInput(ui.input.get(), "paris");
    await wait();
    expect(ui.AutocompleteItemParis.query()).toBeInTheDocument();
    expect(ui.input.get()).toHaveValue("paris");
    userAction.click(ui.inputCloseBtn.get());
    expect(ui.input.get()).toHaveValue("");
    expect(ui.AutocompleteItemParis.query()).not.toBeInTheDocument();
  });
});
