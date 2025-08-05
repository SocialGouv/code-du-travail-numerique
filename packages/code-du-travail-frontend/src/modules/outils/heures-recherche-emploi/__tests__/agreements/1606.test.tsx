import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1606,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1606"
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
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - bricolage - typeRupture"), {
        target: { value: "'Démission'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 9.1/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - bricolage - typeRupture"), {
        target: { value: "'Licenciement'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("infos.contrat salarié - convention collective - bricolage - typeRupture"), {
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

      expect(screen.queryAllByText(/Article 6/)[0]).toBeInTheDocument();
    });
  });
});
