import React from "react";
import { render } from "@testing-library/react";
import { Document } from "../icons";
import { IconStripe } from ".";

describe("<Grid />", () => {
  it("renders", () => {
    const { container } = render(
      <IconStripe icon={Document}>Here is some content</IconStripe>
    );
    expect(container).toMatchSnapshot();
  });
});
