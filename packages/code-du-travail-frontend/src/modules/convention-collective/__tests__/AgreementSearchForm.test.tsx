import { act, render, screen, waitFor } from "@testing-library/react";

import { AGREEMENT_SEARCH_TOOL } from "../tracking";
import { ui } from "./ui";
import { ui as enterpriseUi } from "../../enterprise/EnterpriseAgreementSearch/__tests__/ui";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { AgreementSearchForm } from "../AgreementSearch/AgreementSearchForm";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

// La catégorie et le chemin de l'event sont déduits de la route courante : on
// place les tests sur la page réelle de l'outil.
const PAGE = "/outils/convention-collective";
const PATH = "outils/convention-collective";
beforeEach(() => {
  (usePathname as jest.Mock).mockReturnValue(PAGE);
});

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../../enterprise/queries");

describe("<PageContribution />", () => {
  let userAction: UserAction;

  it("should track when searching by enterprise name", async () => {
    render(
      <AgreementSearchForm
        trackingActionName={AGREEMENT_SEARCH_TOOL}
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
    await act(async () => {
      userAction.click(
        enterpriseUi.enterpriseAgreementSearch.submitButton.get()
      );
    });
    await waitFor(() => {
      expect(sendEvent).toHaveBeenCalledWith({
        category: "outil",
        action: "search_enterprise",
        name: `{"path":"${PATH}","context":"${AGREEMENT_SEARCH_TOOL}","query":"carrefour"}`,
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
        trackingActionName={AGREEMENT_SEARCH_TOOL}
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
    await act(async () => {
      userAction.click(
        enterpriseUi.enterpriseAgreementSearch.submitButton.get()
      );
    });
    await waitFor(() => {
      expect(sendEvent).toHaveBeenCalledWith({
        category: "outil",
        action: "search_enterprise",
        name: `{"path":"${PATH}","context":"${AGREEMENT_SEARCH_TOOL}","query":"bnp"}`,
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
        trackingActionName={AGREEMENT_SEARCH_TOOL}
        onAgreementSelect={() => {}}
        level={2}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.childminder.title.get()
    );
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_no_enterprise",
      name: `{"path":"${PATH}","context":"${AGREEMENT_SEARCH_TOOL}"}`,
    });
  });

  it("should preselect the defaultRoute radio without emitting any event nor clearing the agreement", async () => {
    (sendEvent as jest.Mock).mockClear();
    const onAgreementSelect = jest.fn();

    render(
      <AgreementSearchForm
        trackingActionName={AGREEMENT_SEARCH_TOOL}
        onAgreementSelect={onAgreementSelect}
        level={2}
        showNoAgreementOption
        defaultRoute="no-agreement"
      />
    );

    await waitFor(() => {
      expect(
        (
          screen.getByLabelText(
            /Je ne souhaite pas renseigner ma convention collective\./
          ) as HTMLInputElement
        ).checked
      ).toBe(true);
    });
    // Pré-cochage automatique : pas une action de l'usager.
    expect(sendEvent).not.toHaveBeenCalled();
    expect(onAgreementSelect).not.toHaveBeenCalled();
  });
});
