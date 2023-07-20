import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import ContributionGeneric from "../ContributionGeneric";
import { push as matopush } from "@socialgouv/matomo-next";
import { ui } from "../../outils/DureePreavisDemission/__tests__/ui";
import { byTestId, byText } from "testing-library-selector";

beforeEach(() => {
  localStorage.clear();
});
jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));
jest.mock("../../conventions/Search/api/agreements.service");
jest.mock("../../conventions/Search/api/enterprises.service");

describe("<ContributionGeneric />", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });
  const ANSWERS = {
    conventions: [
      {
        id: 123,
        idcc: "0044",
        markdown: "hello **123**",
      },
    ],
    generic: { markdown: "hello **generic**" },
  };
  it("je connais ma CC", async () => {
    expect(matopush).toHaveBeenCalledTimes(0);

    const { container } = render(
      <ContributionGeneric slug="/hello" answers={ANSWERS} content={{}} />
    );
    fireEvent.click(ui.agreement.agreement.get());
    fireEvent.focus(ui.agreement.agreementInput.get());
    fireEvent.change(ui.agreement.agreementInput.get(), {
      target: { value: "1351" },
    });
    await waitFor(() =>
      expect(ui.agreement1351.searchResult.query()).toBeInTheDocument()
    );
    fireEvent.click(ui.agreement1351.searchResult.get());
    expect(byText(/Afficher les informations/).get()).toBeInTheDocument();
    expect(matopush).toHaveBeenCalledTimes(4);
    // @ts-ignore
    expect(matopush.mock.calls).toEqual([
      [["trackEvent", "cc_search", undefined, '{"query":"1351"}']],
      [["trackEvent", "cc_search_type_of_users", "click_p1", undefined]],
      [["trackEvent", "cc_select_p1", undefined, "idcc1351"]],
      [["trackEvent", "outil", "cc_select_non_traitée", 1351]],
    ]);
  });

  it("je ne connais pas ma CC", async () => {
    expect(matopush).toHaveBeenCalledTimes(0);

    const { container } = render(
      <ContributionGeneric slug="/hello" answers={ANSWERS} content={{}} />
    );
    fireEvent.click(ui.agreement.unknownAgreement.get());
    fireEvent.focus(ui.agreement.agreementCompanyInput.get());
    fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
      target: { value: "carrefour" },
    });
    fireEvent.click(byTestId("agreement-company-search-button").get());
    await waitFor(() => {
      fireEvent.click(byText("CARREFOUR HYPERMARCHES").get());
    });
    expect(
      ui.agreement.agreementCompanyInputConfirm.query()
    ).toBeInTheDocument();
    fireEvent.click(
      byText(
        "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
      ).get()
    );
    expect(matopush).toHaveBeenCalledTimes(5);
    // @ts-ignore
    expect(matopush.mock.calls).toEqual([
      [
        [
          "trackEvent",
          "enterprise_search",
          undefined,
          '{"address":"","query":"carrefour"}',
        ],
      ],
      [["trackEvent", "cc_search_type_of_users", "click_p2", undefined]],
      [
        [
          "trackEvent",
          "enterprise_select",
          undefined,
          '{"label":"CARREFOUR HYPERMARCHES CARREOUR","siren":"451321335"}',
        ],
      ],
      [["trackEvent", "cc_select_p2", undefined, "idcc2216"]],
      [["trackEvent", "outil", "cc_select_non_traitée", 2216]],
    ]);
  });

  it("voir les infos générales", () => {
    expect(matopush).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric slug="/hello" answers={ANSWERS} content={{}} />
    );

    fireEvent.click(
      byText(
        "Accéder aux informations générales sans renseigner ma convention collective"
      ).get()
    );

    expect(matopush).toHaveBeenCalledTimes(1);
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "cc_search_type_of_users",
      "click_p3",
    ]);
  });
});
