import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2609,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2609"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "38| Moins de 2 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 8.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "42| 2 ans ou plus" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 8.1/)[0]).toBeInTheDocument();
    });
  });
});
