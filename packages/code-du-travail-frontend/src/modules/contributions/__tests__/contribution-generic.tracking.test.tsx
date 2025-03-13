import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { sendEvent } from "../../utils";
import { mockAgreementSearch, ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { byText } from "testing-library-selector";
import { ContributionGeneric } from "../ContributionGeneric";
import { Contribution } from "../type";
import { searchEnterprises } from "../../enterprise/queries";

beforeEach(() => {
  localStorage.clear();
});

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));
jest.mock("../../enterprise/queries", () => ({
  searchEnterprises: jest.fn(),
}));

describe("<ContributionGeneric />", () => {
  beforeEach(() => {
    const ma = sendEvent as jest.MockedFunction<typeof sendEvent>;
    ma.mockReset();
  });
  const contribution = {
    date: "05/12/2023",
    isGeneric: true,
    isNoCdt: false,
    messageBlockGenericNoCDT: "message No CDT",
    ccSupported: ["1388"],
    ccUnextended: [],
    type: "content",
    content: "<p>hello <strong>generic</strong></p>",
    source: "contributions",
    linkedContent: [],
    references: [],
    idcc: "0000",
    title: "Ma contrib",
    slug: "my-contrib",
    breadcrumbs: [],
    metas: {
      title: "SEO Title",
      description: "SEO Description",
    },
  } as Partial<Contribution> as any;

  (searchEnterprises as jest.Mock).mockImplementation(() =>
    Promise.resolve([
      {
        label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        siren: "345130488",
        address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
        conventions: [
          {
            id: "2216",
            contributions: true,
            num: 2216,
            shortTitle:
              "Commerce de détail et de gros à prédominance alimentaire",
          },
        ],
      },
    ])
  );
  it("je connais ma CC - cc traité", async () => {
    mockAgreementSearch({
      num: 1388,
      shortTitle: "Industrie du pétrole",
      id: "1388",
    });
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
    fireEvent.click(ccUi.radio.agreementSearchOption.get());
    fireEvent.change(ccUi.searchByName.input.get(), {
      target: { value: "1388" },
    });
    await waitFor(() =>
      expect(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
      ).toBeInTheDocument()
    );
    fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC1388.name.get());
    expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(4);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_search",
          name: '{"query":"1388"}',
          value: "",
        },
      ],
      [
        {
          action: "click_p1",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_traitée",
          category: "outil",
          name: "1388",
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_select_p1",
          name: "idcc1388",
          value: "",
        },
      ],
    ]);
    expect(ui.generic.buttonDisplayInfo.get()).toHaveAttribute(
      "href",
      "/contribution/1388-my-contrib"
    );
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(5);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_afficher_les_informations_CC",
      category: "contribution",
      name: "/contribution/my-contrib",
    });
  });

  it("je connais ma CC - cc non traité", async () => {
    mockAgreementSearch({
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      id: "0016",
    });
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
    fireEvent.click(ccUi.radio.agreementSearchOption.get());
    fireEvent.change(ccUi.searchByName.input.get(), {
      target: { value: "16" },
    });
    await waitFor(() =>
      expect(
        byText(
          /Transports routiers et activités auxiliaires du transport/
        ).query()
      ).toBeInTheDocument()
    );
    fireEvent.click(
      byText(/Transports routiers et activités auxiliaires du transport/).get()
    );
    expect(ccUi.buttonDisplayInfo.query()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(4);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_search",
          name: '{"query":"16"}',
          value: "",
        },
      ],
      [
        {
          action: "click_p1",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_non_traitée",
          category: "outil",
          name: "16",
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_select_p1",
          name: "idcc0016",
          value: "",
        },
      ],
    ]);
    fireEvent.click(ccUi.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(5);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_afficher_les_informations_générales",
      category: "contribution",
      name: "/contribution/my-contrib",
    });
  });

  it("je ne connais pas ma CC", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
    fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
    fireEvent.change(ccUi.searchByEnterprise.input.get(), {
      target: { value: "carrefour" },
    });
    fireEvent.click(ccUi.searchByEnterprise.submitButton.get());
    await waitFor(() => {
      fireEvent.click(
        ccUi.searchByEnterprise.resultLines.carrefour.title.get()
      );
    });
    expect(
      byText(/Vous avez sélectionné la convention collective/).query()
    ).toBeInTheDocument();

    expect(sendEvent).toHaveBeenCalledTimes(5);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          action: "/contribution/my-contrib",
          category: "enterprise_search",
          name: '{"query":"carrefour"}',
          value: "",
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_select_p2",
          name: "idcc2216",
          value: "",
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "enterprise_select",
          name: '{"label":"CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)","siren":"345130488"}',
          value: "",
        },
      ],
      [
        {
          action: "click_p2",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_non_traitée",
          category: "outil",
          name: "2216",
        },
      ],
    ]);
  });
  it("afficher les infos - sans CC", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
    expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_afficher_les_informations_sans_CC",
      category: "contribution",
      name: "/contribution/my-contrib",
    });
  });

  it("voir les infos générales", () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);

    fireEvent.click(ui.generic.linkDisplayInfo.get());

    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenCalledWith({
      action: "click_p3",
      category: "cc_search_type_of_users",
      name: "/contribution/my-contrib",
    });
  });
});
