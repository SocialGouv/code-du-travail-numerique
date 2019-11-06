import React from "react";
import { render } from "@testing-library/react";
import Contribution from "../Contribution";

let mockPreselectedConvention = null;

jest.mock("use-persisted-state", () => () /*key*/ => () => [
  mockPreselectedConvention,
  () => {}
]);

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
          idcc: 456,
          markdown: "hello **123**"
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
          idcc: 456,
          markdown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render preselected convention", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected"
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });

  it("should NOT render invalid preselected convention", () => {
    mockPreselectedConvention = {
      title: "unknown convention",
      num: "idcc-unknown"
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
});
