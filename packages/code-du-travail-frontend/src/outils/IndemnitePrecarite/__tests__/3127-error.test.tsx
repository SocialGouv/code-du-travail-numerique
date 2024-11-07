import { SimulateurIndemnitePrecarite } from "../index";
import { ui } from "./ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3127,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3127"
        }
        `
);

describe("SimulateurIndemnitePrecarite", () => {
  it("should send error when selecting cddType = CDD dit de « mission ponctuelle ou occasionnelle » and hasEquivalentCdiRenewal = oui", () => {
    render(
      <SimulateurIndemnitePrecarite icon={""} title={""} displayTitle={""} />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
    fireEvent.click(screen.getByTestId("contractType-cdd"));
    fireEvent.change(screen.getByTestId("criteria.cddType"), {
      target: {
        value: "CDD dit de « mission ponctuelle ou occasionnelle »",
      },
    });
    fireEvent.change(screen.getByTestId("criteria.hasEquivalentCdiRenewal"), {
      target: { value: "oui" },
    });
    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText(
        /Selon votre convention collective, lorsque le contrat de mission ponctuelle est transformé en CDI pour un poste et une durée équivalents, le salarié n’a pas le droit à une prime d'intervention/g
      )
    ).toBeInTheDocument();
  });
});
