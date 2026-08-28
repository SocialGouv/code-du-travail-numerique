import { render, screen } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteRetraite } from "../IndemniteRetraiteSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => undefined);

type Origine = "depart" | "mise";

/**
 * Déroule le parcours jusqu'à l'écran de résultat.
 * Salaire constant de 2000 € : le salaire de référence vaut donc 2000 €.
 */
const runSimulation = (
  userAction: UserAction,
  {
    origine,
    dateEntree,
    dateNotification = "01/12/2023",
    dateSortie = "01/01/2024",
  }: {
    origine: Origine;
    dateEntree: string;
    dateNotification?: string;
    dateSortie?: string;
  }
) => {
  userAction.click(ui.introduction.startButton.get());

  userAction
    .click(
      origine === "mise"
        ? ui.information.originRetraite.mise.get()
        : ui.information.originRetraite.depart.get()
    )
    .click(ui.next.get());

  userAction
    .setInput(ui.seniority.startDate.get(), dateEntree)
    .setInput(ui.seniority.notificationDate.get(), dateNotification)
    .setInput(ui.seniority.endDate.get(), dateSortie)
    .click(ui.next.get());

  // L'étape Absences n'est pas atteinte si l'ancienneté rend inéligible :
  // le simulateur saute directement à l'écran de résultat.
  if (ui.absences.hasAbsence.non.query()) {
    userAction
      .click(ui.absences.arretTravail.non.get())
      .click(ui.absences.hasAbsence.non.get())
      .click(ui.next.get());

    userAction
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2000")
      .click(ui.next.get());
  }
};

