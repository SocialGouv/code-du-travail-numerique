import { DureePreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1518,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1518"
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

  describe("criteria.catégorie professionnelle = 21| Agents de maîtrise et Techniciens", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "21| Agents de maîtrise et Techniciens" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 15| 4", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "15| 4" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 16| 5", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "16| 5" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 17| 6", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "17| 6" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 45| Animateurs, techniciens et professeurs", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "45| Animateurs, techniciens et professeurs" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 13| A", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "13| A" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = 14| B", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "14| B" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
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

    describe("criteria.groupe = 18| 7", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "18| 7" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = 19| 8", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "19| 8" },
        });
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId("criteria.catégorie professionnelle"),
        {
          target: { value: "6| Ouvriers, Employés" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 13| 2", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "13| 2" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "40| 2 ans ou moins" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 14| 3", () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "14| 3" },
        });
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
            target: { value: "40| 2 ans ou moins" },
          });
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
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

          expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
        });
      });
    });
  });
});
