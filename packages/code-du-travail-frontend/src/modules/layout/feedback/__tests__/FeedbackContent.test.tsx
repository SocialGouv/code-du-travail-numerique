import { render } from "@testing-library/react";
import React from "react";

import { FeedbackContent } from "../FeedbackContent";
import { ui } from "./ui";

describe("<FeedbackContent />", () => {
  it("should match snapshot for positive", () => {
    const { container } = render(
      <FeedbackContent onSubmit={jest.fn} type="positive" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot for negative", () => {
    const { container } = render(
      <FeedbackContent onSubmit={jest.fn} type="negative" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should warn politely on certain threshold", () => {
    render(<FeedbackContent onSubmit={jest.fn} type="positive" />);
    expect(ui.characterInfo.get()).toHaveAttribute("aria-atomic");
    expect(ui.characterInfo.get()).toHaveAttribute("aria-live", "polite");
  });
});
