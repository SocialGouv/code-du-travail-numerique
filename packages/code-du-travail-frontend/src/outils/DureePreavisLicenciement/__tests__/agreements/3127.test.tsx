import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3127,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3127"
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

  describe("criteria.ancienneté = 33| 6 mois à moins de 2 ans", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
        target: { value: "33| 6 mois à moins de 2 ans" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(
          /Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective/
        )[0]
      ).toBeInTheDocument();
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

      expect(
        screen.queryAllByText(
          /Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective/
        )[0]
      ).toBeInTheDocument();
    });
  });
});
