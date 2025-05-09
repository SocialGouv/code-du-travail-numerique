import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1702,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1702"
        }
        `
);

describe("DureePreavisLicenciement", () => {
  beforeEach(() => {
    render(<DureePreavisLicenciement icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(screen.getByTestId("seriousMisconduct-non"));
    fireEvent.click(ui.next.get());

    fireEvent.click(screen.getByTestId("disabledWorker-non"));
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
      target: { value: "15| Moins de 6 mois" },
    });
    fireEvent.click(ui.next.get());

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

      expect(screen.queryAllByText(/Article 10.1.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 19| De 3 à 6 mois", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "19| De 3 à 6 mois" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 10.1.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 35| 6 mois à 2 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "35| 6 mois à 2 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 10.1.1/)[0]).toBeInTheDocument();
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

      expect(screen.queryAllByText(/Article 10.1.1/)[0]).toBeInTheDocument();
    });
  });
});
