import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { runJourney, ui } from "../ui";
import { render, screen } from "@testing-library/react";

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

const expectReference = (reference: string) => {
  expect(
    screen.queryAllByText(new RegExp(escapeRegExp(reference)))[0]
  ).toBeInTheDocument();
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("SimulateurIndemnitePrecarite - IDCC 1516", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />
    );
  });

  it("affiche l'indemnité légale pour un CDD de remplacement", () => {
    runJourney();

    expect(ui.result.amount.get()).toHaveTextContent("300,00");
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'usage pour les formateurs", () => {
    runJourney({ contractOptionId: "1516-usage-formateurs" });

    expect(ui.result.amount.get()).toHaveTextContent("180,00");
    expectReference("Article 5.4.3 de la convention collective");
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });
});
