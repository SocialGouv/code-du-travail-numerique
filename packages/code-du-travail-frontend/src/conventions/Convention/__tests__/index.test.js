import React from "react";
import { render } from "@testing-library/react";
import Convention from "..";
import { agreement } from "../../Search/api/__tests__/conventions.mock";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(<Convention convention={agreement} />);
    expect(container).toMatchSnapshot();
  });
});
