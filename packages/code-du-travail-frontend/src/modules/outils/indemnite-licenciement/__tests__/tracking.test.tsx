import { act, render, waitFor } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { UserAction } from "../../common/utils/UserAction";
import IndemniteLicenciementSimulator from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("../../../enterprise/queries");
jest.mock(
  "../../../convention-collective/AgreementSearch/AgreementSearchInput"
);

const SIMULATOR = "Indemnité de licenciement";
const PAGE = "/outils/indemnite-licenciement";
const PATH = "outils/indemnite-licenciement";

const named = (payload: Record<string, unknown>) =>
  JSON.stringify({ path: PATH, ...payload });

// Le titre du simulateur suffixait l'action dans l'ancien schéma
// (`view_step_Indemnité de licenciement`), ce qui créait une action Matomo par
// simulateur, accents et espaces compris. Il est désormais en payload.
const step = (name: string) => named({ simulator: SIMULATOR, step: name });

describe("Indemnité licenciement - Tracking", () => {
  beforeEach(() => {
    // `useTracking` lit `usePathname()`, `sendPageEvent` (appelé depuis les
    // stores zustand) lit `window.location` : les deux doivent désigner la même
    // page pour que le parcours soit cohérent.
    (usePathname as jest.Mock).mockReturnValue(PAGE);
    window.history.pushState({}, "", PAGE);

    render(
      <IndemniteLicenciementSimulator
        title={SIMULATOR}
        displayTitle={SIMULATOR}
        relatedItems={[]}
      />
    );
  });
  const userAction = new UserAction();

  test("vérifier le tracking sur la navigation", async () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":16,"shortTitle":"Transports routiers et activités auxiliaires du transport"}`
    );
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("info_cc"),
    });
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("infos"),
    });
    await userAction.click(ui.information.inaptitude.non.get());
    await userAction.changeInputList(
      ui.information.agreement16.proCategory.get(),
      "Ingénieurs et cadres"
    );
    userAction.click(
      ui.information.agreement16.proCategoryHasChanged.oui.get()
    );
    userAction.setInput(
      ui.information.agreement16.dateProCategoryChanged.get(),
      "01/01/2010"
    );
    userAction.setInput(ui.information.agreement16.engineerAge.get(), "38");
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("anciennete"),
    });
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "15/12/2022");
    userAction.setInput(ui.seniority.endDate.get(), "15/12/2022");
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("absences"),
    });
    userAction.click(ui.absences.arretTravail.non.get());
    userAction.click(ui.absences.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("salaires"),
    });
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: step("results"),
    });

    // Retours en arrière : même payload, action distincte.
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "click_previous_step",
      name: step("salaires"),
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "click_previous_step",
      name: step("absences"),
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "click_previous_step",
      name: step("anciennete"),
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "click_previous_step",
      name: step("infos"),
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "click_previous_step",
      name: step("info_cc"),
    });
  });

  test("vérifier le tracking sur la recherche entreprise", async () => {
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.agreement.unknownAgreement.get());
    userAction.setInput(ui.agreement.agreementCompanyInput.get(), "carrefour");
    await act(async () => {
      userAction.click(ui.agreement.agreementCompanySearchButton.get());
    });
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.carrefour.get());
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "search_enterprise",
      name: named({ context: SIMULATOR, query: "carrefour" }),
    });
  });

  test("vérifier le tracking sur la selection CC", async () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.agreement.agreement.get())
      .setInput(ui.agreement.agreementInput.get(), "16")
      .click(await waitFor(() => ui.agreement.ccChoice.transport.get()))
      .click(ui.next.get());

    // Parcours et sélection partagent désormais la catégorie de la page, là où
    // l'ancien schéma les séparait en `cc_search_type_of_users` et `cc_select_p1`.
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_path_p1",
      name: named({ context: SIMULATOR }),
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_p1",
      name: named({ context: SIMULATOR, idcc: 16 }),
    });

    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.unknownAgreement.get());
    userAction.setInput(ui.agreement.agreementCompanyInput.get(), "carrefour");
    await act(async () => {
      userAction.click(ui.agreement.agreementCompanySearchButton.get());
    });
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.carrefour.get());
    });
    userAction.click(ui.agreement.ccChoice.commerce.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_path_p2",
      name: named({ context: SIMULATOR }),
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_p2",
      name: named({ context: SIMULATOR, idcc: 2216 }),
    });

    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_path_p3",
      name: named({ context: SIMULATOR }),
    });
  });

  test("vérifier le tracking CC traités", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":16,"shortTitle":"Transports routiers et activités auxiliaires du transport"}`
    );
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_supported",
      name: named({ context: SIMULATOR, idcc: 16 }),
    });
  });

  test("vérifier le tracking CC non traités", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":1261,"shortTitle":"Acteurs du lien social et familial (centres sociaux et socioculturels, associations d'accueil de jeunes enfants, associations de développement social local)"}`
    );
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "select_agreement_unsupported",
      name: named({ context: SIMULATOR, idcc: 1261 }),
    });
  });
});
