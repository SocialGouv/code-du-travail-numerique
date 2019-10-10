import React from "react";
import { render } from "@wrapped-testing-library/react";
import Glossaire from "../pages/glossaire";

describe("<Glossaire />", () => {
  it("should render", () => {
    const { container } = render(<Glossaire />);
    expect(container).toMatchSnapshot();
  });
});
