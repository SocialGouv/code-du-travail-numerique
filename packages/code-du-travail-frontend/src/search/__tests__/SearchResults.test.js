import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import React from "react";

import { SearchResults } from "../SearchResults";

const items = {
  articles: [
    {
      description: "la description",
      slug: "L1243-1",
      source: "code_du_travail",
      title: "L1243-1",
    },
  ],
  documents: [
    {
      breadcrumbs: [
        { label: "test content", slug: "/themes/theme-root" },
        { label: "test theme content", slug: "/themes/theme-test" },
      ],
      description: "description",
      slug: "mer-il-est-fou",
      source: "fiches_service_public",
      title: "Mer il est fou!",
    },
    {
      description: "description",
      slug: "simulateur-precarite",
      source: "outils",
      title: "simulateur de prime de précarite",
    },
    {
      description: "description",
      slug: "simulateur-licenciement-telerc",
      source: "external",
      title: "telerc",
      url: "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14",
    },
    {
      breadcrumbs: [{ label: "test root content", slug: "/themes/theme-root" }],
      description: "description",
      slug: "mer-il-est-fou2",
      source: "outils",
      title: "Mer il est fou 2!",
    },
    {
      breadcrumbs: [
        { label: "test content", slug: "/themes/theme-root" },
        { label: "test theme content", slug: "/themes/theme-test" },
      ],
      description: "description",
      slug: "mer-il-est-fou4",
      source: "contributions",
      title: "Mer il est fou 4!",
    },
  ],
  themes: [
    {
      slug: "1-contrat",
      source: "themes",
      title: "Contrat",
    },
  ],
};
const emptyItems = {
  articles: [],
  documents: [],
  themes: [],
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
      <SearchResults isSearch items={items} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should track event candidateResults", () => {
    render(<SearchResults isSearch items={items} query="search test" />);

    const trackParams = matopush.mock.calls[0];
    expect(trackParams[0]).toMatchSnapshot();
  });
});
