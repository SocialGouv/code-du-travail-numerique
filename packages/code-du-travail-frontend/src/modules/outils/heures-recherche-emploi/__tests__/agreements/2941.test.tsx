import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2941,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2941"
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
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - aide accompagnement soins services domicile - typeRupture"), {
        target: { value: "'Démission'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /2 heures par jour travaillé ou 1 journée par semaine de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail et est égale au minimum à 1 heure par semaine/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 27/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - aide accompagnement soins services domicile - typeRupture"), {
        target: { value: "'Licenciement'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /2 heures par jour travaillé ou 1 journée par semaine de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail et est égale au minimum à 1 heure par semaine/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Le salaire est maintenu, sauf en cas de licenciement pour faute grave ou faute lourde./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 26.1/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - aide accompagnement soins services domicile - typeRupture"), {
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

      expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
    });
  });
});
