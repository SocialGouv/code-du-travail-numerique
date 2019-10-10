import React from "react";
import { render } from "@testing-library/react";
import Contribution from "../Contribution";

describe("<Contribution />", () => {
  it("should render with no answer", () => {
    const answers = {};
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with generic answer", () => {
    const answers = { generic: { markdown: "hello **world**" } };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with conventions answer", () => {
    const answers = {
      conventions: [
        {
          id: 123,
          mardown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with both answers", () => {
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          mardown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
});
