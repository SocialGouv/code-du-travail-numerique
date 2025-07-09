import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1606,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1606"
        }
        `
);

describe("DureePreavisLicenciement", () => {
  beforeEach(() => {
    render(<DureePreavisLicenciement icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(screen.getByTestId("seriousMisconduct-non"));
    fireEvent.click(ui.next.get());

    fireEvent.click(screen.getByTestId("disabledWorker-non"));
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
      target: { value: "15| Moins de 6 mois" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "23| Agents de maîtrise" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 17| Entre 2 et 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "17| Entre 2 et 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe "agents de maîtrise" Article 9/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 22| Plus de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "22| Plus de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe "agents de maîtrise" Article 9/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 48| Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "48| Cadres" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 19| De 3 à 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "19| De 3 à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe "cadres" Article 9/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 22| Plus de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "22| Plus de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Annexe "cadres" Article 9/)[0]
        ).toBeInTheDocument();
      });
    });
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

    describe("criteria.ancienneté = 3| Moins de 1 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "3| Moins de 1 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/Aucun préavis/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 14| 1 mois à moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "14| 1 mois à moins de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/15 jours/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 35| 6 mois à 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "35| 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
      });
    });
  });
});
