import React from "react";
import { render } from "../../../test/utils";
import Disclaimer from "../Disclaimer";

describe("<Disclaimer />", () => {
  it("should render", () => {
    const { container } = render(<Disclaimer />);
    expect(container).toMatchSnapshot();
  });
});
