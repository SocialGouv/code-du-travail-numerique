import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3248,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3248"
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

  describe("criteria.âge = 1| Moins de 50 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.âge"), {
        target: { value: "1| Moins de 50 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = 1| A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 2| E", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 3| F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "47| Entre 3 ans et moins de 5 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "48| 5 ans ou plus" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.âge = 2| 50 ans à 55 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.âge"), {
        target: { value: "2| 50 ans à 55 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = 1| A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 2| E", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 3| F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "47| Entre 3 ans et moins de 5 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "48| 5 ans ou plus" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.âge = 4| 55 ans et plus", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.âge"), {
        target: { value: "4| 55 ans et plus" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = 1| A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 2| E", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.anciennement cadre = 2| Oui", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
            target: { value: "2| Oui" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "47| Entre 3 ans et moins de 5 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "48| 5 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 75.2.1/)[0]
            ).toBeInTheDocument();
            expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.position = 3| F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "47| Entre 3 ans et moins de 5 ans" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "48| 5 ans ou plus" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });
});
