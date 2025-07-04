import { CalculateurIndemnitePrecarite } from "../../IndemnitePrecariteSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2098,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2098"
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

    describe("criteria.cddType = CDD d'optimisation linéaire", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: { value: "CDD d'optimisation linéaire" },
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
            expect(screen.queryAllByText(/300/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Article 9 de l'accord du 10 mai 2010 relatif à l'activité d'optimisation de linéaires/
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.cddType = CDD d'animation commerciale", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: { value: "CDD d'animation commerciale" },
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
            expect(screen.queryAllByText(/300/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Article 9 de l'accord du 13 février 2006 Activités de l'animation commerciale/
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.cddType = Contrat d'intervention dans le secteur de l'accueil événementiel", () => {
      beforeEach(() => {
        fireEvent.change(ui.cddType.get(), {
          target: {
            value:
              "Contrat d'intervention dans le secteur de l'accueil événementiel",
          },
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
            expect(screen.queryAllByText(/300/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Article 4.1 de l'accord du 20 septembre 2002 \(1\) relatif aux dispositions spécifiques à l'accueil événementiel/
              )[0]
            ).toBeInTheDocument();
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
