import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { Toast } from "../Toast/index.js";

describe("<Toast />", () => {
  it("render default toast", () => {
    const { container } = render(<Toast>Default content</Toast>);
    expect(container).toMatchSnapshot();
  });

  it.each([["primary"], ["secondary"]])("render %s toast", (variant) => {
    const { container } = render(
      <Toast variant={variant}>{variant} content</Toast>
    );
    expect(container).toMatchSnapshot();
  });

  it("Should call onRemove when clicking on remove button if an onRemove prop is provided", () => {
    const onRemove = jest.fn();
    const { container } = render(
      <Toast onRemove={onRemove}>I am an annoying toast, remove me.</Toast>
    );
    const onRemoveButton = container.querySelector("button");
    fireEvent.click(onRemoveButton);
    expect(onRemove.mock.calls.length).toBe(1);
  });

  it("Should call onRemove after 1 second", () => {
    jest.useFakeTimers();
    const onRemove = jest.fn();
    render(
      <Toast onRemove={onRemove} timeout={1000}>
        I disappear in 1 sec.
      </Toast>
    );

    jest.advanceTimersByTime(1000);

    expect(onRemove.mock.calls.length).toBe(1);
  });

  it("Should render a wide toast", () => {
    const { container } = render(
      <Toast shadow wide>
        I’m big and beautiful
      </Toast>
    );
    expect(container).toMatchSnapshot();
  });

  it.each([["from-top"], ["from-right"], ["from-bottom"], ["from-left"]])(
    "render with %s animated toast",
    (animation) => {
      const { container } = render(
        <Toast animate={animation}>{animation} content</Toast>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
