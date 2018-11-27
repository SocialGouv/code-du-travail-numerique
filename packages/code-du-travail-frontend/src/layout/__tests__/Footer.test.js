import React from "react";
import { render } from "react-testing-library";
import Footer from "../Footer";

jest.mock(
  "next/config",
  () => () => ({
    publicRuntimeConfig: {
      API_URL: "api.url"
    }
  }),
  { virtual: true }
);

describe("<Footer />", () => {
  it("should render", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
