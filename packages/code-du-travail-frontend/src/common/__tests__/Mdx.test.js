import React from "react";
import { render } from "@testing-library/react";
import Mdx from "../Mdx";

describe("<Mdx />", () => {
  it("should render", () => {
    const markdown = `Hello **world**`;
    const { container } = render(<Mdx markdown={markdown} />);
    expect(container).toMatchSnapshot();
  });
  it("should render custom components", () => {
    const markdown = `Hello **world**`;
    const Strong = props => <div style={{ color: "red" }} {...props} />;
    const components = {
      strong: Strong
    };
    const { container } = render(
      <Mdx markdown={markdown} components={components} />
    );
    expect(container).toMatchSnapshot();
  });
});
