import React from "react";
import { render } from "@testing-library/react";
import Tools from "../Tools";

describe("<Tools />", () => {
  it("should render", () => {
    const { container } = render(<Tools />);
    expect(container).toMatchSnapshot();
  });
});
