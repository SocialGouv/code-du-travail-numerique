import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1672,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1672"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 58| Cadres (Classes 5 à 7)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "58| Cadres (Classes 5 à 7)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(
          /Article II. 6 de l'accord relatif aux dispositions particulières " Cadres "/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 36| Non-cadres (Classes 1 à 4)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "36| Non-cadres (Classes 1 à 4)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 91 a\) de la convention collective/)[0]
      ).toBeInTheDocument();
    });
  });
});