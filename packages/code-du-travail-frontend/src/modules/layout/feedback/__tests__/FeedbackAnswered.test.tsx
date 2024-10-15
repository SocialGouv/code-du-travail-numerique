import { render } from "@testing-library/react";
import React from "react";

import { FeedbackAnswered } from "../FeedbackAnswered";

describe("<FeedbackAnswered />", () => {
  it("should match snapshot", () => {
    const { container } = render(<FeedbackAnswered />);
    expect(container).toMatchSnapshot();
  });
});
