import { render, waitFor } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import IndemniteLicenciementSimulator from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock(
  "../../../enterprise/EnterpriseAgreementSearch/EnterpriseAgreementSearchInput"
);
jest.mock(
  "../../../convention-collective/AgreementSearch/AgreementSearchInput"
);

describe("Indemnité licenciement - Tracking", () => {
  beforeEach(() => {
    render(
      <IndemniteLicenciementSimulator
        title={"Indemnité de licenciement"}
        displayTitle="Indemnité de licenciement"
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
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "contrat_travail",
    });
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "info_cc",
    });
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "infos",
    });
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
      action: `view_step_Indemnité de licenciement`,
      name: "anciennete",
    });
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "15/12/2022");
    userAction.setInput(ui.seniority.endDate.get(), "15/12/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "salaires",
    });
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "results",
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `click_previous_Indemnité de licenciement`,
      name: "salaires",
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `click_previous_Indemnité de licenciement`,
      name: "anciennete",
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `click_previous_Indemnité de licenciement`,
      name: "infos",
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `click_previous_Indemnité de licenciement`,
      name: "info_cc",
    });
    userAction.click(ui.previous.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `click_previous_Indemnité de licenciement`,
      name: "contrat_travail",
    });
  });

  test("vérifier le tracking sur la recherche entreprise", async () => {
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.agreement.unknownAgreement.get());
    userAction.setInput(ui.agreement.agreementCompanyInput.get(), "carrefour");
    userAction.click(ui.agreement.agreementCompanySearchButton.get());
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.carrefour.get());
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "enterprise_search",
      action: "Indemnité de licenciement",
      name: JSON.stringify({ query: "carrefour" }),
    });
  });

  test("vérifier le tracking sur la recherche CC", async () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.agreement.agreement.get())
      .setInput(ui.agreement.agreementInput.get(), "16")
      .click(await waitFor(() => ui.agreement.ccChoice.transport.get()));

    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_search",
      action: "Indemnité de licenciement",
      name: JSON.stringify({ query: "16" }),
    });
  });

  test("vérifier le tracking sur la selection CC", async () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.agreement.agreement.get())
      .setInput(ui.agreement.agreementInput.get(), "16")
      .click(await waitFor(() => ui.agreement.ccChoice.transport.get()))
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_search_type_of_users",
      action: "click_p1",
      name: "Indemnité de licenciement",
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_select_p1",
      action: "Indemnité de licenciement",
      name: "idcc16",
    });
    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.unknownAgreement.get());
    userAction.setInput(ui.agreement.agreementCompanyInput.get(), "carrefour");
    userAction.click(ui.agreement.agreementCompanySearchButton.get());
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.carrefour.get());
    });
    userAction.click(ui.agreement.ccChoice.commerce.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_search_type_of_users",
      action: "click_p2",
      name: "Indemnité de licenciement",
    });
    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_select_p2",
      action: "Indemnité de licenciement",
      name: "idcc2216",
    });
    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "cc_search_type_of_users",
      action: "click_p3",
      name: "Indemnité de licenciement",
    });
  });

  test("vérifier le tracking CC traités", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":16,"shortTitle":"Transports routiers et activités auxiliaires du transport"}`
    );
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "cc_select_traitée",
      name: "16",
    });
  });

  test("vérifier le tracking CC non traités", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":1261,"shortTitle":"Acteurs du lien social et familial (centres sociaux et socioculturels, associations d'accueil de jeunes enfants, associations de développement social local)"}`
    );
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "cc_select_non_traitée",
      name: "1261",
    });
  });

  test("vérifier qu'on a un event ineligible sur la recherche entreprise", async () => {
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdd.get());
    userAction.click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: `view_step_Indemnité de licenciement`,
      name: "results_ineligible",
    });
  });
});
