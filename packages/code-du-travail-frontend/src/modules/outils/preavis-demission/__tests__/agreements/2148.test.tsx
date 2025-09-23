import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2148,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2148"
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

  describe("criteria.groupe = 'A et B'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-telecommunications-groupe"
        ),
        {
          target: { value: "'A et B'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 'Moins de 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-telecommunications-groupe-A-et-B-anciennete"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 'Plus de 2 ans'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-telecommunications-groupe-A-et-B-anciennete"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.groupe = 'C et D'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-telecommunications-groupe"
        ),
        {
          target: { value: "'C et D'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.groupe = 'E, F et G'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-telecommunications-groupe"
        ),
        {
          target: { value: "'E, F et G'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
    });
  });

  describe("criteria.groupe = 'Hors classification'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-telecommunications-groupe"
        ),
        {
          target: { value: "'Hors classification'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
    });
  });
});
