import React from "react";
import { render } from "@testing-library/react";
import cookie from "js-cookie";
import CookieConsent from "../CookieConsent";

describe("<CookieConsent />", () => {
  it("should render", () => {
    const { container } = render(<CookieConsent />);
    expect(container).toMatchSnapshot();
  });
  it("should not render if cookie exist", () => {
    cookie.get = jest.fn().mockImplementation(() => true);
    const { container } = render(<CookieConsent />);
    expect(container).toMatchSnapshot();
  });
});
