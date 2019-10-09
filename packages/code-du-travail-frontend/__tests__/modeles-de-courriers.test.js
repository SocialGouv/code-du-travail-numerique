import React from "react";
import { render } from "../test/utils";
import ModelesDeCourriers from "../pages/modeles-de-courriers/[slug]";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const { container } = render(<ModelesDeCourriers />);
    expect(container).toMatchSnapshot();
  });
});
