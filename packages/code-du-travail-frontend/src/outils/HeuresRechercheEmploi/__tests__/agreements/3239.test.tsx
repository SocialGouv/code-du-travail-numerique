import { HeuresRechercheEmploi } from "../../index";
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

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "3| Licenciement" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 101| Assistants maternels du particulier employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: {
              value: "101| Assistants maternels du particulier employeur",
            },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
          )[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 100| Salariés du particulier employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "100| Salariés du particulier employeur" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 124| Moins de 40 heures par semaine", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "124| Moins de 40 heures par semaine" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "38| Moins de 2 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
              )[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 43| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "43| 2 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
              )[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.durée du travail = 123| 40 heures ou plus par semaine", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
            target: { value: "123| 40 heures ou plus par semaine" },
          });
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "38| Moins de 2 ans" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /2 heures par jour pendant 6 jours ouvrables/g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié./g
              )[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 44| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
              target: { value: "44| 2 ans ou plus" },
            });
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(
                /2 heures par jour pendant 10 jours ouvrables/g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié./g
              )[0]
            ).toBeInTheDocument();
          });
        });
      });
    });
  });
});
