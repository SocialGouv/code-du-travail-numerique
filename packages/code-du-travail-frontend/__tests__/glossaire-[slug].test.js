import React from "react";
import { render } from "@testing-library/react";
import Term from "../pages/glossaire/[slug]";

jest.mock("next/router", () => ({
  events: {
    on() {},
    off() {},
    trigger() {}
  },
  useRouter: () => ({
    query: { slug: "accord-dentreprise" }
  }),
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: {
        asPath: "mock",
        route: "mock",
        pathname: "mock",
        query: { slug: "accord-dentreprise" }
      }
    };
    return component;
  }
}));

describe("<Term />", () => {
  it("should render", () => {
    const { container } = render(<Term />);
    expect(container).toMatchSnapshot();
  });
});
