import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1996,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1996"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission ou licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - pharmacie - typeRupture"
        ),
        {
          target: { value: "'Démission ou licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 1| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - pharmacie - typeRupture Démission ou licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps partiel", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - pharmacie - typeRupture Démission ou licenciement - catégorie professionnelle Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps partiel'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 heures par jour, dans la limite d'un tiers du temps de travail pour un salarié à temps partiel/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.durée du travail = 2| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - pharmacie - typeRupture Démission ou licenciement - catégorie professionnelle Cadres - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
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
              /Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.catégorie professionnelle = 2| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - pharmacie - typeRupture Démission ou licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Non-cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.durée du travail = 1| Temps complet", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - pharmacie - typeRupture Démission ou licenciement - catégorie professionnelle Noncadres - durée du travail"
            ),
            {
              target: { value: "'Temps complet'" },
            }
          );
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
              /Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande/g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
        });
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - pharmacie - typeRupture"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
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

      expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
    });
  });
});
