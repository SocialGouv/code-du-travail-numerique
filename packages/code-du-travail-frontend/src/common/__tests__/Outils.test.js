import React from "react";
import { render } from "../../../test/utils";
import Outils from "../Outils";

describe("<Outils />", () => {
  it("should render", () => {
    const { container } = render(<Outils />);
    expect(container).toMatchSnapshot();
  });
});
