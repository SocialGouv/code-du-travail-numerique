import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2216,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2216"
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

  describe("criteria.catégorie professionnelle = 'Agents de maîtrise et Techniciens'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-categorie-professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise et Techniciens'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 5 de l'annexe II/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 'Cadres'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-categorie-professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Annexe III, article 5/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 'Ouvriers, Employés'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-categorie-professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Article 3 de l'annexe I/)[0]
      ).toBeInTheDocument();
    });
  });
});
