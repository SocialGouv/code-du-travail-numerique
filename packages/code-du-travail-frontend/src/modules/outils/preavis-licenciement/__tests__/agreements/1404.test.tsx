import { CalculateurPreavisLicenciement } from "../../index";
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

    describe("criteria.niveau = 10| VII et plus", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "10| VII et plus" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 6-50/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "6| Ouvriers, Employés" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 1| I", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "1| I" },
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
            screen.queryAllByText(/Article 3-41-0/)[0]
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
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = 3| II", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "3| II" },
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
            screen.queryAllByText(/Article 3-41-0/)[0]
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
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = 4| III", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 27| Techniciens et agents de maîtrise (TAM)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "27| Techniciens et agents de maîtrise (TAM)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 5| IV", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "5| IV" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = 7| V", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "7| V" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = 8| VI", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "8| VI" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });
  });
});
