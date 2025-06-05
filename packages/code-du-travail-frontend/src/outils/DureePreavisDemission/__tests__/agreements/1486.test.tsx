import { DureePreavisDemission } from "../../index";
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

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 78| Chargés d'enquête intermittents", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "78| Chargés d'enquête intermittents" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(
          /Article 21 de l'annexe relative aux enquêteurs/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 19| Employés, Techniciens ou Agents de maîtrise (ETAM)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: {
            value: "19| Employés, Techniciens ou Agents de maîtrise (ETAM)",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = 16| de 240 à 355", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "16| de 240 à 355" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "40| 2 ans ou moins" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.2 de la convention collective/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "43| Plus de 2 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.2 de la convention collective/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.coefficient = 19| De 400 à 500", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "19| De 400 à 500" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "40| 2 ans ou moins" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.2 de la convention collective/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "43| Plus de 2 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.2 de la convention collective/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "60| Ingénieurs, Cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 4.2 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });
});
