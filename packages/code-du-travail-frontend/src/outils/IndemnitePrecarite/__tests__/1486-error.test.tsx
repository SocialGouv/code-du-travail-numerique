import { SimulateurIndemnitePrecarite } from "../index";
import { ui } from "./ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1486,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1486"
        }
        `
);

describe("SimulateurIndemnitePrecarite", () => {
  it("should send error when selecting cddType = Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès and hasEquivalentCdiRenewal = oui", () => {
    render(
      <SimulateurIndemnitePrecarite icon={""} title={""} displayTitle={""} />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
    fireEvent.click(screen.getByTestId("contractType-cdd"));
    fireEvent.change(screen.getByTestId("criteria.cddType"), {
      target: {
        value:
          "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès",
      },
    });
    fireEvent.change(screen.getByTestId("criteria.hasCdiProposal"), {
      target: { value: "oui" },
    });
    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText(
        /Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité/g
      )
    ).toBeInTheDocument();
  });
});
