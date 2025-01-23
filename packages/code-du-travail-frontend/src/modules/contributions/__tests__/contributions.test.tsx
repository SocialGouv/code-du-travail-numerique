import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { wait } from "@testing-library/user-event/dist/utils";

import { ContributionLayout } from "../ContributionLayout";
import { ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { ui as entrepriseUi } from "../../enterprise/EnterpriseAgreementSearch/__tests__/ui";
import { Contribution } from "../type";
import { searchAgreement } from "../../convention-collective/search";
import { sendEvent } from "../../utils";

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "0000",
  date: "05/12/2023",
  metas: {
    title: "SEO Title",
    description: "SEO Description",
  },
  title: "La période d’essai peut-elle être renouvelée ?",
  breadcrumbs: [],
  slug: "slug",
  type: "content",
  content: "my content",
  isGeneric: true,
  isNoCdt: false,
  ccSupported: ["0016", "3239"],
  ccUnextended: ["0029"],
  messageBlockGenericNoCDT: "message No CDT",
} as Partial<Contribution> as any;

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

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

describe("<ContributionLayout />", () => {
  let rendering: RenderResult;
  it("should render title only if generic", () => {
    rendering = render(<ContributionLayout contribution={contribution} />);
    const titreH1 = rendering.getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
    expect(
      rendering.getByText("Mis à jour le : 05/12/2023")
    ).toBeInTheDocument();
  });
  it("should render title with cc short name if contribution with CC", () => {
    rendering = render(
      <ContributionLayout
        contribution={{
          ...contribution,
          idcc: "0029",
          isGeneric: false,
          ccnSlug: "cc-slug",
          ccnShortTitle: "Nom de la CC",
        }}
      />
    );
    const titreH1 = rendering.getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ? Nom de la CC"
    );
    expect(
      rendering.getByText("Mis à jour le : 05/12/2023")
    ).toBeInTheDocument();
    const ccLink = rendering.getByRole("link", { name: "Nom de la CC" });
    expect(ccLink).toHaveAttribute("href", "/convention-collective/cc-slug");
  });
  describe("base", () => {
    beforeEach(async () => {
      window.localStorage.clear();
      rendering = render(<ContributionLayout contribution={contribution} />);
    });
    it("should display correctly when no agreement is selected", async () => {
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ccUi.buttonDisplayInfo.query()).toBeInTheDocument();
      expect(ui.generic.linkDisplayInfo.query()).toBeInTheDocument();
      expect(ui.generic.title.query()).toBeInTheDocument();
      expect(rendering.getByText("my content")).toBeInTheDocument();
      fireEvent.click(ui.generic.linkDisplayInfo.get());
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
      expect(rendering.getByText("my content")).toBeInTheDocument();
    });

    it("should display correctly when a treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ui.generic.linkDisplayInfo.query()).toBeInTheDocument();
      fireEvent.change(ccUi.searchByName.input.get(), {
        target: { value: "16" },
      });
      await wait();
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC16.button.get());
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).toHaveAttribute(
        "href",
        "/contribution/16-slug"
      );
      expect(ccUi.warning.nonTreatedAgreement.query()).not.toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "0016",
      });
    });

    it("should display correctly when a selecting agreement 3239", async () => {
      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      fireEvent.click(ccUi.searchByEnterprise.noEnterprise.get());
      expect(ccUi.buttonDisplayInfo.query()).toHaveAttribute(
        "href",
        "/contribution/3239-slug"
      );
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "3239",
      });
    });

    it("should display correctly when a non-treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 1388,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635267",
            effectif: 31273,
            shortTitle: "Industrie du pétrole",
            cdtnId: "8c50f32b7d",
            id: "1388",
            slug: "1388-industrie-du-petrole",
            title:
              "Convention collective nationale deo l'industrie du pétrole du 3 septembre 1985.  Etendue par arrêté du 31 juillet 1986 JORF 9 août 1986.",
            contributions: false,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      fireEvent.change(ccUi.searchByName.input.get(), {
        target: { value: "1388" },
      });
      await wait();
      fireEvent.click(
        ccUi.searchByName.autocompleteLines.IDCC1388.button.get()
      );
      expect(ui.generic.linkDisplayInfo.query()).toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).toHaveAttribute("href", "");
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.nonTreatedAgreement.query()).toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_non_traitée",
        category: "outil",
        name: "1388",
      });
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      fireEvent.click(ui.generic.linkDisplayInfo.get());
      expect(ui.generic.nonTreatedInfo.query()).toBeInTheDocument();
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
    });
  });

  describe("no CDT", () => {
    beforeEach(() => {
      window.localStorage.clear();
      rendering = render(
        <ContributionLayout contribution={{ ...contribution, isNoCDT: true }} />
      );
    });
    it("should display correctly when no agreement is selected", () => {
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ui.generic.noCdtDescription.query()).toBeInTheDocument();
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
    });

    it("should display correctly when a treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      fireEvent.change(ccUi.searchByName.input.get(), {
        target: { value: "16" },
      });
      await wait();
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC16.button.get());
      expect(ccUi.buttonDisplayInfo.query()).toHaveAttribute(
        "href",
        "/contribution/16-slug"
      );
      expect(ccUi.warning.nonTreatedAgreement.query()).not.toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "0016",
      });
    });

    it("should display correctly when a non-treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 1388,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635267",
            effectif: 31273,
            shortTitle: "Industrie du pétrole",
            cdtnId: "8c50f32b7d",
            id: "1388",
            slug: "1388-industrie-du-petrole",
            title:
              "Convention collective nationale deo l'industrie du pétrole du 3 septembre 1985.  Etendue par arrêté du 31 juillet 1986 JORF 9 août 1986.",
            contributions: false,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      fireEvent.change(ccUi.searchByName.input.get(), {
        target: { value: "1388" },
      });
      await wait();
      fireEvent.click(
        ccUi.searchByName.autocompleteLines.IDCC1388.button.get()
      );
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.noCdtNonTreatedAgreement.query()).toBeInTheDocument();
      expect(
        rendering.getByText(new RegExp(contribution.messageBlockGenericNoCDT))
      ).toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_non_traitée",
        category: "outil",
        name: "1388",
      });
    });

    it("should display correctly when a unextended agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 29,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635234",
            effectif: 1,
            shortTitle:
              "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
            cdtnId: "394e29a64d",
            id: "0029",
            slug: "29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d",
            title:
              "Convention collective nationale des etablissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 octobre 1951.",
            contributions: true,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      fireEvent.change(ccUi.searchByName.input.get(), {
        target: { value: "29" },
      });
      await wait();
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC29.button.get());
      expect(ui.generic.linkDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.noCdtUnextendedAgreement.query()).toBeInTheDocument();
    });
  });
});
