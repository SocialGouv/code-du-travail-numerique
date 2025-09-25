import { CalculateurPreavisLicenciement } from "../../index";
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

describe("CalculateurPreavisLicenciement", () => {
  beforeEach(() => {
    render(
      <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    // Étape 1 : Situation du salarié - Compléter toutes les questions
    fireEvent.click(ui.situation.fauteGraveNon.get());
    fireEvent.click(ui.situation.handicapNon.get());
    fireEvent.change(ui.situation.seniority.get(), {
      target: { value: "'Moins de 6 mois'" },
    });
    fireEvent.click(ui.next.get());

    // Étape 2 : Convention collective (déjà sélectionnée par défaut)
    fireEvent.click(ui.next.get());
  });

  describe("criteria.âge = Moins de 50 ans", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-age"
        ),
        {
          target: { value: "'Moins de 50 ans'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position"
          ),
          {
            target: { value: "'A, B, C ou D'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.position = E", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position"
          ),
          {
            target: { value: "'E'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-E-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 2 ans et moins de 3 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-E-anciennete"
            ),
            {
              target: { value: "'Entre 2 ans et moins de 3 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 3 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-E-anciennete"
            ),
            {
              target: { value: "'3 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.position = F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position"
          ),
          {
            target: { value: "'F, G, H ou I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 2 ans et moins de 3 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Entre 2 ans et moins de 3 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Entre 3 ans et moins de 5 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-Moins-de-50-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'5 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.âge = 50 ans à 55 ans", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-age"
        ),
        {
          target: { value: "'50 ans à 55 ans'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position"
          ),
          {
            target: { value: "'A, B, C ou D'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.position = F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position"
          ),
          {
            target: { value: "'F, G, H ou I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Entre 3 ans et moins de 5 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/4 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-50-ans-a-55-ans-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'5 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.âge = 55 ans et plus", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-age"
        ),
        {
          target: { value: "'55 ans et plus'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.position = A, B, C ou D", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position"
          ),
          {
            target: { value: "'A, B, C ou D'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 2 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-A,-B,-C-ou-D-anciennete"
            ),
            {
              target: { value: "'2 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.position = E", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position"
          ),
          {
            target: { value: "'E'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-E-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 2 ans et moins de 3 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-E-anciennete"
            ),
            {
              target: { value: "'Entre 2 ans et moins de 3 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 3 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-E-anciennete"
            ),
            {
              target: { value: "'3 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.position = F, G, H ou I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position"
          ),
          {
            target: { value: "'F, G, H ou I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.ancienneté = Moins de 2 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Moins de 2 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 2 ans et moins de 3 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Entre 2 ans et moins de 3 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = Entre 3 ans et moins de 5 ans", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'Entre 3 ans et moins de 5 ans'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.ancienneté = 5 ans ou plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos-contrat-salarie-convention-collective-metallurgie-age-55-ans-et-plus-position-F,-G,-H-ou-I-anciennete"
            ),
            {
              target: { value: "'5 ans ou plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/6 mois/g)[0]).toBeInTheDocument();
          expect(
            screen.queryAllByText(/Article 75.2.1/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });
});
