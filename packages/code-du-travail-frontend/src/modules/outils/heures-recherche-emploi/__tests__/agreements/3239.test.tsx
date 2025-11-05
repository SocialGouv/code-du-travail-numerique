import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3239,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3239"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />, {
      legacyRoot: true,
    });
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 1| Assistants maternels du particulier employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle"
          ),
          {
            target: {
              value: "'Assistants maternels du particulier employeur'",
            },
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
      });
    });

    describe("criteria.catégorie professionnelle = 2| Salariés du particulier employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle"
          ),
          {
            target: { value: "'Salariés du particulier employeur'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Moins de 40 heures par semaine", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail"
            ),
            {
              target: { value: "'Moins de 40 heures par semaine'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 1| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail-Moins-de-40-heures-par-semaine-anciennete"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
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
          });
        });

        describe("criteria.ancienneté = 2| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail-Moins-de-40-heures-par-semaine-anciennete"
              ),
              {
                target: { value: "'2 ans ou plus'" },
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
          });
        });
      });

      describe("criteria.durée du travail = 2| 40 heures ou plus par semaine", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail"
            ),
            {
              target: { value: "'40 heures ou plus par semaine'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 1| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail-40-heures-ou-plus-par-semaine-anciennete"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /2 heures par jour pendant 6 jours ouvrables/g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié./g
              )[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 2| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-typeRupture-Licenciement-categorie-professionnelle-Salaries-du-particulier-employeur-duree-du-travail-40-heures-ou-plus-par-semaine-anciennete"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /2 heures par jour pendant 10 jours ouvrables/g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié./g
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });
  });
});
