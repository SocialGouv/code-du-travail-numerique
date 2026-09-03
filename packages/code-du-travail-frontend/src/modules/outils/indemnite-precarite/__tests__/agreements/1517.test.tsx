import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { runJourney, ui } from "../ui";
import { render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1517,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1517"
        }
        `
);

const expectReference = (reference: string) => {
  expect(
    screen.queryAllByText(new RegExp(escapeRegExp(reference)))[0]
  ).toBeInTheDocument();
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("SimulateurIndemnitePrecarite - IDCC 1517", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />
    );
  });

  it("affiche l'indemnité légale pour un CDD de remplacement", () => {
    runJourney();

    expect(ui.result.amount.get()).toHaveTextContent("300,00");
    expect(
      screen.getByTestId("warning-body-cc-sans-dispositions")
    ).toHaveTextContent(
      "Votre convention de branche ne contient pas de dispositions relatives à l'indemnité de précarité."
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });
});
