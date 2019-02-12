import React from "react";
import { render } from "react-testing-library";
import LargeLink from "../LargeLink";

describe("<LargeLink />", () => {
  test("should render", () => {
    const { container } = render(
      <LargeLink href="test.pdf">
        file: test.pdf <span>format: [DOC]</span>
      </LargeLink>
    );
    expect(container).toMatchSnapshot();
  });
});
