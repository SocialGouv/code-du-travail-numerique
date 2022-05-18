import { render } from "@testing-library/react";
import React from "react";

import { ErrorBoundary } from "../ErrorBoundary";

describe("Error Boundary", () => {
  // Hack(lionelb): remove noisy error logging catch by ErrorBoundary
  // @see https://github.com/facebook/react/issues/11098#issuecomment-412682721
  let topLevelErrors;
  function handleTopLevelError(event) {
    // calling preventDefault() will prevent error logging
    event.preventDefault();
    topLevelErrors.push(event.error);
  }

  beforeEach(() => {
    topLevelErrors = [];
    window.addEventListener("error", handleTopLevelError);
  });
  afterEach(() => {
    window.removeEventListener("error", handleTopLevelError);
  });

  it("render children", () => {
    const Child = () => <div>component</div>;

    const { container } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    component
  </div>
</div>
`);
  });

  it("render an error message if child component throw", () => {
    const Child = () => {
      throw new Error("oups");
    };

    const { container } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    expect(container.includes("Désolé, une erreur s’est produite")).toBeTruthy;
    expect(topLevelErrors.length).toBe(1);
  });
});
