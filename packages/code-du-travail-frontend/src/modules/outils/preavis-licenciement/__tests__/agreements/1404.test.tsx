import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1404,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1404"
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

  describe("criteria.catégorie professionnelle = Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - sedima - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = VII et plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Cadres - niveau"
          ),
          {
            target: { value: "'VII et plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 6-50/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - sedima - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau I - ancienneté"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau I - ancienneté"
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
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau II - ancienneté"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau II - ancienneté"
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
            screen.queryAllByText(/Article 3-41-0/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.niveau = III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Ouvriers, Employés - niveau"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Techniciens et agents de maîtrise TAM", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - sedima - catégorie professionnelle"
        ),
        {
          target: { value: "'Techniciens et agents de maîtrise TAM'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = IV", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Techniciens et agents de maîtrise TAM - niveau"
          ),
          {
            target: { value: "'IV'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = V", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Techniciens et agents de maîtrise TAM - niveau"
          ),
          {
            target: { value: "'V'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = VI", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - sedima - catégorie professionnelle Techniciens et agents de maîtrise TAM - niveau"
          ),
          {
            target: { value: "'VI'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 3-41-0/)[0]).toBeInTheDocument();
      });
    });
  });
});
