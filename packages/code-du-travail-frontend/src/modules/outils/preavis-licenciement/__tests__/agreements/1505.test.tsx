import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1505,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1505"
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

  describe("criteria.catégorie professionnelle = Agents de maîtrise AM1 et AM2", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-fruits-et-legumes-categorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise AM1 et AM2'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Cadres C1 et C2", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-fruits-et-legumes-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres C1 et C2'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Employés E1 à E7", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-fruits-et-legumes-categorie-professionnelle"
        ),
        {
          target: { value: "'Employés E1 à E7'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 2 ans ou moins", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-commerces-de-detail-fruits-et-legumes-categorie-professionnelle-Employes-E1-a-E7-anciennete"
          ),
          {
            target: { value: "'2 ans ou moins'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-commerces-de-detail-fruits-et-legumes-categorie-professionnelle-Employes-E1-a-E7-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
      });
    });
  });
});
