import { DureePreavisDemission } from "../../index";
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

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.logement = 1| Non-logé", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.logement"), {
        target: { value: "1| Non-logé" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.coefficient = 21| Inférieur ou égal à 602", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "21| Inférieur ou égal à 602" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/8 jours/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.coefficient = 22| Supérieur à 602", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "22| Supérieur à 602" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.logement = 3| logés", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.logement"), {
        target: { value: "3| logés" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 14/)[0]).toBeInTheDocument();
    });
  });
});