describe("Simulateur d'indemnité de départ ou de mise à la retraite", () => {
  let userAction: UserAction;

  beforeEach(() => {
    userAction = new UserAction();
  });

  describe("Parcours", () => {
    test("comporte 6 étapes, sans étape Convention collective", () => {
      render(<CalculateurIndemniteRetraite title={""} />);

      userAction.click(ui.introduction.startButton.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
      expect(ui.activeStep.query()).toHaveTextContent("Étape 2 sur 6");
      expect(ui.agreement.noAgreement.query()).not.toBeInTheDocument();

      userAction
        .click(ui.information.originRetraite.depart.get())
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");

      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2004")
        .setInput(ui.seniority.notificationDate.get(), "01/12/2023")
        .setInput(ui.seniority.endDate.get(), "01/01/2024")
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Absences");

      userAction
        .click(ui.absences.arretTravail.non.get())
        .click(ui.absences.hasAbsence.non.get())
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");

      userAction
        .click(ui.salary.hasSameSalary.oui.get())
        .setInput(ui.salary.sameSalaryValue.get(), "2000")
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test("l'origine du départ doit être renseignée pour passer à l'étape suivante", () => {
      render(<CalculateurIndemniteRetraite title={""} />);

      userAction.click(ui.introduction.startButton.get()).click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Informations");
      expect(
        screen.getByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();
    });
  });

  describe("Libellés dynamiques selon l'origine", () => {
    test("départ volontaire : les libellés parlent de « départ à la retraite »", () => {
      render(<CalculateurIndemniteRetraite title={""} />);

      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.information.originRetraite.depart.get())
        .click(ui.next.get());

      expect(
        screen.getByText(
          "Quelle est la date de notification du départ à la retraite ?"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Quelle est la date de fin du préavis de départ à la retraite (date de fin du contrat) ?"
        )
      ).toBeInTheDocument();

      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2004")
        .setInput(ui.seniority.notificationDate.get(), "01/12/2023")
        .setInput(ui.seniority.endDate.get(), "01/01/2024")
        .click(ui.next.get());

      expect(
        screen.getByText(
          "Le salarié est-il en arrêt de travail au moment du départ à la retraite ?"
        )
      ).toBeInTheDocument();
    });

    test("mise à la retraite : les libellés parlent de « mise à la retraite »", () => {
      render(<CalculateurIndemniteRetraite title={""} />);

      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.information.originRetraite.mise.get())
        .click(ui.next.get());

      expect(
        screen.getByText(
          "Quelle est la date de notification de la mise à la retraite ?"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Quelle est la date de fin du préavis de mise à la retraite (date de fin du contrat) ?"
        )
      ).toBeInTheDocument();

      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2004")
        .setInput(ui.seniority.notificationDate.get(), "01/12/2023")
        .setInput(ui.seniority.endDate.get(), "01/01/2024")
        .click(ui.next.get());

      expect(
        screen.getByText(
          "Le salarié est-il en arrêt de travail au moment de la mise à la retraite ?"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Montants", () => {
    test.each`
      dateEntree      | anciennete  | montant
      ${"01/01/2014"} | ${"10 ans"} | ${"1 000,00 €"}
      ${"01/01/2009"} | ${"15 ans"} | ${"2 000,00 €"}
      ${"01/01/2004"} | ${"20 ans"} | ${"3 000,00 €"}
      ${"01/01/1994"} | ${"30 ans"} | ${"4 000,00 €"}
    `(
      "départ volontaire avec $anciennete d'ancienneté donne $montant",
      ({ dateEntree, montant }) => {
        render(<CalculateurIndemniteRetraite title={""} />);
        runSimulation(userAction, { dateEntree, origine: "depart" });

        expect(ui.result.resultat.query()).toHaveTextContent(
          `l’indemnité de départ à la retraite est estimée à :${montant}`
        );
      }
    );

    test("mise à la retraite avec 12 ans d'ancienneté applique la formule du licenciement", () => {
      render(<CalculateurIndemniteRetraite title={""} />);
      runSimulation(userAction, {
        dateEntree: "01/01/2012",
        origine: "mise",
      });

      expect(ui.result.resultat.query()).toHaveTextContent(
        "l’indemnité de mise à la retraite est estimée à :6 333,33 €"
      );
      // La formule est rendue en LaTeX : on vérifie ses termes explicités.
      const formula = ui.result.formula.query();
      expect(formula).toHaveTextContent(
        "A1 : Ancienneté de 10 ans ou moins (10 ans)"
      );
      expect(formula).toHaveTextContent(
        "A2 : Ancienneté au-delà de 10 ans (2 ans)"
      );
      expect(formula).toHaveTextContent("Sref : Salaire de référence (2000 €)");
    });
  });

  describe("Absence d'indemnité", () => {
    test("départ volontaire avec moins de 10 ans d'ancienneté", () => {
      render(<CalculateurIndemniteRetraite title={""} />);
      runSimulation(userAction, {
        dateEntree: "01/01/2019",
        origine: "depart",
      });

      expect(
        screen.getByText(
          "Il n'y a pas d'indemnité de départ à la retraite dans cette situation"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/inférieure à 10 ans/, { exact: false })
      ).toBeInTheDocument();
    });

    test("mise à la retraite avec moins de 8 mois d'ancienneté", () => {
      render(<CalculateurIndemniteRetraite title={""} />);
      runSimulation(userAction, {
        dateEntree: "01/06/2023",
        origine: "mise",
      });

      expect(
        screen.getByText(
          "Il n'y a pas d'indemnité de mise à la retraite dans cette situation"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/inférieure à 8 mois/, { exact: false })
      ).toBeInTheDocument();
    });
  });

  describe("Écran de résultat", () => {
    beforeEach(() => {
      render(<CalculateurIndemniteRetraite title={""} />);
      runSimulation(userAction, {
        dateEntree: "01/01/2004",
        origine: "depart",
      });
    });

    test("n'affiche ni section Convention collective ni Résultat décrypté", () => {
      // `runSimulation` tolère l'absence des étapes Absences et Salaires : sans
      // cet ancrage, les trois assertions négatives passeraient aussi sur un
      // parcours interrompu avant l'écran de résultat.
      expect(ui.result.resultat.query()).toBeInTheDocument();
      expect(
        screen.queryByText(/La convention collective n’a pas été renseignée/)
      ).not.toBeInTheDocument();
      expect(ui.result.resultatLegal.query()).not.toBeInTheDocument();
      expect(ui.result.resultatAgreement.query()).not.toBeInTheDocument();
    });

    test("affiche l'origine du départ dans les éléments saisis", () => {
      expect(
        screen.getByText(/Origine du départ/, { exact: false })
      ).toHaveTextContent("Origine du départ : Départ à la retraite");
    });

    test("affiche les sources du départ volontaire et aucune source du licenciement", () => {
      const sources = ui.result.sources.getAll().map((el) => el.textContent);

      expect(sources).toEqual(
        expect.arrayContaining([
          "Article L1237-4",
          "Article L1237-9",
          "Article D1237-1",
          "Article D1237-2",
        ])
      );
      expect(sources.filter((s) => s?.includes("1234"))).toEqual([]);
    });

    test("renvoie vers la contribution sur les indemnités de retraite", () => {
      expect(screen.getByText("cet article").closest("a")).toHaveAttribute(
        "href",
        "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite"
      );
    });
  });

  test("mise à la retraite : les sources sont celles de la mise à la retraite", () => {
    render(<CalculateurIndemniteRetraite title={""} />);
    runSimulation(userAction, { dateEntree: "01/01/2004", origine: "mise" });

    const sources = ui.result.sources.getAll().map((el) => el.textContent);
    expect(sources).toEqual(
      expect.arrayContaining([
        "Article L1237-4",
        "Article L1237-5",
        "Article L1237-7",
        "Article D1237-2",
      ])
    );
    expect(sources).not.toContain("Article D1237-1");
  });
});
