import React from "react";
import { render } from "@testing-library/react";
import CookieConsent from "../CookieConsent";

describe("<CookieConsent />", () => {
  it("should render", () => {
    const { container } = render(<CookieConsent />);
    expect(container).toMatchSnapshot();
  });
});
