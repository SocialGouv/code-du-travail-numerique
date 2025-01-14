import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1090,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1090"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "1| Démission" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "47| Agents de maîtrise et Cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salarié peut s'absenter pendant 50 heures par mois, en une ou plusieurs fois en accord avec l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "6| Ouvriers, Employés" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "1| Temps complet" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.durée du préavis = 6| 2 semaines", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
              target: { value: "6| 2 semaines" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/24 heures/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
              )[0]
            ).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 2.12/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.durée du préavis = 7| Plus de 2 semaines", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
              target: { value: "7| Plus de 2 semaines" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(/50 heures par mois/g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
              )[0]
            ).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 2.12/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "2| Temps partiel" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /l'équivalent de 30% de l'horaire hebdomadaire inscrit au contrat de travail/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "3| Licenciement" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "47| Agents de maîtrise et Cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salarié peut s'absenter pendant 50 heures par mois, en une ou plusieurs fois en accord avec l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "6| Ouvriers, Employés" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "1| Temps complet" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.durée du préavis = 6| 2 semaines", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
              target: { value: "6| 2 semaines" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/24 heures/g)[0]).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire est maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
              )[0]
            ).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 2.12/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.durée du préavis = 7| Plus de 2 semaines", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
              target: { value: "7| Plus de 2 semaines" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(/50 heures par mois/g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire est maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
              )[0]
            ).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Article 2.12/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.durée du travail = 2| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "2| Temps partiel" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /l'équivalent de 30% de l'horaire hebdomadaire inscrit au contrat de travail/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.12/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "7| Rupture de la période d'essai" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.10/)[0]).toBeInTheDocument();
    });
  });
});
