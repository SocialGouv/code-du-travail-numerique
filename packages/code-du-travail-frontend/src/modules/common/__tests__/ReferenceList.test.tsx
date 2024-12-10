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
    const { container } = render(
      <ReferenceList references={references as ServicePublicReference[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
