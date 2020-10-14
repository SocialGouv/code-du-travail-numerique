import { render } from "@testing-library/react";
import React from "react";

import ReferenceList from "../ReferenceList";

const references = [
  {
    id: "KALIARTI23234",
    title: "L2323-4",
    type: "code_du_travail",
    url: "https://article.cdt/KALIARTI23234",
  },
  {
    id: "yyy",
    title: "Article yyy du JO",
    type: "external",
    url: "https://article.jo",
  },
  {
    id: "KALIARTI",
    title: "Article XX de la CCN metal",
    type: "external",
    url: "https://legifrance/ccn",
  },
  {
    id: "KALICONT123",
    title: "123 automobile",
    type: "conventions_collectives",
    url: "https://ma-convention-collective",
  },
  {
    id: "LEGIARTI1234-3",
    title: "L*1234-3",
    type: "code_du_travail",
    url: "https://url.com",
  },
];

describe("<ReferenceList />", () => {
  it("should render", () => {
    const { container } = render(<ReferenceList references={references} />);
    expect(container).toMatchSnapshot();
  });
});
