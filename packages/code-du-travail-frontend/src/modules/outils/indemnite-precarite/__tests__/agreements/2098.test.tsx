import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { runJourney, ui } from "../ui";
import { render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2098,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2098"
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

describe("SimulateurIndemnitePrecarite - IDCC 2098", () => {
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

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'usage / CDD d'intervention pour le secteur évènementiel", () => {
    runJourney({ contractOptionId: "2098-usage-intervention-evenementiel" });

    expect(ui.result.amount.get()).toHaveTextContent("300,00");
    expectReference(
      "Article 4.1 de l'accord du 20 septembre 2002 relatif aux dispositions spécifiques à l'accueil événementiel"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'optimisation linéaire", () => {
    runJourney({ contractOptionId: "2098-optimisation-lineaire" });

    expect(ui.result.amount.get()).toHaveTextContent("300,00");
    expectReference(
      "Article 9 de l'accord du 10 mai 2010 relatif à l'activité d'optimisation de linéaires"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'animation commerciale", () => {
    runJourney({ contractOptionId: "2098-animation-commerciale" });

    expect(ui.result.amount.get()).toHaveTextContent("300,00");
    expectReference(
      "Article 9 de l'avenant du 13 février 2006 relatif à l'animation commerciale"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });
});
