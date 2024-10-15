import { render } from "@testing-library/react";
import React from "react";
import { PopupContent } from "../PopupContent";

describe("<PopupContent />", () => {
  it("should match snapshot", () => {
    const { container } = render(<PopupContent />);
    expect(container).toMatchSnapshot();
  });
});
