import React from "react";
import { render } from "@testing-library/react";
import Contribution from "../Contribution";

let mockPreselectedConvention = null;

jest.mock("use-persisted-state", () => () /*key*/ => () => [
  mockPreselectedConvention,
  () => {}
]);

beforeEach(() => {
  mockPreselectedConvention = null;
});

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
      num: "idcc-preselected",
      id: 123
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
      num: "idcc-unknown",
      id: 456
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

  it("should render answer references", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected",
      id: 123
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**",
          references: [
            {
              id: 42,
              value: "reference externe 1",
              url: "http://path/to/ref"
            },
            {
              id: 422,
              value: "reference CC 1",
              agreement: {
                id: 123,
                url: "http://path/to/agreement"
              }
            }
          ]
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
});
