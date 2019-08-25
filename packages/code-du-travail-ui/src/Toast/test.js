import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Toast from "../Toast";

describe("<Toast />", () => {
  it("renders", () => {
    const { container } = render(<Toast kind="warning">Some content</Toast>);
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
});
