import React from "react";
import { render } from "react-testing-library";
import ModelesDeCourriers from "../modeles-de-courriers.js";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const { container } = render(<ModelesDeCourriers />);
    expect(container).toMatchSnapshot();
  });
});
