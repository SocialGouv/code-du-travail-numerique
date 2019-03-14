import React from "react";
import { cleanup, render } from "react-testing-library";
import IconButton from "../IconButton";
import { Like } from "../icons";

describe("<IconButton />", () => {
  afterEach(cleanup);
  test("should render", () => {
    const { container } = render(
      <IconButton title="test-btn" onClick={jest.fn()}>
        <Like />
      </IconButton>
    );
    expect(container).toMatchSnapshot();
  });
  test("should call clickHandler", () => {
    const handler = jest.fn();
    const { getByTitle } = render(
      <IconButton title="test-btn" onClick={handler}>
        <Like />
      </IconButton>
    );
    const button = getByTitle(/test-btn/i);
    button.click();
    expect(handler).toHaveBeenCalled();
  });
});
