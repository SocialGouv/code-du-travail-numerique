import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1527,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1527"
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
          "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 1 an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Agents-de-maitrise-anciennete"
          ),
          {
            target: { value: "'Moins de 1 an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Au moins 1 an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Agents-de-maitrise-anciennete"
          ),
          {
            target: { value: "'Au moins 1 an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Négociateur non VRP", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle"
        ),
        {
          target: { value: "'Négociateur non VRP'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Negociateur-non-VRP-anciennete"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Negociateur-non-VRP-anciennete"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Négociateur VRP", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle"
        ),
        {
          target: { value: "'Négociateur VRP'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 1 an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Negociateur-VRP-anciennete"
          ),
          {
            target: { value: "'Moins de 1 an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Negociateur-VRP-anciennete"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Ouvriers,-Employes-anciennete"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-immobilier-categorie-professionnelle-Ouvriers,-Employes-anciennete"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 32/)[0]).toBeInTheDocument();
      });
    });
  });
});
