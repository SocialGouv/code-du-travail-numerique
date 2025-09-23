import { CalculateurPreavisLicenciement } from "../../index";
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

  describe("criteria.niveau = I", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'I'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau I - ancienneté"
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
          screen.queryAllByText(/Chapitre VI, article 1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau I - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = II", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'II'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau II - ancienneté"
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
          screen.queryAllByText(/Chapitre VI, article 1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau II - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = III", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'III'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau III - ancienneté"
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
          screen.queryAllByText(/Chapitre VI, article 1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau III - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = IV", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'IV'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau IV - ancienneté"
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
          screen.queryAllByText(/Chapitre VI, article 1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau IV - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = V", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'V'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau V - ancienneté"
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
          screen.queryAllByText(/Chapitre VI, article 1/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau V - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = VI", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'VI'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VI - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
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

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VI - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
  });

  describe("criteria.niveau = VII", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'VII'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VII - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
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

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VII - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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

  describe("criteria.niveau = VIII", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'VIII'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VIII - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
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

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau VIII - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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

  describe("criteria.niveau = IX", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau"
        ),
        {
          target: { value: "'IX'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.ancienneté = Moins de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau IX - ancienneté"
          ),
          {
            target: { value: "'Moins de 2 ans'" },
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

    describe("criteria.ancienneté = Plus de 2 ans", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos-contrat salarié - convention collective - commerces de detail non alimentaires - niveau IX - ancienneté"
          ),
          {
            target: { value: "'Plus de 2 ans'" },
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
});
