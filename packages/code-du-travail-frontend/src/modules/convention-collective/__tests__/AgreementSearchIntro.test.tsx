import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { ui } from "./ui";
import { UserAction } from "src/common";
import { sendEvent } from "../../utils";
import { AgreementSearchIntro } from "../AgreementSearch";

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => {}),
}));

describe("Trouver sa CC - intro", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("Vérifier le tracking à l'arrivée", async () => {
    rendering = render(<AgreementSearchIntro />);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "view_step_Trouver sa convention collective",
      category: "outil",
      name: "start",
    });
  });
  it("Vérifier le tracking vers recherche CC", async () => {
    rendering = render(<AgreementSearchIntro />);
    userAction = new UserAction();
    userAction.click(ui.searchAgreementIntro.buttonSearchAgreement.get());
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_p1",
      category: "cc_search_type_of_users",
      name: "Trouver sa convention collective",
    });
  });

  it("Vérifier le tracking vers recherche entreprise", async () => {
    rendering = render(<AgreementSearchIntro />);
    userAction = new UserAction();
    userAction.click(ui.searchAgreementIntro.buttonSearchEnterprise.get());
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_p2",
      category: "cc_search_type_of_users",
      name: "Trouver sa convention collective",
    });
  });
});
