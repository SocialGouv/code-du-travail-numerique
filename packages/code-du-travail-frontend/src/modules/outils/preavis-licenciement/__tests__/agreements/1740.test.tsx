import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1740,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1740"
        }
        `
);

describe("CalculateurPreavisLicenciement", () => {
  beforeEach(() => {
    render(
      <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    // Étape 1 : Situation du salarié - Compléter toutes les questions
    fireEvent.click(ui.situation.fauteGraveNon.get());
    fireEvent.click(ui.situation.handicapNon.get());
    fireEvent.change(ui.situation.seniority.get(), {
      target: { value: "'Moins de 6 mois'" },
    });
    fireEvent.click(ui.next.get());

    // Étape 2 : Convention collective (déjà sélectionnée par défaut)
    fireEvent.click(ui.next.get());
  });

  describe("criteria.ancienneté = Au delà de la période d'essai et jusqu'à 3 mois", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-anciennete"
        ),
        {
          target: {
            value: "'Au delà de la période d'essai et jusqu'à 3 mois'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 1.1.9/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = De 3 à 6 mois", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-anciennete"
        ),
        {
          target: { value: "'De 3 à 6 mois'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 1.1.9/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 6 mois à 2 ans", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-anciennete"
        ),
        {
          target: { value: "'6 mois à 2 ans'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 1.1.9/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = Plus de 2 ans", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-anciennete"
        ),
        {
          target: { value: "'Plus de 2 ans'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 1.1.9/)[0]).toBeInTheDocument();
    });
  });
});
