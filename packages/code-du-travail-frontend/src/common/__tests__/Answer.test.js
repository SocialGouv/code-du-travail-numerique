import React from "react";
import { render } from "@testing-library/react";
import { SOURCES } from "@cdt/sources";

import Answer from "../Answer";

describe("<Answer />", () => {
  it("renders", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a breadcrumbs", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        breadcrumbs={[
          { title: "tag1", slug: "tag-1" },
          { title: "tag2", slug: "tag-2" }
        ]}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders tooltip", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong> contenant des tooltip sur certains mot comme rescrit. match aussi les abbréviation comme APE mais pas ape ou ses variantes comme code ape</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders tooltip for words with diacritics without breaking html", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>indemnités</strong>comme code ape</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders tooltip without breaking previous word", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>annualisation du temps de travail. Annualisation de l'annualisation.</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders related content", () => {
    const SLUG_LINK_BASE = "LINK_";
    const SLUG_TOOL_BASE = "TOOL_";
    const SLUG_LETTER_BASE = "LETTER_";
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>annualisation du temps de travail. Annualisation de l'annualisation.</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        relatedItems={[
          {
            source: SOURCES.SHEET_SP,
            slug: `${SLUG_LINK_BASE}1`,
            title: "related sheet sp title 1"
          },
          {
            source: SOURCES.SHEET_MT,
            slug: `${SLUG_LINK_BASE}2`,
            title: "related sheet mt title 1"
          },
          {
            source: SOURCES.EXTERNALS,
            slug: `${SLUG_LINK_BASE}3`,
            title: "related external title 1"
          },
          {
            source: SOURCES.SHEET_SP,
            slug: `${SLUG_LINK_BASE}4`,
            title: "related sheet sp title 2"
          },
          {
            source: SOURCES.TOOLS,
            slug: `${SLUG_TOOL_BASE}1`,
            title: "related tool title 1"
          },
          {
            source: SOURCES.TOOLS,
            slug: `${SLUG_TOOL_BASE}2`,
            title: "related tool title 2"
          },
          {
            source: SOURCES.LETTERS,
            slug: `${SLUG_LETTER_BASE}1`,
            title: "related letter title 1"
          },
          {
            source: SOURCES.LETTERS,
            slug: `${SLUG_LETTER_BASE}2`,
            title: "related letter title 2"
          }
        ]}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(
      container.querySelectorAll(`[href*="${SLUG_LINK_BASE}"]`).length
    ).toBe(3);
    expect(
      container.querySelectorAll(`[href*="${SLUG_LETTER_BASE}"]`).length
    ).toBe(1);
    expect(
      container.querySelectorAll(`[href*="${SLUG_TOOL_BASE}"]`).length
    ).toBe(1);
    expect(container).toMatchSnapshot();
  });
});
