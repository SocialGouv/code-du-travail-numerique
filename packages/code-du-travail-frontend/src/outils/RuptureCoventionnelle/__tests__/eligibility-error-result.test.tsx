import { CalculateurRuptureConventionnelle } from "../..";
import { UserAction } from "../../../common";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { render } from "@testing-library/react";

describe(`Tests d'éligibilité`, () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
  });

  test("Vérifier l'affichage de l'erreur sur le type de contrat CDD", () => {
    userAction.click(ui.contract.type.cdd.get());
    userAction.click(ui.next.get());
    expect(ui.result.legalError.cddRupture.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });
  test("Vérifier l'affichage de l'erreur sur le type de contrat CDD même si on clique sur CDI avant", () => {
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.type.cdd.get());
    userAction.click(ui.next.get());
    expect(ui.result.legalError.cddRupture.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });
});
