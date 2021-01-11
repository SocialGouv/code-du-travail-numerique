import { render } from "@testing-library/react";
import React from "react";

import { ViewMore } from ".";

describe("<ViewMore />", () => {
  const actionLabel = "Would you like to know more ?";
  const contentLabel = "Here’s some more";
  it("renders with an More icon", () => {
    const { container } = render(
      <ViewMore title={actionLabel}>{contentLabel}</ViewMore>
    );
    expect(container).toMatchSnapshot();
  });
  it("unfolds when clicked", () => {
    const { getByText, queryByText } = render(
      <ViewMore title={actionLabel}>{contentLabel}</ViewMore>
    );

    const unfoldButton = getByText(actionLabel);
    unfoldButton.click();
    expect(queryByText(contentLabel)).toBeTruthy();
  });
});
