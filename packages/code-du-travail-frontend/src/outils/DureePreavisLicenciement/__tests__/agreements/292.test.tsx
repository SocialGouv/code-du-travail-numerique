import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 292,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "292"
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
        screen.queryAllByText(/Avenant Cadres, Article 8/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 42| Collaborateurs", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "42| Collaborateurs" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = 24| 700 à 750", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "24| 700 à 750" },
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

          expect(
            screen.queryAllByText(/Avenant Collaborateurs, Article 15/)[0]
          ).toBeInTheDocument();
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

          expect(
            screen.queryAllByText(/Avenant Collaborateurs, Article 15/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.coefficient = 28| 800 à 830 inclus", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "28| 800 à 830 inclus" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Avenant Collaborateurs, Article 15/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
