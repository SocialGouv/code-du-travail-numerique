import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 16,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "16"
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

  describe("criteria.catégorie professionnelle = 16| Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "16| Employés" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Annexe II, article 13/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 61| Ingénieurs et Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "61| Ingénieurs et Cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Annexe IV, Article 15/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "4| Ouvriers" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.personnel de conduite = 1| Oui", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.personnel de conduite"), {
          target: { value: "1| Oui" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Accord du 18 avril 2002, article 30/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.personnel de conduite = 2| Non", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.personnel de conduite"), {
          target: { value: "2| Non" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.personnels des entreprises de transport routier de marchandises = 1| Oui", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "criteria.personnels des entreprises de transport routier de marchandises"
            ),
            {
              target: { value: "1| Oui" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Accord du 3 février 2022, article 3/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.personnels des entreprises de transport routier de marchandises = 1| Non", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "criteria.personnels des entreprises de transport routier de marchandises"
            ),
            {
              target: { value: "1| Non" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Annexe I, chapitre Ier, article 5/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = 27| Techniciens et agents de maîtrise (TAM)", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "27| Techniciens et agents de maîtrise (TAM)" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 25| 1 à 5 ", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "25| 1 à 5 " },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe III, article 17/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 30| 6 à 8", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "30| 6 à 8" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe III, article 17/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
