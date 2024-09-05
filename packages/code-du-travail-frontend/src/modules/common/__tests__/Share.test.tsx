import { render } from "@testing-library/react";
import React from "react";

import { Share } from "../Share";

describe("<Share />", () => {
  it("renders", () => {
    const { container } = render(<Share title="HELLO" metaDescription="Ceci est ma page" />);
    expect(container).toMatchSnapshot();
  });
});
