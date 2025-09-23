import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
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

describe("PreavisDemissionSimulator", () => {
  beforeEach(() => {
    render(
      <PreavisDemissionSimulator
        relatedItems={[]}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 'Salariés du particulier employeur'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
        ),
        {
          target: { value: "'Salariés du particulier employeur'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Moins de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Salariés du particulier employeur - ancienneté"
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
          screen.queryAllByText(/Article 162-6 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = '6 mois à 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Salariés du particulier employeur - ancienneté"
          ),
          {
            target: { value: "'6 mois à 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 162-6 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = '2 ans ou plus'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Salariés du particulier employeur - ancienneté"
          ),
          {
            target: { value: "'2 ans ou plus'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 162-6 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Assistants maternels du particulier employeur'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
        ),
        {
          target: {
            value: "'Assistants maternels du particulier employeur'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Enfant accueilli depuis moins de 3 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Assistants maternels du particulier employeur - ancienneté"
          ),
          {
            target: { value: "'Enfant accueilli depuis moins de 3 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/il n'y a pas de préavis/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Art. L. 423-26 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Enfant accueilli de 3 mois à moins d'un an'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Assistants maternels du particulier employeur - ancienneté"
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
            /Art. L. 423-26 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Enfant accueilli depuis 1 an et plus'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle Assistants maternels du particulier employeur - ancienneté"
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
            /Art. L. 423-26 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
