import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { runJourney, ui } from "../ui";
import { render, screen } from "@testing-library/react";

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

const expectReference = (reference: string) => {
  expect(
    screen.queryAllByText(new RegExp(escapeRegExp(reference)))[0]
  ).toBeInTheDocument();
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("SimulateurIndemnitePrecarite - IDCC 1486", () => {
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

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'usage pour les enquêteurs vacataires", () => {
    runJourney({ contractOptionId: "1486-usage-enqueteurs-vacataires" });

    expect(ui.result.amount.get()).toHaveTextContent("120,00");
    expectReference(
      "Article 53 de l'accord du 16 décembre 1991 relatif aux enquêteurs"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'usage / CDD d'intervention pour le secteur évènementiel", () => {
    runJourney({ contractOptionId: "1486-usage-intervention-evenementiel" });

    expect(ui.result.amount.get()).toHaveTextContent("180,00");
    expectReference(
      "Chapitre III de l'accord du 5 juillet 2001 relatif au statut des salariés du secteur d'activité d'organisation des foires, salons et congrès"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });
});
