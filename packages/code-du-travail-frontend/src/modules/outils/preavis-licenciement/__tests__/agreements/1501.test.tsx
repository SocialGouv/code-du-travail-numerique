import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1501,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1501"
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

  describe("criteria.catégorie professionnelle = Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Maîtrises", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle"
        ),
        {
          target: { value: "'Maîtrises'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 2 ans ou moins", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle Maîtrises - ancienneté"
          ),
          {
            target: { value: "'2 ans ou moins'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle Maîtrises - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle Ouvriers, Employés - ancienneté"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle Ouvriers, Employés - ancienneté"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - restauration rapide - catégorie professionnelle Ouvriers, Employés - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
      });
    });
  });
});
