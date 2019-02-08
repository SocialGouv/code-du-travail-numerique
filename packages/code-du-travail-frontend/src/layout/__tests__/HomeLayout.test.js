import React from "react";
import { render } from "react-testing-library";
import { HomeLayout } from "../HomeLayout";

describe("<HomeLayout />", () => {
  it("should render", () => {
    const { container } = render(
      <HomeLayout>
        <h1>home</h1>
        <span>content</span>
      </HomeLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
