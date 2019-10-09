import React from "react";
import { render } from "../../../test/utils";
import Header from "../Header";

describe("<Header />", () => {
  it("should render", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
