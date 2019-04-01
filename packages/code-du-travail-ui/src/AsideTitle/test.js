import React from "react";
import { render } from "react-testing-library";
import AsideTitle from ".";

describe("<AsideTitle />", () => {
  test("should render", () => {
    const { container } = render(<AsideTitle>One Aside title</AsideTitle>);
    expect(container).toMatchSnapshot();
  });
});
