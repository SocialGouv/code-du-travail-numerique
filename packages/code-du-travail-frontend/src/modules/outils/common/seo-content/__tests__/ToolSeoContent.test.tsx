import React from "react";
import { render, screen, within } from "@testing-library/react";

import { JSON_LD_IDS } from "../../../../seo/jsonld/builders";
import { splitReferences } from "../articles";
import { TOOL_SEO_CONTENT } from "../content";
import { toFaqAnswerHtml } from "../faq";
import { ToolSeoContent } from "../ToolSeoContent";
import { ToolSeoSlug } from "../types";

const SLUGS = Object.keys(TOOL_SEO_CONTENT) as ToolSeoSlug[];
const { sections } = TOOL_SEO_CONTENT["simulateur-embauche"];

describe("ToolSeoContent", () => {
  it.each(SLUGS)("has valid content for %s", (slug) => {
    const { sections, references } = TOOL_SEO_CONTENT[slug];
    expect(sections.length).toBeGreaterThan(0);
    const ids = sections.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    sections.forEach(({ id, title }) => {
      expect(id).toMatch(/^[a-z0-9-]+$/);
      expect(title).toMatch(/\?$/);
    });
    expect(splitReferences(references).some((p) => p.type === "article")).toBe(
      true
    );
  });

  it("renders every section as an anchored h2 listed in the summary", () => {
    render(<ToolSeoContent slug="simulateur-embauche" />);

    const region = screen.getByRole("region", { name: "En savoir plus" });
    const headings = within(region).getAllByRole("heading", { level: 2 });
    expect(headings.map((h) => h.textContent)).toEqual(
      sections.map(({ title }) => title)
    );
    headings.forEach((heading, index) =>
      expect(heading).toHaveAttribute("id", sections[index].id)
    );

    const summary = within(region).getByRole("navigation");
    sections.forEach(({ id, title }) =>
      expect(
        within(summary).getByRole("link", { name: title })
      ).toHaveAttribute("href", `#${id}`)
    );

    expect(within(region).getAllByRole("listitem").length).toBeGreaterThan(
      sections.length
    );
    expect(
      within(region).getByRole("link", { name: "L3243-2" })
    ).toHaveAttribute("href", "/code-du-travail/l3243-2");
  });

  it("renders a FAQPage JSON-LD with one question per h2", () => {
    render(<ToolSeoContent slug="simulateur-embauche" />);

    const script = document.querySelector(`script#${JSON_LD_IDS.toolFaq}`);
    const data = JSON.parse(script?.innerHTML ?? "{}");

    expect(data["@type"]).toBe("FAQPage");
    expect(data.url).toMatch(/\/outils\/simulateur-embauche$/);
    expect(data.mainEntity.map((q: { name: string }) => q.name)).toEqual(
      sections.map(({ title }) => title)
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

describe("toFaqAnswerHtml", () => {
  it.each(sections.map((section) => [section.id, section] as const))(
    "only uses tags allowed by Google for %s",
    (_, section) => {
      const html = toFaqAnswerHtml(section);
      const tags = Array.from(html.matchAll(/<\/?([a-z0-9]+)/g)).map(
        ([, tag]) => tag
      );

      expect(tags.length).toBeGreaterThan(0);
      tags.forEach((tag) => expect(["p", "ul", "li"]).toContain(tag));
    }
  );

  it("escapes HTML in the visible text", () => {
    expect(toFaqAnswerHtml({ id: "x", title: "x ?", text: "a < b & c" })).toBe(
      "<p>a &lt; b &amp; c</p>"
    );
  });
});
