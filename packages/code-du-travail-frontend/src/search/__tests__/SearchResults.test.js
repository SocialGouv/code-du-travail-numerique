import React from "react";
import { SearchResults } from "../SearchResults";
import { render } from "@testing-library/react";

const items = [
  {
    _id: "id",
    _source: {
      source: "code_du_travail",
      title: "Mer il est fou!",
      slug: "mer-il-est-fou"
    }
  },
  {
    _id: "id2",
    _source: {
      source: "external",
      title: "Mer il est fou!",
      url: "http://voila.fr"
    }
  }
];

const itemsBreadcrumbs = [
  {
    _id: "id",
    _source: {
      source: "code_du_travail",
      title: "Mer il est fou 1  !",
      slug: "mer-il-est-fou1",
      breadcrumbs: []
    }
  },
  {
    _id: "id",
    _source: {
      source: "code_du_travail",
      title: "Mer il est fou 2!",
      slug: "mer-il-est-fou2",
      breadcrumbs: [{ slug: "theme-root", title: "test root content" }]
    }
  },
  {
    _id: "id",
    _source: {
      source: "code_du_travail",
      title: "Mer il est fou 3!",
      slug: "mer-il-est-fou3",
      breadcrumbs: [
        { slug: "theme-root", title: "test content" },
        { slug: "theme-leaf", title: "test leaf content" }
      ]
    }
  },
  {
    _id: "id",
    _source: {
      source: "themes",
      title: "Mer il est fou 4!",
      slug: "mer-il-est-fou4",
      breadcrumbs: [
        { slug: "theme-root", title: "test content" },
        { slug: "theme-test", title: "test theme content" }
      ]
    }
  }
];

describe("<SearchResults/>", () => {
  it("should render no results", () => {
    const { container } = render(
      <SearchResults items={[]} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <SearchResults items={items} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results with breadcrumbs", () => {
    const { container } = render(
      <SearchResults items={itemsBreadcrumbs} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
});
