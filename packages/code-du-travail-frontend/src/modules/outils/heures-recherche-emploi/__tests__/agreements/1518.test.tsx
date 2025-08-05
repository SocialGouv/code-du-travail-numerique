import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1518,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1518"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - éducation loisirs - typeRupture"), {
        target: { value: "'Licenciement'" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.durée du travail = 1| Temps complet", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 24| Moins de 1 an", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "24| Moins de 1 an" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures par jour/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.4 étendu/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 27| Plus de 1 an", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "27| Plus de 1 an" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures par jour/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.4 étendu/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.durée du travail = 2| Temps partiel", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 24| Moins de 1 an", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "24| Moins de 1 an" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /25 % de la durée quotidienne de travail par jour/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.4 étendu/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 27| Plus de 1 an", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "27| Plus de 1 an" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /25 % de la durée quotidienne de travail par jour/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Article 4.4 étendu/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - éducation loisirs - typeRupture"), {
        target: { value: "'Démission'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 4.4 étendu/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - éducation loisirs - typeRupture"), {
        target: { value: "'Rupture de la période d'essai'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 4.4 étendu/)[0]
      ).toBeInTheDocument();
    });
  });
});
