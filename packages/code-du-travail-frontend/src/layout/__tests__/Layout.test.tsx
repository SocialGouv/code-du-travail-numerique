import { render } from "@testing-library/react";
import React from "react";

import { Layout } from "../Layout";

describe("<Layout />", () => {
  it("should render", () => {
    const { container } = render(
      <Layout>
        <h1>home</h1>
        <span>content</span>
      </Layout>
    );
    expect(container).toMatchSnapshot();
  });
});
