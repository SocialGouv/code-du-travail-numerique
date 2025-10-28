import { render } from "@testing-library/react";
import React from "react";
import { ReferenceList } from "../ReferencesList";
import { ServicePublicReference } from "@socialgouv/cdtn-types";

const references = [
  {
    slug: "l2323-4",
    title: "L2323-4",
    type: "code_du_travail",
  },
  {
    title: "Article yyy du JO",
    type: "external",
    url: "https://article.jo/yyy",
  },
  {
    title: "CCN metallurgie",
    type: "external",
    url: "https://legifrance/ccn-metallurgie",
  },
  {
    slug: "123-automobile",
    title: "automobile",
    type: "conventions_collectives",
  },
  {
    slug: "l1234-3",
    title: "L1234-3",
    type: "code_du_travail",
  },
];

describe("<ReferenceList />", () => {
  it("should render", () => {
    const { container, getByText } = render(
      <ReferenceList references={references as ServicePublicReference[]} />
    );
    expect(getByText("Article L2323-4 du Code du travail").tagName).toEqual(
      "A"
    );
    expect(getByText("Article L2323-4 du Code du travail")).toHaveAttribute(
      "href",
      "/code-du-travail/l2323-4"
    );

    expect(getByText("Article yyy du JO").tagName).toEqual("A");
    expect(getByText("Article yyy du JO")).toHaveAttribute(
      "href",
      "https://article.jo/yyy"
    );
    expect(getByText("Article yyy du JO")).toHaveAttribute("target", "_blank");
    expect(getByText("Article yyy du JO")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );

    expect(getByText("CCN metallurgie").tagName).toEqual("A");
    expect(getByText("CCN metallurgie")).toHaveAttribute(
      "href",
      "https://legifrance/ccn-metallurgie"
    );
    expect(getByText("CCN metallurgie")).toHaveAttribute("target", "_blank");
    expect(getByText("CCN metallurgie")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );

    expect(getByText("Convention collective: automobile").tagName).toEqual("A");
    expect(getByText("Convention collective: automobile")).toHaveAttribute(
      "href",
      "/convention-collective/123-automobile"
    );

    expect(container).toMatchSnapshot();
  });
});
