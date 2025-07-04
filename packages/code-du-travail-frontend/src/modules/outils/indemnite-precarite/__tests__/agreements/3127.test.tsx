import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
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
      <CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("contractType = CDD", () => {
    beforeEach(() => {
      fireEvent.click(ui.contractType.cdd.get());
      fireEvent.click(ui.next.get());
    });

    describe("criteria.cddType = CDD dit de « mission ponctuelle ou occasionnelle »", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: {
            value: "CDD dit de « mission ponctuelle ou occasionnelle »",
          },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.hasEquivalentCdiRenewal = non", () => {
        beforeEach(() => {
          fireEvent.click(screen.getByTestId("hasEquivalentCdiRenewal - Non"));
          fireEvent.click(ui.next.get());
        });

        describe("typeRemuneration = amount", () => {
          beforeEach(() => {
            fireEvent.click(ui.remuneration.typeRemuneration.total.get());
            fireEvent.click(ui.next.get());
          });

          describe("currency = 3000", () => {
            beforeEach(() => {
              fireEvent.change(ui.remuneration.salaireTotal.get(), {
                target: { value: "3000" },
              });
              fireEvent.click(ui.next.get());
            });

            it("should display expected answer", () => {
              expect(screen.queryAllByText(/300/g)[0]).toBeInTheDocument();

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
        fireEvent.change(ui.cddType.get(), {
          target: { value: "Autres" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("finContratPeriodeDessai = Non", () => {
        beforeEach(() => {
          fireEvent.click(ui.cddQuestions.finContratPeriodeDessai.non.get());
          fireEvent.click(ui.next.get());
        });

        describe("propositionCDIFindeContrat = Non", () => {
          beforeEach(() => {
            fireEvent.click(
              ui.cddQuestions.propositionCDIFindeContrat.non.get()
            );
            fireEvent.click(ui.next.get());
          });

          describe("refusCDIFindeContrat = Non", () => {
            beforeEach(() => {
              fireEvent.click(ui.cddQuestions.refusCDIFindeContrat.non.get());
              fireEvent.click(ui.next.get());
            });

            describe("interruptionFauteGrave = Non", () => {
              beforeEach(() => {
                fireEvent.click(
                  ui.cddQuestions.interruptionFauteGrave.non.get()
                );
                fireEvent.click(ui.next.get());
              });

              describe("refusRenouvellementAuto = Non", () => {
                beforeEach(() => {
                  fireEvent.click(
                    ui.cddQuestions.refusRenouvellementAuto.non.get()
                  );
                  fireEvent.click(ui.next.get());
                });

                describe("typeRemuneration = amount", () => {
                  beforeEach(() => {
                    fireEvent.click(
                      ui.remuneration.typeRemuneration.total.get()
                    );
                    fireEvent.click(ui.next.get());
                  });

                  describe("currency = 3000", () => {
                    beforeEach(() => {
                      fireEvent.change(ui.remuneration.salaireTotal.get(), {
                        target: { value: "3000" },
                      });
                      fireEvent.click(ui.next.get());
                    });

                    it("should display expected answer", () => {
                      expect(
                        screen.queryAllByText(/300/g)[0]
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
