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
    // Un CDD générique reste régi par le Code du travail, même sous une CC
    // qui prévoit des dispositions pour d'autres types de CDD.
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

  it("affiche l'indemnité conventionnelle — cas conventionnel : CDD d'usage pour les enquêteurs vacataires", () => {
    runJourney({ contractOptionId: "1486-usage-enqueteurs-vacataires" });

    expect(ui.result.amount.get()).toHaveTextContent("120,00");
    const warning = screen.getByTestId("warning-body-cc-1486-enqueteurs");
    expect(warning).toHaveTextContent(
      "Le Code du travail ne prévoit pas d'indemnité de précarité dans votre situation."
    );
    expect(warning).toHaveTextContent(
      "une indemnité de précarité égale à 4 % de la rémunération totale brute versée pendant le contrat"
    );
    expect(warning).toHaveTextContent(
      "c'est le taux le plus favorable au salarié qui s'appliquera"
    );
    // Le contrat d'usage n'a pas de plancher légal à rappeler : ni ordre
    // d'application, ni note de clôture générique.
    expect(warning).not.toHaveTextContent("Le taux applicable est");
    expect(warning).not.toHaveTextContent("À noter");
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
    const warning = screen.getByTestId("warning-body-cc-avec-dispositions");
    expect(warning).toHaveTextContent(
      "La réponse donnée se base sur les dispositions de votre convention de branche."
    );
    expect(warning).toHaveTextContent(
      "le contrat de travail peut prévoir un taux plus favorable pour le salarié"
    );
    expectReference(
      "Chapitre III de l'accord du 5 juillet 2001 relatif au statut des salariés du secteur d'activité d'organisation des foires, salons et congrès"
    );
    expectReference("Article L1243-4 du code du travail");
    expectReference("Article L1243-8 du code du travail");
    expectReference("Article L1243-9 du code du travail");
    expectReference("Article L1243-10 du code du travail");
  });
});
