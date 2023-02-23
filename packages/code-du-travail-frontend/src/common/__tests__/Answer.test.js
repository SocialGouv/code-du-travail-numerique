import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-types";
import { render } from "@testing-library/react";
import Router from "next/router";
import React from "react";

import Answer from "../Answer";

function renderAnswer(props) {
  return render(
    <Answer
      title="Article du code"
      intro="intro de l'article"
      html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
      footer="pied de page"
      date="03/11/1979"
      source={{ name: "social groove" }}
      {...props}
    >
      <div>Contenu supplémentaire</div>
    </Answer>
  );
}
describe("<Answer />", () => {
  it("should renders", () => {
    const { container } = renderAnswer();
    expect(container).toMatchSnapshot();
  });
  it("should renders a breadcrumbs", () => {
    const { container } = renderAnswer({
      breadcrumbs: [
        { label: "tag1", slug: "/themes/tag-1" },
        { label: "tag2", slug: "/themes/tag-2" },
      ],
    });
    expect(container).toMatchSnapshot();
  });
  it("should renders tooltip", () => {
    const { container } = renderAnswer({
      html: "<p class='test-content'>Contenu au format <strong>html</strong> contenant des tooltip sur certains mot comme rescrit. match aussi les abbréviation comme APE mais pas ape ou ses variantes comme code ape</p>",
    });
    expect(container).toMatchSnapshot();
  });

  it("should renders tooltip for words with diacritics without breaking html", () => {
    const { container } = renderAnswer({
      html: "<p class='test-content'>Contenu au format <strong>indemnités</strong>comme code ape</p>",
    });
    expect(container).toMatchSnapshot();
  });
  it("should renders tooltip without breaking previous word", () => {
    const { container } = renderAnswer({
      html: "<p class='test-content'>annualisation du temps de travail. Annualisation de l'annualisation.</p>",
    });
    expect(container).toMatchSnapshot();
  });
  it("should renders tooltip without breaking a tag", () => {
    const { container } = renderAnswer({
      html: `<p class='test-content'><a href="emploi/accompagnement-des-mutations-economiques/csp" class="spip_in">le contrat de sécurisation professionnelle APE</a></p>`,
    });
    expect(container).toMatchSnapshot();
  });

  it("should renders related content", () => {
    const SLUG_LINK_BASE = "LINK_";
    const SLUG_TOOL_BASE = "TOOL_";
    const SLUG_LETTER_BASE = "LETTER_";
    const EXTERNAL_URL = "url.extrenal/tool";
    const { container } = renderAnswer({
      html: "<p class='test-content'>annualisation du temps de travail. Annualisation de l'annualisation.</p>",
      relatedItems: [
        {
          slug: `${SLUG_LINK_BASE}1`,
          source: SOURCES.SHEET_SP,
          title: "related sheet sp title 1",
        },
        {
          slug: `${SLUG_LINK_BASE}2`,
          source: SOURCES.SHEET_MT,
          title: "related sheet mt title 1",
        },
        {
          action: "extern action",
          icon: "Contract",
          source: SOURCES.EXTERNALS,
          title: "related external title 1",
          url: "url.extrenal/tool",
        },
        {
          slug: `${SLUG_LINK_BASE}4`,
          source: SOURCES.SHEET_SP,
          title: "related sheet sp title 2",
        },
        {
          action: "tools action",
          icon: "Depart",
          slug: `${SLUG_TOOL_BASE}1`,
          source: SOURCES.TOOLS,
          title: "related tool title 1",
        },
        {
          action: "tools action 2",
          icon: "Depart",
          slug: `${SLUG_TOOL_BASE}2`,
          source: SOURCES.TOOLS,
          title: "related tool title 2",
        },
        {
          slug: `${SLUG_LETTER_BASE}1`,
          source: SOURCES.LETTERS,
          title: "related letter title 1",
        },
        {
          slug: `${SLUG_LETTER_BASE}2`,
          source: SOURCES.LETTERS,
          title: "related letter title 2",
        },
      ],
    });

    expect(
      container.querySelectorAll(`[href*="${SLUG_LINK_BASE}"]`).length
    ).toBe(3);
    expect(container.querySelectorAll(`[href*="${EXTERNAL_URL}"]`).length).toBe(
      1
    );
    expect(
      container.querySelectorAll(`[href*="${getRouteBySource(SOURCES.TOOLS)}"]`)
        .length
    ).toBe(1);
    // only the first two tile items are picked
    expect(
      container.querySelectorAll(
        `[href*="${getRouteBySource(SOURCES.LETTERS)}"]`
      ).length
    ).toBe(0);
    expect(container).toMatchSnapshot();
  });

  it("should renders back to results link", () => {
    Router.router.query.q = "camion";
    const { container } = renderAnswer();
    expect(container).toMatchSnapshot();
  });
});
