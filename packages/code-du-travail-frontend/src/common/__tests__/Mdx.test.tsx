import { render } from "@testing-library/react";
import React from "react";

import Mdx from "../Mdx";

describe("<Mdx />", () => {
  it("should render", () => {
    const markdown = `Hello **world**`;
    const { container } = render(<Mdx markdown={markdown} components={{}} />);
    expect(container).toMatchSnapshot();
  });
  it("should render custom components", () => {
    const markdown = `Hello **world**`;
    const Strong = (props) => <strong style={{ color: "red" }} {...props} />;
    const components = {
      strong: Strong,
    };
    const { container } = render(
      <Mdx markdown={markdown} components={components} />
    );
    expect(container).toMatchSnapshot();
  });
});
