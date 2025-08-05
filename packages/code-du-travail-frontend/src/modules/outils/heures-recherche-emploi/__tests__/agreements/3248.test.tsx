import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
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

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - métallurgie - typeRupture"
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
            "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai"
          ),
          {
            target: { value: "'L'employeur'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.forfait jour = 1| Oui", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour"
            ),
            {
              target: { value: "'Oui'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 1| Moins d'un mois", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour Oui - ancienneté"
              ),
              {
                target: { value: "'Moins d'un mois'" },
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

            expect(
              screen.queryAllByText(/Article 70.5.3.2/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 2| Un mois ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour Oui - ancienneté"
              ),
              {
                target: { value: "'Un mois ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(/1 jour pour 2 semaines de travail/g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire est maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Si la durée du délai de prévenance est égale à 2 semaines, la journée est fixée par l'employeur. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Article 70.5.3.2/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.forfait jour = 2| Non", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour"
            ),
            {
              target: { value: "'Non'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 1| Moins d'un mois", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour Non - ancienneté"
              ),
              {
                target: { value: "'Moins d'un mois'" },
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

            expect(
              screen.queryAllByText(/Article 70.5.3.1/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 2| Un mois ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai L'employeur - forfait jour Non - ancienneté"
              ),
              {
                target: { value: "'Un mois ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(
              screen.queryAllByText(/2h30 par jour travaillé/g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Le salaire est maintenu./g)[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(
                /L’utilisation de ces heures, y compris leur regroupement éventuel, est convenue entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g
              )[0]
            ).toBeInTheDocument();
            expect(
              screen.queryAllByText(/Article 70.5.3.1/)[0]
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - métallurgie - typeRupture Rupture de la période d'essai - initiative de la rupture de la période d'essai"
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

        expect(
          screen.queryAllByText(/Article 70.5.3.1/)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Article 70.5.3.2/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - métallurgie - typeRupture"
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

      expect(screen.queryAllByText(/Article 74.2.2/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - métallurgie - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.forfait jour = 1| Non", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - métallurgie - typeRupture Licenciement - forfait jour"
          ),
          {
            target: { value: "'Non'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /2h30 maximum par jour travaillé \(dans la limite de 50 heures par mois de préavis\)/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /L'employeur et le salarié s’entendent sur les modalités de prise de ces heures \(y compris sur leur regroupement éventuel\). À défaut d'accord entre les parties, les heures sont fixées alternativement un jour par l'employeur et un jour par le salarié. Elles peuvent être regroupées si le salarié occupe un poste qui présente des contraintes d’organisation particulières. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 75.2.3.1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.forfait jour = 2| Oui", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - métallurgie - typeRupture Licenciement - forfait jour"
          ),
          {
            target: { value: "'Oui'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/1 jour pour 2 semaines de travail/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Article 75.2.3.2/)[0]
        ).toBeInTheDocument();
      });
    });
  });
});
