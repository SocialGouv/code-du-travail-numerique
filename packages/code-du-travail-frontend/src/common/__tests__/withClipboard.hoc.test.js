import React from "react";
import { fireEvent, render } from "react-testing-library";

import { withClipboard } from "../withClipboard.hoc";

describe("withClipboard hoc", () => {
  test("should call handler on click", async () => {
    const Component = props => (
      <a {...props} title="icon">
        a
      </a>
    );
    const handler = jest.fn();
    const Wrapped = withClipboard(Component, handler);
    const { getByTitle } = render(<Wrapped data-color="blue" />);
    const icon = getByTitle("icon");
    fireEvent.click(icon);
    expect(handler).toHaveBeenCalled();
  });
});
