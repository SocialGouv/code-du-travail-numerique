import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 292,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "292"
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
          "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Avenant Cadres, article 8/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Collaborateurs", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle"
        ),
        {
          target: { value: "'Collaborateurs'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = 700 à 750", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle Collaborateurs - coefficient"
          ),
          {
            target: { value: "'700 à 750'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle Collaborateurs - coefficient 700 à 750 - ancienneté"
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
            screen.queryAllByText(/Avenant Collaborateurs, article 15/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle Collaborateurs - coefficient 700 à 750 - ancienneté"
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
            screen.queryAllByText(/Avenant Collaborateurs, article 15/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.coefficient = 800 à 830 inclus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - plasturgie - catégorie professionnelle Collaborateurs - coefficient"
          ),
          {
            target: { value: "'800 à 830 inclus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Avenant Collaborateurs, article 15/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
