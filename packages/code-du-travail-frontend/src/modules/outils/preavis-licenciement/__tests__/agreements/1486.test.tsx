import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

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

  describe("criteria.catégorie professionnelle = Chargés d'enquête intermittents", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle"
        ),
        {
          target: { value: "'Chargés d'enquête intermittents'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Chargés-d'enquête-intermittents-ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe relative aux enquêteurs/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Chargés-d'enquête-intermittents-ancienneté"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe relative aux enquêteurs/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Employés, Techniciens ou Agents de maîtrise ETAM", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle"
        ),
        {
          target: {
            value: "'Employés, Techniciens ou Agents de maîtrise ETAM'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = de 240 à 355", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Employés,-Techniciens-ou-Agents-de-maîtrise-ETAM-coefficient"
          ),
          {
            target: { value: "'de 240 à 355'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Employés,-Techniciens-ou-Agents-de-maîtrise-ETAM-coefficient-de-240-à-355-ancienneté"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 4.2/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Employés,-Techniciens-ou-Agents-de-maîtrise-ETAM-coefficient-de-240-à-355-ancienneté"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 4.2/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.coefficient = De 400 à 500", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle-Employés,-Techniciens-ou-Agents-de-maîtrise-ETAM-coefficient"
          ),
          {
            target: { value: "'De 400 à 500'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 4.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Ingénieurs, Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-bureaux-études-techniques-catégorie-professionnelle"
        ),
        {
          target: { value: "'Ingénieurs, Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 4.2/)[0]).toBeInTheDocument();
    });
  });
});
