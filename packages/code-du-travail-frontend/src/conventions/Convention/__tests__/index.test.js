import { render } from "@testing-library/react";
import React from "react";

import { agreement } from "../../Search/api/__tests__/agreement.mock";
import Convention from "..";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(<Convention convention={agreement} />);
    expect(container).toMatchSnapshot();
  });
});
