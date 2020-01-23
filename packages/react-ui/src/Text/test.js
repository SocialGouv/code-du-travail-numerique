import React from "react";
import { render } from "@testing-library/react";
import { Text } from ".";

describe("<Text />", () => {
  it("renders text", () => {
    const { container } = render(<Text>A text</Text>);
    expect(container).toMatchSnapshot();
  });

  it("renders text with fontSize", () => {
    const { container } = render(<Text fontSize="hLarge">A text</Text>);
    expect(container).toMatchSnapshot();
  });
  it("renders text with variant", () => {
    const { container } = render(<Text variant="primary">A colored text</Text>);
    expect(container).toMatchSnapshot();
  });
  it("renders text with fontWeight", () => {
    const { container } = render(<Text fontWeight="700">A bold text</Text>);
    expect(container).toMatchSnapshot();
  });
});
