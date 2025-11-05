import { render } from "@testing-library/react";
import React from "react";
import { UnexpectedError } from "../UnexpectedError";

describe("<UnexpectedError />", () => {
  it("should match snapshot", () => {
    const { container } = render(<UnexpectedError />, {
      legacyRoot: true,
    });
    expect(container).toMatchSnapshot();
  });
});
