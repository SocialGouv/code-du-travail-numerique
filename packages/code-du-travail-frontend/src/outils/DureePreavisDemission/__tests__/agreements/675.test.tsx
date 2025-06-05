import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 675,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "675"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "23| Agents de maîtrise" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(
          /Article 9 de l'avenant Maîtrise Convention collective nationale du 30 juin 1972/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 48| Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "48| Cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(
          /Article 13 de l'avenant Cadres Convention collective nationale du 30 juin 1972/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 16| Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "16| Employés" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 3| Moins de 1 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "3| Moins de 1 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/il n’y a pas de préavis à effectuer/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 38 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 16| 1 mois à 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "16| 1 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/15 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 38 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 22| Plus de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "22| Plus de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 38 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
