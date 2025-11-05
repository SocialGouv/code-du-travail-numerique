import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2264,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2264"
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

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture"
        ),
        {
          target: { value: "'Rupture de la période d'essai'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Rupture-de-la-periode-d'essai-initiative-de-la-rupture-de-la-periode-d'essai"
          ),
          {
            target: { value: "'L'employeur'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = 1| 3 mois ou moins", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Rupture-de-la-periode-d'essai-initiative-de-la-rupture-de-la-periode-d'essai-L'employeur-anciennete"
            ),
            {
              target: { value: "'3 mois ou moins'" },
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

          expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2| Plus de 3 mois", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Rupture-de-la-periode-d'essai-initiative-de-la-rupture-de-la-periode-d'essai-L'employeur-anciennete"
            ),
            {
              target: { value: "'Plus de 3 mois'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(
            screen.queryAllByText(
              /2 jours, si le préavis \(aussi appelé délai de prévenance\) est exécuté/g
            )[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Le salaire est maintenu./g)[0]
          ).toBeInTheDocument();
          expect(
            screen.queryAllByText(
              /Chaque jour d'absence correspond à la durée habituelle de travail du salarié./g
            )[0]
          ).toBeInTheDocument();

          expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
        });
      });
    });

    describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Rupture-de-la-periode-d'essai-initiative-de-la-rupture-de-la-periode-d'essai"
          ),
          {
            target: { value: "'Le salarié'" },
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

        expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture"
        ),
        {
          target: { value: "'Démission'" },
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

      expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.durée du travail = 1| Temps complet", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Licenciement-duree-du-travail"
          ),
          {
            target: { value: "'Temps complet'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail dans l'entreprise/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
      });
    });

    describe("criteria.durée du travail = 2| Temps partiel", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-hospitalisation-privees-typeRupture-Licenciement-duree-du-travail"
          ),
          {
            target: { value: "'Temps partiel'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail prévue par le contrat de travail/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
      });
    });
  });
});
