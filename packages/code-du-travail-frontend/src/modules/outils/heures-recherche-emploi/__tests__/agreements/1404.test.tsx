import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "../ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1404,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1404"
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
          "infos.contrat salarié - convention collective - sedima - typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 48| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - sedima - typeRupture Démission - catégorie professionnelle"
          ),
          {
            target: { value: "'Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les cadres sont autorisés à s'absenter en une ou plusieurs fois. Les conditions des absences sont préalablement fixées par le salarié et l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 6.50.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - sedima - typeRupture Démission - catégorie professionnelle"
          ),
          {
            target: { value: "'Non-cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures de recherche d'emploi sont réparties à raison de 2 heures par jour de travail. L'employeur fixe les conditions d'absence du salarié./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 3.41.1.1/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - sedima - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 48| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - sedima - typeRupture Licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les cadres sont autorisés à s'absenter en une ou plusieurs fois. Les conditions des absences sont préalablement fixées par le salarié et l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 6.50.1/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - sedima - typeRupture Licenciement - catégorie professionnelle"
          ),
          {
            target: { value: "'Non-cadres'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salarié est autorisé à s'absenter pour rechercher un emploi dans la limite de 50 heures par mois réparties à raison de 2 heures par jour de travail. Ces heures d'absence peuvent être groupées en tout ou partie avec l'accord de l'employeur. Ces autorisations d'absence prennent fin dès que le salarié a retrouvé un emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 3.41.1.2/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - sedima - typeRupture"
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

      expect(screen.queryAllByText(/Article 3.14.1/)[0]).toBeInTheDocument();
    });
  });
});
