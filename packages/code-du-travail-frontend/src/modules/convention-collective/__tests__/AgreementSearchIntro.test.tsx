import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { ui } from "./ui";
import { UserAction } from "src/modules/outils/common/utils/UserAction";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { AgreementSearchIntro } from "../AgreementSearch";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => {}),
}));

// L'outil « Trouver sa convention collective » vit sur
// /outils/convention-collective : la catégorie de ses events est donc `outil`,
// comme celle d'un simulateur.
const PAGE = "/outils/convention-collective";
const PATH = "outils/convention-collective";

describe("Trouver sa CC - intro", () => {
  let userAction: UserAction;
  beforeEach(() => {
    jest.resetAllMocks();
    (usePathname as jest.Mock).mockReturnValue(PAGE);
  });
  it("Vérifier le tracking à l'arrivée", async () => {
    render(<AgreementSearchIntro />);
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "outil",
      action: "view_step",
      name: `{"path":"${PATH}","simulator":"Trouver sa convention collective","step":"start"}`,
    });
  });
  it("Vérifier le tracking vers recherche CC", async () => {
    render(<AgreementSearchIntro />);
    userAction = new UserAction();
    userAction.click(ui.searchAgreementIntro.buttonSearchAgreement.get());
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "outil",
      action: "select_agreement_path_p1",
      name: `{"path":"${PATH}"}`,
    });
  });

  it("Vérifier le tracking vers recherche entreprise", async () => {
    render(<AgreementSearchIntro />);
    userAction = new UserAction();
    userAction.click(ui.searchAgreementIntro.buttonSearchEnterprise.get());
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "outil",
      action: "select_agreement_path_p2",
      name: `{"path":"${PATH}"}`,
    });
  });
});
