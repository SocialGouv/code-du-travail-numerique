import React from "react";
import { render } from "react-testing-library";
import BreadCrumbs from ".";

describe("<Alert />", () => {
  test("should render with default props", () => {
    const { container } = render(<BreadCrumbs />);
    expect(container).toMatchSnapshot();
  });
  test("should render width custom props", () => {
    /* eslint-disable-next-line react/jsx-key */
    const entries = [<a href="path">path</a>, <a href="sub path">sub path</a>];
    const { container } = render(<BreadCrumbs entries={entries} />);
    expect(container).toMatchSnapshot();
  });
});
