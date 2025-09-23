import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
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

describe("PreavisDemissionSimulator", () => {
  beforeEach(() => {
    render(
      <PreavisDemissionSimulator
        relatedItems={[]}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.conclusion contrat travail = 1| Contrat de travail conclu avant le 1er juillet 2009", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail"
        ),
        {
          target: {
            value: "'Contrat de travail conclu avant le 1er juillet 2009'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 24| 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'1 à 3'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 15| 4", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'4'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 29| 5 et suivants", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-avant-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'5 et suivants'" },
          }
        );
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
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail"
        ),
        {
          target: {
            value: "'Contrat de travail conclu après le 1er juillet 2009'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 24| 1 à 3", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-après-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'1 à 3'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 27| 4 à 5", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-après-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'4 à 5'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 31| 6 et suivants ", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-industrie-pharmaceutique-conclusion-contrat-travail-Contrat-de-travail-conclu-après-le-1er-juillet-2009-groupe"
          ),
          {
            target: { value: "'6 et suivants'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
      });
    });
  });
});
