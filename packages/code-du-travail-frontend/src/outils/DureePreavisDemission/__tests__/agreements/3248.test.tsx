import { DureePreavisDemission } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3248,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3248"
        }
        `
);

describe("DureePreavisDemission", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("criteria.groupe = 1| A ou B", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.groupe"), {
        target: { value: "1| A ou B" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.groupe = 2| C", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.groupe"), {
        target: { value: "2| C" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.groupe = 3| D ou E", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.groupe"), {
        target: { value: "3| D ou E" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/
        )[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.groupe = 4| F, G, H ou I", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("criteria.groupe"), {
        target: { value: "4| F, G, H ou I" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
    });
  });
});
