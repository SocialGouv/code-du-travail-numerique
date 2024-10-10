import { render } from "@testing-library/react";
import React from "react";

import { FeedbackDefault } from "../FeedbackDefault";

describe("<FeedbackDefault />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <FeedbackDefault onClickNo={jest.fn} onClickYes={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
