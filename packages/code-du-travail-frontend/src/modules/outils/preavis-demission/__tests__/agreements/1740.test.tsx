import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1740,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1740"
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

  describe("criteria.ancienneté = 10| Au delà de la période d'essai et jusqu'à 3 mois", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: {
          value: "10| Au delà de la période d'essai et jusqu'à 3 mois",
        },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/article 1.1.9/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 13| Plus de 3 mois", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "13| Plus de 3 mois" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/article 1.1.9/)[0]).toBeInTheDocument();
    });
  });
});
