import { render } from "@testing-library/react";
import React from "react";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

import { ContributionLayout } from "../ContributionLayout";
import {
  answerScopeDisclaimerText,
  getAnswerScopePilot,
  isAnswerScopePilotPath,
} from "../answerScopePilot";
import { Contribution } from "../type";
import { TrackingContributionCategory } from "../tracking";
import { useCcFunnelTracking } from "../tracking";

jest.mock("@socialgouv/matomo-next", () => ({ sendEvent: jest.fn() }));
jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));
jest.mock("uuid", () => ({ v4: jest.fn(() => "") }));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

const base = {
  source: "contributions",
  linkedContent: [],
  references: [],
  date: "05/12/2023",
  metas: { title: "t", description: "d" },
  breadcrumbs: [
    { label: "Thème", position: 1, slug: "/themes/theme" },
    { label: "Sous-thème", position: 2, slug: "/themes/sous-theme" },
  ],
  type: "content",
  content: "<p>contenu</p>",
  ccSupported: ["1518"],
  ccUnextended: [],
  relatedItems: [],
  isNoCdt: false,
};

const alternantsTitle = "Quel est le salaire minimum d'un alternant en 2026?";
const alternantsGeneric = {
  ...base,
  slug: "quel-est-le-salaire-minimum-dun-alternant-en-2026",
  title: alternantsTitle,
  idcc: "0000",
  isGeneric: true,
} as Partial<Contribution> as Contribution;
const alternants1518 = {
  ...base,
  slug: "1518-quel-est-le-salaire-minimum-dun-alternant-en-2026",
  title: alternantsTitle,
  idcc: "1518",
  ccnShortTitle: "Éducation, culture, loisirs et animation (ÉCLAT)",
  ccnSlug: "1518-eclat",
  isGeneric: false,
} as Partial<Contribution> as Contribution;
const alternants1486 = {
  ...alternants1518,
  slug: "1486-quel-est-le-salaire-minimum-dun-alternant-en-2026",
  idcc: "1486",
} as Partial<Contribution> as Contribution;
const autre = {
  ...alternantsGeneric,
  slug: "autre-contribution",
} as Partial<Contribution> as Contribution;

const jsonLdOf = (container: HTMLElement, id: string) =>
  JSON.parse(container.querySelector(`script#${id}`)?.textContent ?? "null");

