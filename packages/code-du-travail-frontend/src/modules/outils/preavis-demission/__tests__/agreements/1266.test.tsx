import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1266,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1266"
        }
        `
);

describe("PreavisDemissionSimulator", () => {
  beforeEach(() => {
    render(
      <PreavisDemissionSimulator
        relatedItems={[]}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 48| Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 16| Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle"
        ),
        {
          target: { value: "'Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 15| Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 35| 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 26| Maîtrises", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle"
        ),
        {
          target: { value: "'Maîtrises'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 15| Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Maitrises-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 35| 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Maitrises-anciennete"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-restauration-collectivites-categorie-professionnelle-Maitrises-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 13/)[0]).toBeInTheDocument();
      });
    });
  });
});
