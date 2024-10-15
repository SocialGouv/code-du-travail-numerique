import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3239,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3239"
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

  describe("criteria.catégorie professionnelle = 100| Salariés du particulier employeur", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "100| Salariés du particulier employeur" },
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
        expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
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

        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 162.4.1/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 101| Assistants maternels du particulier employeur", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: {
            value: "101| Assistants maternels du particulier employeur",
          },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = 105| Enfant accueilli depuis moins de 3 mois", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "105| Enfant accueilli depuis moins de 3 mois" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 106| Enfant accueilli de 3 mois à moins d'un an", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "106| Enfant accueilli de 3 mois à moins d'un an" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/15 jours/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = 107| Enfant accueilli depuis 1 an et plus", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "107| Enfant accueilli depuis 1 an et plus" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(
            /Art. L. 423-25 du Code de l'action sociale et des familles/
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Art. 120 de la convention collective/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
