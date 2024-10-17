import { SimulateurIndemnitePrecarite } from "../../index";
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

    describe("criteria.cddType = Enquêteurs vacataires", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "Enquêteurs vacataires" },
        });
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
            expect(screen.queryAllByText(/120/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(/L'indemnité de fin de contrat/g)[0]
            ).toBeInTheDocument();

            expect(
              screen.queryAllByText(
                /article 53 de l'annexe relative aux enquêteurs - Accord du 16 décembre 1991/
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.cddType = Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: {
            value:
              "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès",
          },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.hasCdiProposal = non", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.hasCdiProposal"), {
            target: { value: "non" },
          });
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
              expect(screen.queryAllByText(/180/g)[0]).toBeInTheDocument();
              expect(
                screen.queryAllByText(/La prime d'intervention/g)[0]
              ).toBeInTheDocument();

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
