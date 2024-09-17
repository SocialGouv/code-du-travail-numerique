import { render } from "@testing-library/react";
import React from "react";
import { SiteMap } from "..";
import type { Document } from "../../../api";

describe("<SiteMap />", () => {
  it("should match snapshot", () => {
    const sampleData: Document[] = [
      {
        root: {
          slug: "slug-test",
          title: "Test title",
        },
        children: [
          {
            title: "Content 1",
            slug: "content-1",
          },
          {
            title: "Content 2",
            slug: "content-2",
          },
        ],
      },
    ];
    const { container } = render(
      <SiteMap
        agreements={sampleData}
        contributions={sampleData}
        informations={sampleData}
        modeles={sampleData}
        themes={sampleData}
        tools={sampleData}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
