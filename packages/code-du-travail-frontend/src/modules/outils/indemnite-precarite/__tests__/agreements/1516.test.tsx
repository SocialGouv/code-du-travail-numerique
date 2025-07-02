import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1516,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1516"
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

    describe("criteria.cddType = CDD d'usage", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: { value: "CDD d'usage" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.hasCdiRenewal = non", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.hasCdiRenewal"), {
            target: { value: "non" },
          });
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
              expect(screen.queryAllByText(/180/g)[0]).toBeInTheDocument();
              expect(
                screen.queryAllByText(/L'indemnité dite "d'usage"/g)[0]
              ).toBeInTheDocument();

              expect(
                screen.queryAllByText(
                  /Article 5 de la convention collective/
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

  it("should send error when selecting cddType = Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès and hasEquivalentCdiRenewal = oui", () => {
    render(
      <SimulateurIndemnitePrecarite icon={""} title={""} displayTitle={""} />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.change(ui.cddType.get(), {
      target: {
        value: "CDD d'usage",
      },
    });
    fireEvent.change(screen.getByTestId("criteria.hasCdiRenewal"), {
      target: { value: "oui" },
    });
    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText(
        /Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n’a pas le droit à une indemnité dite "d'usage"/g
      )
    ).toBeInTheDocument();
  });
});
