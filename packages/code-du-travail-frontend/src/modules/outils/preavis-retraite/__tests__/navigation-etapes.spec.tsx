import { render } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurPreavisRetraite } from "../PreavisRetraiteSimulator";
import { ui } from "./ui";

test(`Le bouton Suivant reste actif quand on revient sur l'étape Informations avec Précédent`, () => {
  render(<CalculateurPreavisRetraite title="Préavis de retraite" />);
  const userAction = new UserAction();

  userAction
    .click(ui.introduction.startButton.get())
    .click(ui.contract.originDepart.depart.get())
    .click(ui.next.get())
    .click(ui.agreement.noAgreement.get())
    .click(ui.next.get());
  expect(ui.activeStep.query()).toHaveTextContent("Informations");

  userAction
    .click(ui.information.handicap.answerNon.get())
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
