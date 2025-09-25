import { CalculateurPreavisLicenciement } from "../../index";
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

  describe("criteria.catégorie professionnelle = Salariés du particulier employeur", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle"
        ),
        {
          target: { value: "'Salariés du particulier employeur'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Salaries-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'Moins de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Salaries-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Salaries-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = Assistants maternels du particulier employeur", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle"
        ),
        {
          target: {
            value: "'Assistants maternels du particulier employeur'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Enfant accueilli depuis moins de 3 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Assistants-maternels-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'Enfant accueilli depuis moins de 3 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/8 jours calendaires/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Enfant accueilli de 3 mois à moins d'un an", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Assistants-maternels-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'Enfant accueilli de 3 mois à moins d'un an'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/15 jours calendaires/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Enfant accueilli depuis 1 an et plus", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-categorie-professionnelle-Assistants-maternels-du-particulier-employeur-anciennete"
          ),
          {
            target: { value: "'Enfant accueilli depuis 1 an et plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            /Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié./
          )
        ).toBeInTheDocument();
      });
    });
  });
});
