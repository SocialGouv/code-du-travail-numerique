import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1090,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1090"
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

  describe("criteria.catégorie professionnelle = Agents de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.échelon = De 17 à 19", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Agents de maîtrise - échelon"
          ),
          {
            target: { value: "'De 17 à 19'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.échelon = De 20 à 25", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Agents de maîtrise - échelon"
          ),
          {
            target: { value: "'De 20 à 25'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.échelon = 1 et 2", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon"
          ),
          {
            target: { value: "'1 et 2'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 6 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon 1 et 2 - ancienneté"
            ),
            {
              target: { value: "'Moins de 6 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 6 mois à 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon 1 et 2 - ancienneté"
            ),
            {
              target: { value: "'6 mois à 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon 1 et 2 - ancienneté"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.échelon = De 3 à 12", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon"
          ),
          {
            target: { value: "'De 3 à 12'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon De 3 à 12 - ancienneté"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - automobiles - catégorie professionnelle Ouvriers, Employés - échelon De 3 à 12 - ancienneté"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });
    });
  });
});
