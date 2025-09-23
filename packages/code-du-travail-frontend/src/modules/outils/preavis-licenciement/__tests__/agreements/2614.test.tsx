import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2614,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2614"
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

  describe("criteria.âge = Moins de 55 ans", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-travaux-publics-age"
        ),
        {
          target: { value: "'Moins de 55 ans'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-travaux-publics-age-Moins-de-55-ans-anciennete"
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
          screen.queryAllByText(/Article 8.1 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-travaux-publics-age-Moins-de-55-ans-anciennete"
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
          screen.queryAllByText(/Article 8.1 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.âge = 55 ans et plus", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-travaux-publics-age"
        ),
        {
          target: { value: "'55 ans et plus'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Au moins 15 ans d'ancienneté", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-travaux-publics-age-55-ans-et-plus-anciennete"
          ),
          {
            target: { value: "'Au moins 15 ans d'ancienneté'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 8.1 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Moins de 15 ans d'ancienneté", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-travaux-publics-age-55-ans-et-plus-anciennete"
          ),
          {
            target: { value: "'Moins de 15 ans d'ancienneté'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 8.1 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
