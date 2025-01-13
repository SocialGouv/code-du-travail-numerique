import { render } from "@testing-library/react";
import React from "react";

import { FeedbackContent } from "../FeedbackContent";
import { UserAction } from "src/common";
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
    const userAction = new UserAction();
    expect(ui.characterInfo.get()).toHaveAttribute("aria-atomic");
    userAction.setInput(ui.input.get(), "a".repeat(99));
    expect(ui.characterInfo.get()).toHaveAttribute("aria-live", "off");
    userAction.setInput(ui.input.get(), "a".repeat(100));
    expect(ui.characterInfo.get()).toHaveAttribute("aria-live", "polite");
    userAction.setInput(ui.input.get(), "a".repeat(101));
    expect(ui.characterInfo.get()).toHaveAttribute("aria-live", "off");
  });
});
