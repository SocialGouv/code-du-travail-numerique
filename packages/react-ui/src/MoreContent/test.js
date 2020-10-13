import { render } from "@testing-library/react";
import React from "react";

import { MoreContent } from ".";

describe("<Grid />", () => {
  const label = "Would you like to know more ?";
  it("renders with an More icon", () => {
    const { container } = render(
      <MoreContent title={label}>Here’s some more</MoreContent>
    );
    expect(container).toMatchSnapshot();
  });
  it("unfolds when clicked", () => {
    const { getByText, container } = render(
      <MoreContent title={label}>Here’s some more</MoreContent>
    );

    const unfoldButton = getByText(label);
    unfoldButton.click();
    expect(container).toMatchSnapshot();
  });
});
