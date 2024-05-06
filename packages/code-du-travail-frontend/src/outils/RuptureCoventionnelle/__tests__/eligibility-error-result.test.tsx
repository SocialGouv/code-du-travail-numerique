import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { fireEvent, render } from "@testing-library/react";

describe(`Tests d'éligibilité`, () => {
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
  });

  test("Vérifier l'affichage de l'erreur sur le type de contrat CDD", () => {
    fireEvent.click(ui.contract.type.cdd.get());
    fireEvent.click(ui.next.get());
    expect(ui.result.legalError.cddRupture.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });
  test("Vérifier l'affichage de l'erreur sur le type de contrat CDD même si on clique sur CDI avant", () => {
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.type.cdd.get());
    fireEvent.click(ui.next.get());
    expect(ui.result.legalError.cddRupture.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });
});
