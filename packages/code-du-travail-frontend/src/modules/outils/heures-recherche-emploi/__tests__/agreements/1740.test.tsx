import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1740,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1740"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />, {
      legacyRoot: true,
    });
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture"
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
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Demission-duree-du-preavis"
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
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 2| 2 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Demission-duree-du-preavis"
          ),
          {
            target: { value: "'2 mois'" },
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
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 3| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Demission-duree-du-preavis"
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
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 4| Un mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Demission-duree-du-preavis"
          ),
          {
            target: { value: "'Un mois'" },
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
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture"
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
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Licenciement-duree-du-preavis"
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
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 2| 2 mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Licenciement-duree-du-preavis"
          ),
          {
            target: { value: "'2 mois'" },
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
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 3| 2 semaines", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Licenciement-duree-du-preavis"
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
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du préavis = 4| Un mois", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture-Licenciement-duree-du-preavis"
          ),
          {
            target: { value: "'Un mois'" },
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
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-batiment-region-parisienne-typeRupture"
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

      expect(screen.queryAllByText(/Article 1.1.9a/)[0]).toBeInTheDocument();
    });
  });
});
