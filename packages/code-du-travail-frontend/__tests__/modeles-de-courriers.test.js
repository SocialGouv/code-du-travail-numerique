import React from "react";
import { render } from "@testing-library/react";
import ModelesDeCourriers from "../pages/modeles-de-courriers/[slug]";

describe("<ModelesDeCourriers />", () => {
  it("should render", () => {
    const { container } = render(<ModelesDeCourriers />);
    expect(container).toMatchSnapshot();
  });
});
