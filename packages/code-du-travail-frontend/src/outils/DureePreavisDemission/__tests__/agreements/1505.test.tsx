import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1505,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1505"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 25| Agents de maîtrise (AM1 et AM2)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "25| Agents de maîtrise (AM1 et AM2)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 20 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 51| Cadres (C1 et C2)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "51| Cadres (C1 et C2)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 20 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 11| Employés (E1 à E7)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "11| Employés (E1 à E7)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 20 de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });
});
