import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "../ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1486,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1486"
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
          "infos.contrat salarié - convention collective - bureaux études techniques - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/6 jours ouvrés par mois/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les heures de recherche d'emploi sont prises chaque mois en une ou plusieurs fois, en principe par demi-journée. Elles sont fixées pour moitié par l'employeur et pour moitié par le salarié. Chacun en informe l'autre partie./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.3/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - bureaux études techniques - typeRupture Rupture de la période d'essai - catégorie professionnelle"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "criteria.initiative de la rupture de la période d'essai"
          ),
          {
            target: { value: "'L'employeur'" },
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

        expect(screen.queryAllByText(/Article 3.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "criteria.initiative de la rupture de la période d'essai"
          ),
          {
            target: { value: "'Le salarié'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 heures par jour/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - bureaux études techniques - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/6 jours ouvrés par mois/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les heures de recherche d'emploi sont prises chaque mois en une ou plusieurs fois, en principe par demi-journée. Elles sont fixées pour moitié par l''employeur et pour moitié par le salarié. Chacun en informe l'autre partie./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.3/)[0]).toBeInTheDocument();
    });
  });
});
