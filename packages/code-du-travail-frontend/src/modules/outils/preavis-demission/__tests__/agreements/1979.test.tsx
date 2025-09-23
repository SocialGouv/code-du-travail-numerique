import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1979,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1979"
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

  describe("criteria.catégorie professionnelle = 'Agents de maîtrise'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Moins de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Agents-de-maitrise-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/15 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = '6 mois à 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Agents-de-maitrise-anciennete"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Agents-de-maitrise-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Cadres'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Moins de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Plus de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Employés'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle"
        ),
        {
          target: { value: "'Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Moins de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = '6 mois à 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/15 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hotels-cafes-restaurants-categorie-professionnelle-Employes-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 30 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
