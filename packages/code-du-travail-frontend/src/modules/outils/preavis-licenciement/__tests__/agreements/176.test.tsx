import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 176,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "176"
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

  describe("criteria.conclusion contrat travail = Contrat de travail conclu avant le 1er juillet 2009", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail"
        ),
        {
          target: {
            value: "'Contrat de travail conclu avant le 1er juillet 2009'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'1 à 3'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 4", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'4'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 5 et suivants", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'5 et suivants'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.conclusion contrat travail = Contrat de travail conclu après le 1er juillet 2009", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail"
        ),
        {
          target: {
            value: "'Contrat de travail conclu après le 1er juillet 2009'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-apres-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'1 à 3'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 4 à 6", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-apres-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'4 à 6'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 6 et suivants", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-apres-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'6 et suivants'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });
  });
});
