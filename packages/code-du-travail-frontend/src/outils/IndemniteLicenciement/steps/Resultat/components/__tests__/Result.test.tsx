import { render } from "@testing-library/react";
import React from "react";
import Result from "../Result";

describe("<Result />", () => {
  it("should render", () => {
    const { queryByText } = render(<Result maxResult="2000" />);
    expect(queryByText(/2000/i)).toBeInTheDocument();
  });
});