describe("test « citation correcte de nos contributions » (#7493)", () => {
  beforeEach(() => {
    (sendEvent as jest.Mock).mockReset();
  });

  describe("getAnswerScopePilot()", () => {
    it("identifie les pages mère et fille pilotes", () => {
      expect(getAnswerScopePilot(alternantsGeneric)).toBeDefined();
      expect(getAnswerScopePilot(alternantsGeneric)?.idcc).toBeUndefined();
      expect(getAnswerScopePilot(alternants1518)?.idcc).toBe("1518");
    });
    it("ignore les autres CC et les autres contributions", () => {
      expect(getAnswerScopePilot(alternants1486)).toBeUndefined();
      expect(getAnswerScopePilot(autre)).toBeUndefined();
    });
  });

  describe("isAnswerScopePilotPath()", () => {
    it.each([
      "/contribution/quel-est-le-salaire-minimum-dun-alternant-en-2026",
      "contribution/1518-quel-est-le-salaire-minimum-dun-alternant-en-2026",
      "/contribution/les-conges-pour-evenements-familiaux",
      "/contribution/les-conges-pour-evenements-familiaux/3239-particuliers-employeurs-et-emploi-a-domicile",
      "/contribution/les-conges-pour-evenements-familiaux/3239",
    ])("%s est pilote", (path) => {
      expect(isAnswerScopePilotPath(path)).toBe(true);
    });
    it.each([
      "/contribution/1486-quel-est-le-salaire-minimum-dun-alternant-en-2026",
      "/contribution/les-conges-pour-evenements-familiaux/1486-bureaux-etudes",
      "/contribution/autre-contribution",
    ])("%s n'est pas pilote", (path) => {
      expect(isAnswerScopePilotPath(path)).toBe(false);
    });
  });

  describe("funnel de choix de CC", () => {
    it("émet sous cc_search_funnel_test sur une page pilote", () => {
      useCcFunnelTracking().emitViewBlocCc(
        "/contribution/quel-est-le-salaire-minimum-dun-alternant-en-2026"
      );
      expect(sendEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          category: TrackingContributionCategory.CC_SEARCH_FUNNEL_TEST,
        })
      );
    });
    it("émet sous cc_search_funnel ailleurs", () => {
      useCcFunnelTracking().emitViewBlocCc("/contribution/autre-contribution");
      expect(sendEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
        })
      );
    });
  });

  describe("page mère pilote", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue(
        `/contribution/${alternantsGeneric.slug}`
      );
    });
    it("affiche le disclaimer et la réponse sans masquage", () => {
      const { getByTestId, container } = render(
        <ContributionLayout contribution={alternantsGeneric} />
      );
      expect(getByTestId("answer-scope-disclaimer")).toHaveTextContent(
        /^Sauf dispositions conventionnelles plus favorables/
      );
      expect(container.querySelector("#cdt")).not.toHaveClass("fr-hidden");
    });
    it("émet un @graph Article + FAQPage mono-question", () => {
      const { container, getByRole, getByTestId } = render(
        <ContributionLayout contribution={alternantsGeneric} />
      );
      const jsonld = jsonLdOf(container, "jsonld-article");
      const [article, faq] = jsonld["@graph"];
      expect(article["@type"]).toBe("Article");
      expect(article.disambiguatingDescription).toContain("Code du travail");
      expect(faq["@type"]).toBe("FAQPage");
      expect(faq.mainEntity).toHaveLength(1);
      // Conformité Google : mots pour mots identiques au contenu visible.
      expect(faq.mainEntity[0].name).toBe(
        getByRole("heading", { level: 1 }).textContent
      );
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe(
        getByTestId("answer-scope-disclaimer").textContent
      );
      expect(container.querySelector("script#jsonld-legislation")).toBeNull();
    });
  });

  describe("page fille pilote", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue(
        `/contribution/${alternants1518.slug}`
      );
    });
    it("affiche le disclaimer avec un lien vers la réponse générique", () => {
      const { getByTestId } = render(
        <ContributionLayout
          contribution={alternants1518}
          genericInfos={{ ccSupported: ["1518"] } as any}
        />
      );
      const disclaimer = getByTestId("answer-scope-disclaimer");
      expect(disclaimer).toHaveTextContent(
        "Cette réponse s'applique aux entreprises relevant de la convention collective ÉCLAT (IDCC 1518)."
      );
      expect(disclaimer.querySelector("a")).toHaveAttribute(
        "href",
        `/contribution/${alternantsGeneric.slug}#cdt`
      );
    });
    it("émet @graph + Legislation et fait correspondre H1 et disclaimer", () => {
      const { container, getByRole, getByTestId } = render(
        <ContributionLayout
          contribution={alternants1518}
          genericInfos={{ ccSupported: ["1518"] } as any}
        />
      );
      const [, faq] = jsonLdOf(container, "jsonld-article")["@graph"];
      expect(faq.mainEntity[0].name).toBe(
        getByRole("heading", { level: 1 }).textContent
      );
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe(
        getByTestId("answer-scope-disclaimer").textContent
      );
      const legislation = jsonLdOf(container, "jsonld-legislation");
      expect(legislation["@type"]).toBe("Legislation");
      expect(legislation.identifier).toBe("IDCC 1518");
    });
  });

  describe("pages non pilotes", () => {
    it("restent inchangées : Article seul, sans disclaimer", () => {
      (usePathname as jest.Mock).mockReturnValue("/contribution/autre");
      const { container, queryByTestId } = render(
        <ContributionLayout contribution={autre} />
      );
      expect(queryByTestId("answer-scope-disclaimer")).toBeNull();
      const jsonld = jsonLdOf(container, "jsonld-article");
      expect(jsonld["@type"]).toBe("Article");
      expect(jsonld["@graph"]).toBeUndefined();
      expect(container.querySelector("#cdt")).toHaveClass("fr-hidden");
    });
  });

  it("answerScopeDisclaimerText() concatène les segments du disclaimer", () => {
    expect(
      answerScopeDisclaimerText({
        before: "a ",
        linkLabel: "b",
        linkHref: "/x",
        after: " c",
      })
    ).toBe("a b c");
  });
});
