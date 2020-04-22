import React from "react";
import { render } from "@testing-library/react";
import { Headband } from "../Headband";

describe("<Headband />", () => {
  test("should render", () => {
    const { container } = render(<Headband />);
    expect(container).toMatchSnapshot();
  });
});
