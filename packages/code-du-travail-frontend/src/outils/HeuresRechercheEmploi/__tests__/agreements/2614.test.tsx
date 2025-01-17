import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2614,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2614"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "1| Démission" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 8.3/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "3| Licenciement" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /5 journées ou 10 demi-journées par mois de préavis/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Le salarié peut s'absenter pendant le préavis pour rechercher un emploi, s'il le demande. Les heures de recherche d'emploi peuvent être prises en une ou plusieurs fois. Les autorisations d'absence seront fixées pour moitié par le salarié, pour moitié par l'employeur. Chacun en informe l'autre partie. Si le salarié n'utilise pas toutes ses heures d'absence autorisée, l'employeur ne devra pas lui verser d'indemnité./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 8.3/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "7| Rupture de la période d'essai" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /5 journées ou 10 demi-journées par mois de préavis/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Le salarié peut s'absenter pendant le préavis pour rechercher un emploi, s'il le demande. Les heures de recherche d'emploi peuvent être prises en une ou plusieurs fois. Les autorisations d'absence seront fixées pour moitié par le salarié, pour moitié par l'employeur. Chacun en informe l'autre partie. Si le salarié n'utilise pas toutes ses heures d'absence autorisée, l'employeur ne devra pas lui verser d'indemnité./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 2.3/)[0]).toBeInTheDocument();
    });
  });
});
