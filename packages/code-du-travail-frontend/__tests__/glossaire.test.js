import React from "react";
import { render } from "../test/utils";
import Glossaire from "../pages/glossaire";

describe("<Glossaire />", () => {
  it("should render", () => {
    const { container } = render(<Glossaire />);
    expect(container).toMatchSnapshot();
  });
});
