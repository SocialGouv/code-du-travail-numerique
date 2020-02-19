import React from "react";
import { render } from "@testing-library/react";
import Convention from "..";
import { agreement } from "../../__tests__/api.conventions.mock";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(<Convention {...agreement} />);
    expect(container).toMatchSnapshot();
  });
});
