import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../../../../src/outils";
import { ui } from "./ui";
import { push } from "@socialgouv/matomo-next";
import userEvent from "@testing-library/user-event";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));
jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Indemnité licenciement - Tracking", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
  });
  test("vérifier le tracking sur la navigation", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":16,"shortTitle":"Transports routiers et activités auxiliaires du transport"}`
    );
    fireEvent.click(ui.introduction.startButton.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "start",
    ]);
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "contrat_travail",
    ]);
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "info_cc",
    ]);
    userEvent.selectOptions(
      ui.information.agreement16.proCategory.get(),
      "Ingénieurs et cadres"
    );
    fireEvent.click(ui.information.agreement16.proCategoryHasChanged.oui.get());
    fireEvent.change(ui.information.agreement16.dateProCategoryChanged.get(), {
      target: { value: "01/01/2010" },
    });
    fireEvent.change(ui.information.agreement16.engineerAge.get(), {
      target: { value: "38" },
    });
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "infos",
    ]);
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/12/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/12/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "anciennete",
    ]);
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `view_step_Indemnité de licenciement`,
      "salaires",
    ]);
    fireEvent.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "salaires",
    ]);
    fireEvent.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "anciennete",
    ]);
    fireEvent.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "infos",
    ]);
    fireEvent.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "info_cc",
    ]);
    fireEvent.click(ui.previous.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      `click_previous_Indemnité de licenciement`,
      "contrat_travail",
    ]);
  });

  test("vérifier le tracking sur la recherche entreprise", async () => {
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.agreement.unknownAgreement.get());
    fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
      target: { value: "carrefour" },
    });
    await waitFor(() => {
      fireEvent.click(ui.agreement.searchItem.carrefour.get());
    });
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "enterprise_search",
      "Indemnité de licenciement",
      JSON.stringify({ address: "", query: "carrefour" }),
    ]);
  });

  test("vérifier le tracking sur la recherche CC", async () => {
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.agreement.noAgreement.get());
    fireEvent.click(ui.agreement.agreement.get());
    fireEvent.change(ui.agreement.agreementInput.get(), {
      target: { value: "16" },
    });
    await waitFor(() =>
      fireEvent.click(ui.agreement.searchItem.agreement16.get())
    );
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search",
      "Indemnité de licenciement",
      JSON.stringify({ query: "16" }),
    ]);
  });

  test("vérifier le tracking sur la selection CC", async () => {
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.agreement.noAgreement.get());
    fireEvent.click(ui.agreement.agreement.get());
    fireEvent.change(ui.agreement.agreementInput.get(), {
      target: { value: "16" },
    });
    await waitFor(() =>
      fireEvent.click(ui.agreement.searchItem.agreement16.get())
    );
    fireEvent.click(ui.next.get());
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
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.agreement.unknownAgreement.get());
    fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
      target: { value: "carrefour" },
    });
    await waitFor(() => {
      fireEvent.click(ui.agreement.searchItem.carrefour.get());
    });
    fireEvent.click(ui.agreement.ccChoice.commerce.get());
    fireEvent.click(ui.next.get());
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
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.agreement.noAgreement.get());
    fireEvent.click(ui.next.get());
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
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "cc_select_traitée",
      "idcc16",
    ]);
  });

  test("vérifier le tracking CC non traités", () => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn(
      () =>
        `{"num":1261,"shortTitle":"Acteurs du lien social et familial (centres sociaux et socioculturels, associations d'accueil de jeunes enfants, associations de développement social local)"}`
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "cc_select_non_traitée",
      "idcc1261",
    ]);
  });
});
