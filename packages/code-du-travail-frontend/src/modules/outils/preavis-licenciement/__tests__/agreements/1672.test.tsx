import { DureePreavisLicenciement } from "../../index";
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

    describe("criteria.classe = 5| 5", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "5| 5" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Accord relative aux dispositions particulières " Cadres ", article II. 6/
          )[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.classe = 6| 6", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "6| 6" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Accord relative aux dispositions particulières " Cadres ", article II. 6/
          )[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.classe = 7| 7", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "7| 7" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Accord relative aux dispositions particulières " Cadres ", article II. 6/
          )[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "38| Non-cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.classe = 1| 1", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "1| 1" },
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.classe = 2| 2", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "2| 2" },
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.classe = 3| 3", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "3| 3" },
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.classe = 4| 4", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.classe"), {
          target: { value: "4| 4" },
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 91a/)[0]).toBeInTheDocument();
        });
      });
    });
  });
});
