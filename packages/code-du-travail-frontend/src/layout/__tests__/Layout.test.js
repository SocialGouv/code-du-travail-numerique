import React from "react";
import { render } from "@wrapped-testing-library/react";
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
