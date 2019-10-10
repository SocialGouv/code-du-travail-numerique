import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Toast from "../Toast";

// unusable test for now because of the button import
describe("<Toast />", () => {
  it("render default info toast", () => {
    const { container } = render(<Toast>Default info content</Toast>);
    expect(container).toMatchSnapshot();
  });

  it.each([["warning"], ["success"]])("render %s toast", variant => {
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

  it("Should render alternative wide toast", () => {
    const { container } = render(
      <Toast shadow wide>
        I big and beautiful
      </Toast>
    );
    expect(container).toMatchSnapshot();
  });

  it.each([["from-top"], ["from-right"], ["from-bottom"], ["from-left"]])(
    "render with %s animated toast",
    animation => {
      const { container } = render(
        <Toast animate={animation}>{animation} content</Toast>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
