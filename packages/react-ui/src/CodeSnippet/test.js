import { render } from "@testing-library/react";
import React from "react";

import { CodeSnippet } from "./index";

describe("<CodeSnippet />", () => {
  it("renders", () => {
    const { container } = render(
      <CodeSnippet>
        <p>Hi</p>
      </CodeSnippet>
    );
    expect(container).toMatchSnapshot();
  });
});
