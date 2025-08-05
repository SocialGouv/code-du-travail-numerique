import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1501,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1501"
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
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - restauration rapide - typeRupture"), {
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

      expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - restauration rapide - typeRupture"), {
        target: { value: "'Licenciement'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(/2 heures par jour travaillé/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les heures de recherche d'emploi sont prises par accord entre l'employeur et le salarié. Ils peuvent également décider de bloquer tout ou partie de ces heures avant la fin du préavis./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 12/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - restauration rapide - typeRupture"), {
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

      expect(screen.queryAllByText(/Article 9/)[0]).toBeInTheDocument();
    });
  });
});
