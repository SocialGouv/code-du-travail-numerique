import PreavisDemissionSimulator from "../../PreavisDemissionSimulator";
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

  describe("criteria.catégorie professionnelle = 'Agents de maîtrise et Techniciens'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise et Techniciens'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = '4'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Agents de maîtrise et Techniciens - groupe"
          ),
          {
            target: { value: "'4'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = '5'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Agents de maîtrise et Techniciens - groupe"
          ),
          {
            target: { value: "'5'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = '6'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Agents de maîtrise et Techniciens - groupe"
          ),
          {
            target: { value: "'6'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Animateurs, techniciens et professeurs'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle"
        ),
        {
          target: { value: "'Animateurs, techniciens et professeurs'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.niveau = 'A'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Animateurs, techniciens et professeurs - niveau"
          ),
          {
            target: { value: "'A'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.niveau = 'B'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Animateurs, techniciens et professeurs - niveau"
          ),
          {
            target: { value: "'B'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Cadres'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle"
        ),
        {
          target: { value: "'Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = '7'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Cadres - groupe"
          ),
          {
            target: { value: "'7'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = '8'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Cadres - groupe"
          ),
          {
            target: { value: "'8'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 'Ouvriers, Employés'", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers, Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = '2'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Ouvriers, Employés - groupe"
          ),
          {
            target: { value: "'2'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.groupe = '3'", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - éducation et loisirs - catégorie professionnelle Ouvriers, Employés - groupe"
          ),
          {
            target: { value: "'3'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 4.4/)[0]).toBeInTheDocument();
      });
    });
  });
});
