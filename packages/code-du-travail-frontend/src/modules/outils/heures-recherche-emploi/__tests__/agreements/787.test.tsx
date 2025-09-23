import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "../ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 787,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "787"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-comptables-typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 47| Au moins 5 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-comptables-typeRupture-Demission-anciennete"
          ),
          {
            target: { value: "'Au moins 5 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /2 heures par journée d'ouverture du cabinet/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 46| Moins de 5 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-comptables-typeRupture-Demission-anciennete"
          ),
          {
            target: { value: "'Moins de 5 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /2 heures par journée d'ouverture du cabinet/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-comptables-typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/2 heures par journée d'ouverture du cabinet/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-comptables-typeRupture"
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

      expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
    });
  });
});
