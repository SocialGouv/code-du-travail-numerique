import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 16,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "16"
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
        expect(screen.queryAllByText(/Aucun préavis/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe II, article 13/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 30| 1 mois à moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "30| 1 mois à moins de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe II, article 13/)[0]
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
          screen.queryAllByText(/Annexe II, article 13/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 61| Ingénieurs et Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "61| Ingénieurs et Cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Annexe IV, Article 15/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "4| Ouvriers" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 15| Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "15| Moins de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
        ).toBeInTheDocument();
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

        expect(
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
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
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
        ).toBeInTheDocument();
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

    describe("criteria.groupe = 25| 1 à 5 ", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "25| 1 à 5 " },
        });
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
            screen.queryAllByText(/Aucun préavis/g)[0]
          ).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Annexe III, article 17/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 30| 1 mois à moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "30| 1 mois à moins de 2 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Annexe III, article 17/)[0]
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
            screen.queryAllByText(/Annexe III, article 17/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 30| 6 à 8", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "30| 6 à 8" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe III, article 17/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
