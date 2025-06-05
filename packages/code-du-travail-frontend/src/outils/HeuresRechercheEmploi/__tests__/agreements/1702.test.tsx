import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1702,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1702"
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

    describe("criteria.durée du préavis = 1| 2 jours", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "1| 2 jours" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 6| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "6| 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 9| Un mois et plus ", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "9| Un mois et plus " },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "3| Licenciement" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.durée du préavis = 1| 2 jours", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "1| 2 jours" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 6| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "6| 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 9| Un mois et plus ", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "9| Un mois et plus " },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
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
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
    });
  });
});
