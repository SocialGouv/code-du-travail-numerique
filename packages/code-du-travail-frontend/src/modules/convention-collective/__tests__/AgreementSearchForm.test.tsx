import { render, screen, waitFor } from "@testing-library/react";

import { TrackingAgreementSearchAction } from "../tracking";
import { ui } from "./ui";
import { ui as enterpriseUi } from "../../enterprise/EnterpriseAgreementSearch/__tests__/ui";
import { sendEvent } from "../../utils";
import { AgreementSearchForm } from "../AgreementSearch/AgreementSearchForm";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock(
  "../../enterprise/EnterpriseAgreementSearch/EnterpriseAgreementSearchInput"
);

describe("<PageContribution />", () => {
  let userAction: UserAction;

  it("should track when searching by enterprise name", async () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
        level={2}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    userAction.setInput(
      enterpriseUi.enterpriseAgreementSearch.input.get(),
      "carrefour"
    );
    userAction.click(enterpriseUi.enterpriseAgreementSearch.submitButton.get());
    await waitFor(() => {
      expect(sendEvent).toHaveBeenCalledWith({
        action: "Trouver sa convention collective",
        category: "enterprise_search",
        name: '{"query":"carrefour"}',
        value: "",
      });
    });
    expect(
      enterpriseUi.enterpriseAgreementSearch.resultLines.carrefour.title.query()
    ).toBeInTheDocument();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.carrefour.title.get()
    );
  });

  it("should track when searching by enterprise with multiple agreements", async () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
        level={2}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    userAction.setInput(
      enterpriseUi.enterpriseAgreementSearch.input.get(),
      "bnp"
    );
    userAction.click(enterpriseUi.enterpriseAgreementSearch.submitButton.get());
    await waitFor(() => {
      expect(sendEvent).toHaveBeenCalledWith({
        action: "Trouver sa convention collective",
        category: "enterprise_search",
        name: '{"query":"bnp"}',
        value: "",
      });
    });
    expect(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.title.query()
    ).toBeInTheDocument();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.title.get()
    );
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.ccList.idcc2120.get()
    );
  });

  it("should track when selecting agreement 3239", () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
        level={2}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    screen.debug();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.childminder.title.get()
    );
    expect(sendEvent).toHaveBeenCalledWith({
      action: "select_je_n_ai_pas_d_entreprise",
      category: "cc_search_type_of_users",
      name: "Trouver sa convention collective",
    });
  });
});
