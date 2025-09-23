import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1351,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1351"
        }
        `
);

describe("CalculateurPreavisLicenciement", () => {
  beforeEach(() => {
    render(
      <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    // Étape 1 : Situation du salarié - Compléter toutes les questions
    fireEvent.click(ui.situation.fauteGraveNon.get());
    fireEvent.click(ui.situation.handicapNon.get());
    fireEvent.change(ui.situation.seniority.get(), {
      target: { value: "'Moins de 6 mois'" },
    });
    fireEvent.click(ui.next.get());

    // Étape 2 : Convention collective (déjà sélectionnée par défaut)
    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = Agents d'exploitation, employés administratifs et techniciens", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle"
        ),
        {
          target: {
            value:
              "'Agents d'exploitation, employés administratifs et techniciens'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 15 jours", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'Moins de 15 jours'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/il n'y a pas de préavis/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 15 jours à 1 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'15 jours à 1 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 jour ouvré/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 1 mois à 2 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 1 mois à 2 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 jours ouvrés/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 mois à 6 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 6 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/7 jours calendaires/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 6 mois à 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 6 mois à 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-II-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-III-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = IV", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau"
          ),
          {
            target: { value: "'IV'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 mois à 6 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-IV-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 6 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/14 jours calendaires/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-IV-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = V", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau"
          ),
          {
            target: { value: "'V'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 mois à 6 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-V-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 6 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/14 jours calendaires/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-d'exploitation,-employes-administratifs-et-techniciens-niveau-V-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe IV/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = Agents de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 15 jours", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'Moins de 15 jours'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/il n'y a pas de préavis/g)[0]
          ).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 15 jours à 2 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'15 jours à 2 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 mois à 3 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 3 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 3 mois à 6 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 3 mois à 6 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 6 mois à 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 6 mois à 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-I-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-II-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-III-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = IV", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau"
          ),
          {
            target: { value: "'IV'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 mois à 3 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-IV-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 3 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 6 mois à 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-IV-anciennete"
            ),
            {
              target: { value: "'Plus de 6 mois à 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-IV-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = V", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau"
          ),
          {
            target: { value: "'V'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Plus de 2 mois à 3 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-V-anciennete"
            ),
            {
              target: { value: "'Plus de 2 mois à 3 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 6 mois à 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-V-anciennete"
            ),
            {
              target: { value: "'Plus de 6 mois à 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Plus de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Agents-de-maitrise-niveau-V-anciennete"
            ),
            {
              target: { value: "'Plus de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Annexe V/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 15 jours", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Moins de 15 jours'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/il n'y a pas de préavis/g)[0]
        ).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 15 jours à 1 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'15 jours à 1 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/7 jours calendaires/g)[0]
        ).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 1 mois à 3 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Plus de 1 mois à 3 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/14 jours calendaires/g)[0]
        ).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 3 mois à 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Plus de 3 mois à 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 6 mois à 1 an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Plus de 6 mois à 1 an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 1 an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-prevention-securite-entreprise-categorie-professionnelle-Cadres-anciennete"
          ),
          {
            target: { value: "'Plus de 1 an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Annexe VI/)[0]).toBeInTheDocument();
      });
    });
  });
});
