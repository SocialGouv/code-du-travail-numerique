import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

import { JSON_LD_IDS } from "../../../../seo/jsonld/builders";
import { splitReferences } from "../articles";
import { TOOL_SEO_CONTENT } from "../content";
import { toFaqAnswerHtml } from "../faq";
import { ToolSeoContent } from "../ToolSeoContent";
import { ToolSeoSlug } from "../types";

const SLUGS = Object.keys(TOOL_SEO_CONTENT) as ToolSeoSlug[];

const mockViewport = (isMobile: boolean) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: isMobile,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

describe("ToolSeoContent", () => {
  beforeEach(() => mockViewport(false));

  it("has content for every tool", () => {
    expect(SLUGS.sort()).toEqual(
      [
        "convention-collective",
        "indemnite-precarite",
        "indemnite-retraite",
        "indemnite-rupture-conventionnelle",
        "preavis-demission",
        "preavis-licenciement",
        "preavis-retraite",
        "simulateur-embauche",
      ].sort()
    );
    SLUGS.forEach((slug) => {
      const { title, blocks, references } = TOOL_SEO_CONTENT[slug];
      expect(title).not.toBe("");
      expect(blocks.length).toBeGreaterThan(0);
      expect(
        splitReferences(references).some((p) => p.type === "article")
      ).toBe(true);
    });
  });

  it("renders an accessible section with heading, lists and article links", () => {
    render(<ToolSeoContent slug="indemnite-rupture-conventionnelle" />);

    const section = screen.getByRole("region", {
      name: "Quel est le montant minimum de l'indemnité de rupture conventionnelle ?",
    });
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Quel est le montant minimum de l'indemnité de rupture conventionnelle ?",
      })
    ).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", { level: 2, name: "La règle" })
    ).toBeInTheDocument();
    expect(within(section).getAllByRole("listitem")).toHaveLength(2);
    expect(
      within(section).getByRole("link", { name: "L1237-11" })
    ).toHaveAttribute("href", "/code-du-travail/l1237-11");
    expect(
      within(section).getByRole("link", { name: "R1234-4" })
    ).toHaveAttribute("href", "/code-du-travail/r1234-4");
  });

  it("renders a FAQPage JSON-LD matching the visible heading", () => {
    render(<ToolSeoContent slug="preavis-demission" />);

    const script = document.querySelector(`script#${JSON_LD_IDS.toolFaq}`);
    const data = JSON.parse(script?.innerHTML ?? "{}");

    expect(data["@type"]).toBe("FAQPage");
    expect(data.url).toMatch(/\/outils\/preavis-demission$/);
    expect(data.mainEntity[0].name).toBe(
      TOOL_SEO_CONTENT["preavis-demission"].title
    );
  });
});

describe("splitReferences", () => {
  it("links each article of a range", () => {
    expect(splitReferences("articles L1237-11 à L1237-16 du Code")).toEqual([
      { type: "text", value: "articles " },
      {
        type: "article",
        value: "L1237-11",
        href: "/code-du-travail/l1237-11",
      },
      { type: "text", value: " à " },
      {
        type: "article",
        value: "L1237-16",
        href: "/code-du-travail/l1237-16",
      },
      { type: "text", value: " du Code" },
    ]);
  });
});

describe("ToolSeoContent on mobile", () => {
  it("is fully displayed on desktop, without toggle", () => {
    mockViewport(false);
    render(<ToolSeoContent slug="indemnite-rupture-conventionnelle" />);

    expect(screen.getByTestId("tool-seo-content-body")).not.toHaveAttribute(
      "inert"
    );
    expect(
      screen.queryByRole("button", { name: "Lire la suite" })
    ).not.toBeInTheDocument();
  });

  it("collapses the text behind a toggle on mobile", () => {
    mockViewport(true);
    render(<ToolSeoContent slug="indemnite-rupture-conventionnelle" />);

    const body = screen.getByTestId("tool-seo-content-body");
    const toggle = screen.getByRole("button", { name: "Lire la suite" });
    expect(body).toHaveAttribute("inert");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", body.id);

    fireEvent.click(toggle);

    expect(body).not.toHaveAttribute("inert");
    expect(screen.getByRole("button", { name: "Réduire" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});

describe("toFaqAnswerHtml", () => {
  it.each(SLUGS)("only uses tags allowed by Google for %s", (slug) => {
    const html = toFaqAnswerHtml(TOOL_SEO_CONTENT[slug]);
    const tags = Array.from(html.matchAll(/<\/?([a-z0-9]+)/g)).map(
      ([, tag]) => tag
    );

    expect(tags.length).toBeGreaterThan(0);
    tags.forEach((tag) =>
      expect(["p", "strong", "ul", "li", "a"]).toContain(tag)
    );
  });
});
