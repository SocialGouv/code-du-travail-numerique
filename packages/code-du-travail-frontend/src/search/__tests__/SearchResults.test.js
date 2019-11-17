import React from "react";
import Router from "next/router";
import { SearchResults } from "../SearchResults";
import { render } from "@testing-library/react";
import { matopush } from "../../piwik";

jest.mock("../../piwik", () => ({
  matopush: jest.fn()
}));

const items = {
  documents: [
    {
      source: "fiches_service_public",
      title: "Mer il est fou!",
      slug: "mer-il-est-fou",
      description: "description",
      breadcrumbs: [
        { slug: "theme-root", title: "test content" },
        { slug: "theme-test", title: "test theme content" }
      ]
    },
    {
      source: "outils",
      title: "simulateur de prime de précarite",
      slug: "simulateur-precarite",
      description: "description"
    },
    {
      source: "external",
      title: "telerc",
      url:
        "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14",
      slug: "simulateur-licenciement-telerc",
      description: "description"
    },
    {
      source: "outils",
      title: "Mer il est fou 2!",
      slug: "mer-il-est-fou2",
      description: "description",
      breadcrumbs: [{ slug: "theme-root", title: "test root content" }]
    },
    {
      source: "contribution",
      title: "Mer il est fou 4!",
      slug: "mer-il-est-fou4",
      description: "description",
      breadcrumbs: [
        { slug: "theme-root", title: "test content" },
        { slug: "theme-test", title: "test theme content" }
      ]
    }
  ],
  articles: [
    {
      source: "code_du_travail",
      title: "L1243-1",
      slug: "L1243-1",
      description: "la description"
    }
  ],
  themes: [
    {
      source: "themes",
      title: "Contrat",
      slug: "1-contrat"
    }
  ]
};
const emptyItems = {
  documents: [],
  articles: [],
  themes: []
};
describe("<SearchResults/>", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render no results", () => {
    const { container } = render(
      <SearchResults items={emptyItems} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <SearchResults items={items} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should track event candidateResults", () => {
    Router.router.query.q = "démission";
    render(<SearchResults items={items} query="search test" />);

    const trackParams = matopush.mock.calls[0];
    expect(trackParams[0]).toEqual(
      expect.arrayContaining(["trackEvent", "candidateResults", "démission"])
    );
  });
});
