import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1596,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1596"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.durée du préavis = 1| 2 jours", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Démission - durée du préavis"
          ),
          {
            target: { value: "'2 jours'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 2| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Démission - durée du préavis"
          ),
          {
            target: { value: "'2 semaines'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 3| Plus de 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Démission - durée du préavis"
          ),
          {
            target: { value: "'Plus de 2 semaines'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.durée du préavis = 1| 2 jours", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Licenciement - durée du préavis"
          ),
          {
            target: { value: "'2 jours'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 2| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Licenciement - durée du préavis"
          ),
          {
            target: { value: "'2 semaines'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 3| Plus de 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture Licenciement - durée du préavis"
          ),
          {
            target: { value: "'Plus de 2 semaines'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 10.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - batiment ouvriers employés - typeRupture"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 2.4/)[0]).toBeInTheDocument();
    });
  });
});
