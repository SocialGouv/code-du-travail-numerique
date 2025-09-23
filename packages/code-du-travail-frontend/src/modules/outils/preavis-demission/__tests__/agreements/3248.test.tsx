import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
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

  describe("criteria.groupe = 'A ou B'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-métallurgie-groupe"
        ),
        {
          target: { value: "'A ou B'" },
        }
      );
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

  describe("criteria.groupe = 'C'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-métallurgie-groupe"
        ),
        {
          target: { value: "'C'" },
        }
      );
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

  describe("criteria.groupe = 'D ou E'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-métallurgie-groupe"
        ),
        {
          target: { value: "'D ou E'" },
        }
      );
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

  describe("criteria.groupe = 'F, G, H ou I'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarié-convention-collective-métallurgie-groupe"
        ),
        {
          target: { value: "'F, G, H ou I'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
    });
  });
});
