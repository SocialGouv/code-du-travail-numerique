import { CalculateurPreavisLicenciement } from "../../index";
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

describe("CalculateurPreavisLicenciement", () => {
  beforeEach(() => {
    render(
      <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(screen.getByTestId("seriousMisconduct-false"));
    fireEvent.click(ui.next.get());

    fireEvent.click(screen.getByTestId("disabledWorker-false"));
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
      target: { value: "15| Moins de 6 mois" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.âge = 3| Moins de 55 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.âge"), {
        target: { value: "3| Moins de 55 ans" },
      });
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

  describe("criteria.âge = 5| Plus de 55 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.âge"), {
        target: { value: "5| Plus de 55 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 50| Au moins 15 ans d'ancienneté", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "50| Au moins 15 ans d'ancienneté" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 8.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 49| Moins de 15 ans d'ancienneté", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "49| Moins de 15 ans d'ancienneté" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 8.1/)[0]).toBeInTheDocument();
      });
    });
  });
});
