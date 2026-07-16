import { act, render } from "@testing-library/react";

import { EnterpriseAgreementSearchInput } from "../EnterpriseAgreementSearchInput";
import { ui } from "./ui";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("../../queries");

describe("<EnterpriseAgreementSearchInput /> - focus sur le titre des résultats", () => {
  it("ne déplace pas le focus sur les résultats lors d'une recherche automatique via defaultSearch", async () => {
    await act(async () => {
      render(
        <EnterpriseAgreementSearchInput
          defaultSearch="carrefour"
          trackingActionName="Trouver sa convention collective"
          level={2}
        />
      );
    });

    expect(ui.enterpriseAgreementSearch.resultTitle.get()).toBeInTheDocument();
    expect(ui.enterpriseAgreementSearch.resultTitle.get()).not.toHaveFocus();
  });

  it("déplace le focus sur les résultats lors d'une recherche déclenchée par l'utilisateur", async () => {
    render(
      <EnterpriseAgreementSearchInput
        trackingActionName="Trouver sa convention collective"
        level={2}
      />
    );

    const userAction = new UserAction();
    userAction.setInput(ui.enterpriseAgreementSearch.input.get(), "carrefour");
    await act(async () => {
      userAction.click(ui.enterpriseAgreementSearch.submitButton.get());
    });

    expect(ui.enterpriseAgreementSearch.resultTitle.get()).toBeInTheDocument();
    expect(ui.enterpriseAgreementSearch.resultTitle.get()).toHaveFocus();
  });
});
