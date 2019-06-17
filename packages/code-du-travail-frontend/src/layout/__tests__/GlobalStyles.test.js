import React from "react";
import { render } from "react-testing-library";
import GlobalStyle from "../GlobalStyles";

describe("<GlobalStyle />", () => {
  it("should render", () => {
    const { container } = render(<GlobalStyle />);
    expect(container).toMatchSnapshot();
  });
});
