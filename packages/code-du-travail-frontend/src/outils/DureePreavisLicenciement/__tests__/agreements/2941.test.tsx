import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2941,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2941"
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

  describe("criteria.catégorie professionnelle = 79| Employé", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "79| Employé" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 15| Moins de 6 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "15| Moins de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 semaine \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
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
        expect(
          screen.queryAllByText(/1 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
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
        expect(
          screen.queryAllByText(/2 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 84| Technicien-agent de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "84| Technicien-agent de maîtrise" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "38| Moins de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
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
        expect(
          screen.queryAllByText(/2 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 86| Cadre", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "86| Cadre" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "38| Moins de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
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
        expect(
          screen.queryAllByText(/4 mois \(de date à date\)/g)[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Titre IV, article 26.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
