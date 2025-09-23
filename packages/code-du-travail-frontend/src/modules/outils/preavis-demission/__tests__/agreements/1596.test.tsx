import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1596,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1596"
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

  describe("criteria.ancienneté = 'Au delà de la période d'essai et jusqu'à 3 mois'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-batiment-ouvriers-employes-anciennete"
        ),
        {
          target: {
            value: "'Au delà de la période d'essai et jusqu'à 3 mois'",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 10.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.ancienneté = 'Plus de 3 mois'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-batiment-ouvriers-employes-anciennete"
        ),
        {
          target: { value: "'Plus de 3 mois'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 10.1/)[0]).toBeInTheDocument();
    });
  });
});
