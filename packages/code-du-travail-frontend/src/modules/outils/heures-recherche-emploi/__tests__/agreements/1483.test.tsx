import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "../ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1483,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1483"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle"
          ),
          {
            target: { value: "'Agents de maîtrise et Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.catégorie professionnelle = 16| Employés", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle"
          ),
          {
            target: { value: "'Employés'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle Employés - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré, proportionnellement au temps de travail contractuel du salarié, dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Démission - catégorie professionnelle Employés - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Agents de maîtrise et Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures par jour ouvré/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance \(s'il est effectué\), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.catégorie professionnelle = 16| Employés", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Employés'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle Employés - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Licenciement - catégorie professionnelle Employés - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Rupture de la période d'essai - catégorie professionnelle"
          ),
          {
            target: { value: "'Agents de maîtrise et Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Rupture de la période d'essai - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures par jour/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 3/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Rupture de la période d'essai - catégorie professionnelle Agents de maîtrise et Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour proportionnellement au temps de travail contractuel du salarié/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance \(s'il est effectué\), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 3/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.catégorie professionnelle = 16| Employés", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - habillement textiles commerce de detail - typeRupture Rupture de la période d'essai - catégorie professionnelle"
          ),
          {
            target: { value: "'Employés'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
      });
    });
  });
});
