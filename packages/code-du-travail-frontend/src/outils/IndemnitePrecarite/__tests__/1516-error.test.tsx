import { SimulateurIndemnitePrecarite } from "../index";
import { ui } from "./ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1516,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1516"
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
        value: "CDD d'usage",
      },
    });
    fireEvent.change(screen.getByTestId("criteria.hasCdiRenewal"), {
      target: { value: "oui" },
    });
    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText(
        /Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n’a pas le droit à une indemnité dite "d'usage"/g
      )
    ).toBeInTheDocument();
  });
});
