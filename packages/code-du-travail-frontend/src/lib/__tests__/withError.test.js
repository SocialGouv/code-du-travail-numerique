import React from "react";
import withError from "../withError";
import { render } from "react-testing-library";

describe("withError() Hoc", () => {
  it("should render an error page if it receive a statusCode prop", () => {
    const Helloworld = ({ name }) => <div>Hello {name}</div>;
    const HelloworldWithError = withError(Helloworld);
    const { container } = render(<HelloworldWithError statusCode="404" />);
    expect(container).toMatchSnapshot();
  });
  it("should render the wrapped component", () => {
    const Helloworld = ({ name }) => <div>Hello {name}</div>;
    const HelloworldWithError = withError(Helloworld);
    const { container } = render(<HelloworldWithError name="bob" />);
    expect(container).toMatchSnapshot();
  });
});
