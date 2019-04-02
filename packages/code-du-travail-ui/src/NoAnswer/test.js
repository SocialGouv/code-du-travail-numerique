import React from "react";
import { render } from "react-testing-library";
import Button from "../Button";
import NoAnswer from ".";

describe("<NoAnswer />", () => {
  test("should render", () => {
    const { container } = render(
      <NoAnswer>
        <Button primary onClick={jest.fn()}>
          Feedback
        </Button>
      </NoAnswer>
    );
    expect(container).toMatchSnapshot();
  });
});
