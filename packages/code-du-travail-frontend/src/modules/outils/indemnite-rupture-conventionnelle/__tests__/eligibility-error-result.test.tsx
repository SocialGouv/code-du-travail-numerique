import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { render } from "@testing-library/react";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

describe(`Tests d'éligibilité`, () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <IndemniteRuptureCoSimulator
        breadcrumbTitle="Simulateur d'indemnité de rupture conventionnelle"
        description="Estimez le montant de l'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
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
