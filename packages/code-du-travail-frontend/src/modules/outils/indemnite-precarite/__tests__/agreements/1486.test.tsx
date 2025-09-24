import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1486,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1486"
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

    describe("criteria.cddType = Enquêteurs vacataires", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: { value: "Enquêteurs vacataires" },
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
            expect(screen.queryAllByText(/120/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(
                /Article 53 de l'annexe relative aux enquêteurs - Accord du 16 décembre 1991/
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.cddType = Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: {
            value:
              "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès",
          },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.hasCdiProposal = non", () => {
        beforeEach(() => {
          fireEvent.click(screen.getByTestId("hasCdiProposal-Non"));
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
                screen.queryAllByText(
                  /Chapitre III : Contrat d'intervention à durée déterminée de l'accord du 5 juillet 2001 relatif au statut des salariés du secteur d'activité d'organisation des foires, salons et congrès/
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
