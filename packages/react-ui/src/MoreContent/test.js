import { render } from "@testing-library/react";
import React from "react";

import { MoreContent } from "./index.js";

describe("<MoreContent />", () => {
  const actionLabel = "Would you like to know more ?";
  const contentLabel = "Here’s some more";
  it("renders with an More icon", () => {
    const { container } = render(
      <MoreContent title={actionLabel}>{contentLabel}</MoreContent>
    );
    expect(container).toMatchSnapshot();
  });
  it("unfolds when clicked", () => {
    const { getByText, queryByText } = render(
      <MoreContent title={actionLabel}>{contentLabel}</MoreContent>
    );

    const unfoldButton = getByText(actionLabel);
    unfoldButton.click();
    expect(queryByText(contentLabel)).toBeTruthy();
  });
});
