import { SimulateurIndemnitePrecarite } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3127,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3127"
        }
        `
);

describe("SimulateurIndemnitePrecarite", () => {
  beforeEach(() => {
    render(
      <SimulateurIndemnitePrecarite icon={""} title={""} displayTitle={""} />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("contractType = CDD", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByTestId("contractType-cdd"));
      fireEvent.click(ui.next.get());
    });

    describe("criteria.cddType = CDD dit de « mission ponctuelle ou occasionnelle »", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: {
            value: "CDD dit de « mission ponctuelle ou occasionnelle »",
          },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.hasEquivalentCdiRenewal = non", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId("criteria.hasEquivalentCdiRenewal"),
            {
              target: { value: "non" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("typeRemuneration = amount", () => {
          beforeEach(() => {
            fireEvent.click(screen.getByTestId("typeRemuneration-amount"));
            fireEvent.click(ui.next.get());
          });

          describe("currency = 3000", () => {
            beforeEach(() => {
              fireEvent.change(screen.getByTestId("currency"), {
                target: { value: "3000" },
              });
              fireEvent.click(ui.next.get());
            });

            it("should display expected answer", () => {
              expect(screen.queryAllByText(/300/g)[0]).toBeInTheDocument();
              expect(
                screen.queryAllByText(/La prime de mission/g)[0]
              ).toBeInTheDocument();

              expect(
                screen.queryAllByText(
                  /Article 2.5 de la section 1 du Chapitre I de la Partie 2 de la convention collective/
                )[0]
              ).toBeInTheDocument();
            });
          });
        });
      });
    });

    describe("criteria.cddType = Autres", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "Autres" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("finContratPeriodeDessai = Non", () => {
        beforeEach(() => {
          fireEvent.click(screen.getByTestId("finContratPeriodeDessai-non"));
          fireEvent.click(ui.next.get());
        });

        describe("propositionCDIFindeContrat = Non", () => {
          beforeEach(() => {
            fireEvent.click(
              screen.getByTestId("propositionCDIFindeContrat-non")
            );
            fireEvent.click(ui.next.get());
          });

          describe("refusCDIFindeContrat = Non", () => {
            beforeEach(() => {
              fireEvent.click(screen.getByTestId("refusCDIFindeContrat-non"));
              fireEvent.click(ui.next.get());
            });

            describe("interruptionFauteGrave = Non", () => {
              beforeEach(() => {
                fireEvent.click(
                  screen.getByTestId("interruptionFauteGrave-non")
                );
                fireEvent.click(ui.next.get());
              });

              describe("refusRenouvellementAuto = Non", () => {
                beforeEach(() => {
                  fireEvent.click(
                    screen.getByTestId("refusRenouvellementAuto-non")
                  );
                  fireEvent.click(ui.next.get());
                });

                describe("typeRemuneration = amount", () => {
                  beforeEach(() => {
                    fireEvent.click(
                      screen.getByTestId("typeRemuneration-amount")
                    );
                    fireEvent.click(ui.next.get());
                  });

                  describe("currency = 3000", () => {
                    beforeEach(() => {
                      fireEvent.change(screen.getByTestId("currency"), {
                        target: { value: "3000" },
                      });
                      fireEvent.click(ui.next.get());
                    });

                    it("should display expected answer", () => {
                      expect(
                        screen.queryAllByText(/300/g)[0]
                      ).toBeInTheDocument();
                      expect(
                        screen.queryAllByText(/La prime de précarité/g)[0]
                      ).toBeInTheDocument();

                      expect(
                        screen.queryAllByText(
                          /Article L1243-8 du code du travail/
                        )[0]
                      ).toBeInTheDocument();
                      expect(
                        screen.queryAllByText(
                          /Article L1243-9 du code du travail/
                        )[0]
                      ).toBeInTheDocument();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
