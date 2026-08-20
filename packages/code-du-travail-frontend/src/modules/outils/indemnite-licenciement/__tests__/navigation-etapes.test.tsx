import { render, screen } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => undefined);

const agreement16 = JSON.stringify({
  num: 16,
  shortTitle: "Transports routiers et activités auxiliaires du transport",
  id: "KALICONT000005635624",
  title: "Transports routiers et activités auxiliaires du transport",
  url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
  slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
});

describe("Indemnité licenciement - Navigation entre les étapes", () => {
  let userAction: UserAction;

  beforeEach(() => {
    getItemSpy.mockReturnValue(null);
    userAction = new UserAction();
  });

  describe("sans convention collective renseignée", () => {
    test(`Le bouton Suivant reste actif quand on revient sur l'étape Informations avec Précédent`, () => {
      render(<CalculateurIndemniteLicenciement title={""} />);

      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.agreement.noAgreement.get())
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");

      userAction
        .click(ui.information.inaptitude.non.get())
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");

      // On revient sur l'étape Informations : le bouton Suivant doit rester cliquable
      userAction.click(ui.previous.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
      expect(ui.next.get()).toBeEnabled();

      // et on doit pouvoir repartir en avant
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });

    test(`Le bouton Suivant reste actif sur toutes les étapes quand on les remonte avec Précédent`, () => {
      render(<CalculateurIndemniteLicenciement title={""} />);

      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.agreement.noAgreement.get())
        .click(ui.next.get())
        .click(ui.information.inaptitude.non.get())
        .click(ui.next.get())
        .setInput(ui.seniority.startDate.get(), "01/01/2018")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
        .setInput(ui.seniority.endDate.get(), "01/01/2024")
        .click(ui.next.get())
        .click(ui.absences.arretTravail.non.get())
        .click(ui.absences.hasAbsence.non.get())
        .click(ui.next.get())
        .click(ui.salary.hasSameSalary.oui.get())
        .setInput(ui.salary.sameSalaryValue.get(), "2500")
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

      // Remontée étape par étape : Suivant doit être actif partout
      const etapesRemontees = [
        "Salaires",
        "Absences",
        "Ancienneté",
        "Informations",
        "Convention collective",
      ];
      etapesRemontees.forEach((etape) => {
        userAction.click(ui.previous.get());
        expect(ui.activeStep.query()).toHaveTextContent(etape);
        expect(ui.next.get()).toBeEnabled();
      });

      // Redescente : on doit pouvoir aller jusqu'au résultat sans ressaisir
      const etapesRedescendues = [
        "Informations",
        "Ancienneté",
        "Absences",
        "Salaires",
        "Indemnité",
      ];
      etapesRedescendues.forEach((etape) => {
        userAction.click(ui.next.get());
        expect(ui.activeStep.query()).toHaveTextContent(etape);
      });
    });
  });

  describe("avec une convention collective couverte (IDCC 16)", () => {
    beforeEach(() => {
      getItemSpy.mockReturnValue(agreement16);
    });

    test(`Le bouton Suivant reste bloqué tant qu'une question publicodes est sans réponse, puis reste actif au retour`, async () => {
      render(<CalculateurIndemniteLicenciement title={""} />);

      userAction.click(ui.introduction.startButton.get()).click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");

      // Le garde-fou reste en place : on ne passe pas sans avoir tout répondu
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
      expect(ui.next.get()).toBeDisabled();
      expect(
        screen.queryAllByText("Vous devez répondre à cette question").length
      ).toBeGreaterThan(0);

      userAction.click(ui.information.inaptitude.non.get());
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres"
      );
      userAction
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(
          ui.information.agreement16.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(ui.information.agreement16.engineerAge.get(), "38")
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");

      // Retour sur l'étape : le bouton Suivant doit rester cliquable
      userAction.click(ui.previous.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
      expect(ui.next.get()).toBeEnabled();

      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });
  });
});
