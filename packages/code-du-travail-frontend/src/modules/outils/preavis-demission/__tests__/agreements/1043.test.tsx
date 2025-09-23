import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1043,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1043"
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

  describe("criteria.logement = 1| Non-logé", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-gardien-concierge-logement"
        ),
        {
          target: { value: "'Non-logé'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = 21| Inférieur ou égal à 602", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-gardien-concierge-logement-Non-logé-coefficient"
          ),
          {
            target: { value: "'Inférieur ou égal à 602'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.coefficient = 22| Supérieur à 602", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarié-convention-collective-gardien-concierge-logement-Non-logé-coefficient"
          ),
          {
            target: { value: "'Supérieur à 602'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.logement = 3| Logé", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-gardien-concierge-logement"
        ),
        {
          target: { value: "'Logé'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
    });
  });
});
