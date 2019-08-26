import React from "react";
import { render } from "@testing-library/react";
import ModelesDeCourriers from "../modeles-de-courriers.js";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const { container } = render(<ModelesDeCourriers />);
    expect(container).toMatchSnapshot();
  });
});
