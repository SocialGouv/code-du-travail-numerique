import React from "react";
import { render } from "@testing-library/react";
import CookiePolicy from "../pages/politique-confidentialite";

describe("<CookiePolicy />", () => {
  it("should render", () => {
    const { container } = render(<CookiePolicy />);
    expect(container).toMatchSnapshot();
  });
});
