import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2596,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2596"
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

  describe("criteria.catégorie professionnelle = 'Agents de maîtrise'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 'Cadres'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 'Salariés occupant un emploi de l'esthétique-cosmétique'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle"
        ),
        {
          target: {
            value: "'Salariés occupant un emploi de l'esthétique-cosmétique'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = '6 mois ou moins'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - coiffure - catégorie professionnelle Salariés occupant un emploi de l'esthétiquecosmétique - ancienneté"
          ),
          {
            target: { value: "'6 mois ou moins'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - coiffure - catégorie professionnelle Salariés occupant un emploi de l'esthétiquecosmétique - ancienneté"
          ),
          {
            target: { value: "'Plus de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Salariés occupant un emploi nontechnique de la coiffure'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle"
        ),
        {
          target: {
            value: "'Salariés occupant un emploi non-technique de la coiffure'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = '6 mois ou moins'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle-Salariés-occupant-un-emploi-nontechnique-de-la-coiffure-ancienneté"
          ),
          {
            target: { value: "'6 mois ou moins'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle-Salariés-occupant-un-emploi-nontechnique-de-la-coiffure-ancienneté"
          ),
          {
            target: { value: "'Plus de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Salariés occupant un emploi technique de la coiffure'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle"
        ),
        {
          target: {
            value: "'Salariés occupant un emploi technique de la coiffure'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = '6 mois ou moins'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle-Salariés-occupant-un-emploi-technique-de-la-coiffure-ancienneté"
          ),
          {
            target: { value: "'6 mois ou moins'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 6 mois'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-coiffure-catégorie-professionnelle-Salariés-occupant-un-emploi-technique-de-la-coiffure-ancienneté"
          ),
          {
            target: { value: "'Plus de 6 mois'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 7.4.1/)[0]).toBeInTheDocument();
      });
    });
  });
});
