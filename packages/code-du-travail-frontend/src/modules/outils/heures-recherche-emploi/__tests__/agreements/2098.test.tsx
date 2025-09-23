import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2098,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2098"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 1| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture-Rupture-de-la-periode-d'essai-categorie-professionnelle"
          ),
          {
            target: { value: "'Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture-Rupture-de-la-periode-d'essai-categorie-professionnelle-Cadres-initiative-de-la-rupture-de-la-periode-d'essai"
            ),
            {
              target: { value: "'L'employeur'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures maximum par jour/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.2/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture-Rupture-de-la-periode-d'essai-categorie-professionnelle-Cadres-initiative-de-la-rupture-de-la-periode-d'essai"
            ),
            {
              target: { value: "'Le salarié'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(/2 heures maximum par jour/g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 2.2/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.catégorie professionnelle = 2| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture-Rupture-de-la-periode-d'essai-categorie-professionnelle"
          ),
          {
            target: { value: "'Non-cadres'" },
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

        expect(screen.queryAllByText(/Article 13.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/2 heures maximum par jour/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/2 heures maximum par jour/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur. Les heures non utilisées ne sont pas rémunérées./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
    });
  });
});
