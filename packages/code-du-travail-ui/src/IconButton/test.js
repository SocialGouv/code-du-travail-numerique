import React from "react";
import { cleanup, render } from "react-testing-library";
import { ThumbsUp } from "react-feather";
import IconButton from ".";

describe("<IconButton />", () => {
  afterEach(cleanup);
  test("should render", () => {
    const { container } = render(
      <IconButton title="test-btn" onClick={jest.fn()}>
        <ThumbsUp />
      </IconButton>
    );
    expect(container).toMatchSnapshot();
  });
  test("should call clickHandler", () => {
    const handler = jest.fn();
    const { getByTitle } = render(
      <IconButton title="test-btn" onClick={handler}>
        <ThumbsUp />
      </IconButton>
    );
    const button = getByTitle(/test-btn/i);
    button.click();
    expect(handler).toHaveBeenCalled();
  });
});
