import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2941,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2941"
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

  describe("criteria.catégorie professionnelle = Employé", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - bad - catégorie professionnelle"
        ),
        {
          target: { value: "'Employé'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Employé - ancienneté"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 semaine de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Employé - ancienneté"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Employé - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Technicien-agent de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - bad - catégorie professionnelle"
        ),
        {
          target: { value: "'Technicien-agent de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Technicienagent de maîtrise - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Technicienagent de maîtrise - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Cadre", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - bad - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadre'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Cadre - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - bad - catégorie professionnelle Cadre - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/4 mois de date à date/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
