import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1404,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1404"
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

  describe("criteria.catégorie professionnelle = 24| Agents de maîtrise (niveau IV et V)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise niveau IV et V'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 52| Cadres (niveau VI et plus)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle"
        ),
        {
          target: { value: "'Cadres niveau VI et plus'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 6.50 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 10| Ouvriers, Employés (niveau III)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés niveau III'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 4| III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle-Ouvriers,-Employés-niveau-III-niveau"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 7| Ouvriers, Employés (niveaux I et II)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés niveaux I et II'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 2| I à II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-sedima-catégorie-professionnelle-Ouvriers,-Employés-niveaux-I-et-II-niveau"
          ),
          {
            target: { value: "'I à II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
