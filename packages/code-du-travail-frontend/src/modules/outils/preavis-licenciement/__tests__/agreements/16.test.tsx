import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 16,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "16"
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

  describe("criteria.catégorie professionnelle = Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
        ),
        {
          target: { value: "'Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 1 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Employés - ancienneté"
          ),
          {
            target: { value: "'Moins de 1 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/il n'y a pas de préavis/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe II, article 13/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 1 mois à moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Employés - ancienneté"
          ),
          {
            target: { value: "'1 mois à moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe II, article 13/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Employés - ancienneté"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe II, article 13/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Ingénieurs et Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
        ),
        {
          target: { value: "'Ingénieurs et Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Annexe IV, article 15/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = Ouvriers", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Ouvriers - ancienneté"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Ouvriers - ancienneté"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Ouvriers - ancienneté"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Techniciens et agents de maîtrise TAM", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
        ),
        {
          target: { value: "'Techniciens et agents de maîtrise TAM'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1 à 5", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Techniciens et agents de maîtrise TAM - groupe"
          ),
          {
            target: { value: "'1 à 5'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 1 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Techniciens et agents de maîtrise TAM - groupe 1 à 5 - ancienneté"
            ),
            {
              target: { value: "'Moins de 1 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/il n'y a pas de préavis/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Annexe III, article 17/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 1 mois à moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Techniciens et agents de maîtrise TAM - groupe 1 à 5 - ancienneté"
            ),
            {
              target: { value: "'1 mois à moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Annexe III, article 17/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Techniciens et agents de maîtrise TAM - groupe 1 à 5 - ancienneté"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Annexe III, article 17/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 6 à 8", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle Techniciens et agents de maîtrise TAM - groupe"
          ),
          {
            target: { value: "'6 à 8'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Annexe III, article 17/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
