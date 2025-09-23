import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1517,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1517"
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

  describe("criteria.niveau = 'I'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'I'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'II'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'II'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'III'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'III'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'IV'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'IV'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'V'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'V'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'VI'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'VI'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'VII'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'VII'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'VIII'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'VIII'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("criteria.niveau = 'IX'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-detail-non-alimentaires-niveau"
        ),
        {
          target: { value: "'IX'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

      expect(
        screen.queryAllByText(/Chapitre VI, article 1/)[0]
      ).toBeInTheDocument();
    });
  });
});
