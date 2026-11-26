import React from "react";
import { render, screen, within } from "@testing-library/react";

import { JSON_LD_IDS } from "../../../../seo/jsonld/builders";
import { ARTICLE_REGEX } from "../articles";
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
    expect(references.length).toBeGreaterThan(0);
    references.forEach((article) => expect(article).toMatch(ARTICLE_REGEX));
  });

  it("renders every section as an anchored h2 listed in the summary", () => {
    render(<ToolSeoContent slug="simulateur-embauche" />);

    const region = screen.getByRole("region", { name: "En savoir plus" });
    // The first h2 is the summary title, as on the other content pages.
    const [summaryTitle, ...headings] = within(region).getAllByRole("heading", {
      level: 2,
    });
    expect(summaryTitle).toHaveTextContent("Sommaire");
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
  });

  it("lists the references in an accordion, as on the contribution pages", () => {
    render(<ToolSeoContent slug="simulateur-embauche" />);

    const region = screen.getByRole("region", { name: "En savoir plus" });
    const toggle = within(region).getByRole("button", { name: "Références" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      within(region).getByRole("heading", { level: 3, name: "Références" })
    ).toBeInTheDocument();
    expect(
      within(region).getByRole("link", {
        name: "Article R3243-1",
        hidden: true,
      })
    ).toHaveAttribute("href", "/code-du-travail/r3243-1");
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
    expect(
      toFaqAnswerHtml({ id: "x", title: "x ?", paragraphs: ["a < b & c"] })
    ).toBe("<p>a &lt; b &amp; c</p>");
  });
});
