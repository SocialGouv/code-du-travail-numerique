import { render, waitFor } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../index";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { push } from "@socialgouv/matomo-next";
import { UserAction } from "../../../common";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));
jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Indemnité licenciement - Tracking", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={"Indemnité de licenciement"}
        displayTitle={"Indemnité de licenciement"}
      />
    );
  });
  const userAction = new UserAction();

  test("vérifier le tracking sur la navigation", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":16,"shortTitle":"Transports routiers et activités auxiliaires du transport"}`
    );
    userAction.click(ui.introduction.startButton.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "contrat_travail",
    ]);
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "info_cc",
    ]);
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "infos",
    ]);
    userAction.changeInputList(
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
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "anciennete",
    ]);
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "15/12/2022");
    userAction.setInput(ui.seniority.endDate.get(), "15/12/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "salaires",
    ]);
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "results",
    ]);
    userAction.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "salaires",
    ]);
    userAction.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "anciennete",
    ]);
    userAction.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "infos",
    ]);
    userAction.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "info_cc",
    ]);
    userAction.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "contrat_travail",
    ]);
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
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "enterprise_search",
      "Indemnité de licenciement",
      JSON.stringify({ query: "carrefour" }),
    ]);
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

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search",
      "Indemnité de licenciement",
      JSON.stringify({ query: "16" }),
    ]);
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

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search_type_of_users",
      "click_p1",
      "Indemnité de licenciement",
    ]);
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_select_p1",
      "Indemnité de licenciement",
      "idcc16",
    ]);
    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.unknownAgreement.get());
    userAction.setInput(ui.agreement.agreementCompanyInput.get(), "carrefour");
    userAction.click(ui.agreement.agreementCompanySearchButton.get());
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.carrefour.get());
    });
    userAction.click(ui.agreement.ccChoice.commerce.get());
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search_type_of_users",
      "click_p2",
      "Indemnité de licenciement",
    ]);
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_select_p2",
      "Indemnité de licenciement",
      "idcc2216",
    ]);
    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search_type_of_users",
      "click_p3",
      "Indemnité de licenciement",
    ]);
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
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "cc_select_traitée",
      16,
    ]);
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
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "cc_select_non_traitée",
      1261,
    ]);
  });

  test("vérifier qu'on a un event ineligible sur la recherche entreprise", async () => {
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdd.get());
    userAction.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "results_ineligible",
    ]);
  });
});
