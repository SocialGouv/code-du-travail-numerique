import React from "react";
import { Faceting } from "../Faceting";
import { render } from "react-testing-library";

const data = [
  { key: "foo", doc_count: 14 },
  { key: "fiches_service_public", doc_count: 5 },
  { key: "fiches_ministere_travail", doc_count: 5 },
  { key: "bar", doc_count: 2 }
];

describe("<Facetting/>", () => {
  it("should render Facets", () => {
    const { container } = render(
      <Faceting data={data} query="search address" />
    );
    expect(container).toMatchSnapshot();
  });
});
