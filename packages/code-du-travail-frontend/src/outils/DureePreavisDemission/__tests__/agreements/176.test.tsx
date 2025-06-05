import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 176,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "176"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.conclusion contrat travail = 1| Contrat de travail conclu avant le 1er juillet 2009", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.conclusion contrat travail"),
        {
          target: {
            value: "1| Contrat de travail conclu avant le 1er juillet 2009",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 24| 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "24| 1 à 3" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 15| 4", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "15| 4" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 29| 5 et suivants", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "29| 5 et suivants" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.conclusion contrat travail = 2| Contrat de travail conclu après le 1er juillet 2009", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.conclusion contrat travail"),
        {
          target: {
            value: "2| Contrat de travail conclu après le 1er juillet 2009",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 24| 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "24| 1 à 3" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 27| 4 à 5", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "27| 4 à 5" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 31| 6 et suivants ", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "31| 6 et suivants " },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });
  });
});
