import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1672,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1672"
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
          /le temps et dans les conditions décidées par l'employeur, qui lui accordent des facilités d'absence/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Les heures d'absence autorisée sont accordées au salarié qui n'a pas encore retrouvé un emploi. L'employeur en définit les modalités et la rémunération./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 91 b\)/)[0]).toBeInTheDocument();
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
        screen.queryAllByText(/50 heures par mois maximum/g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Ces heures peuvent être groupées en tout ou en partie, avec l'accord de l'employeur. Cette autorisation d'absence prend fin lorsque le salarié a retrouvé un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 91 b\)/)[0]).toBeInTheDocument();
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

      expect(screen.queryAllByText(/Article 74/)[0]).toBeInTheDocument();
    });
  });
});
