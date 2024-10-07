import { render } from "@testing-library/react";
import React from "react";

import { FeedbackContent } from "../FeedbackContent";

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
});
