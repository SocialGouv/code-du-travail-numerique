import React from "react";
import { render } from "@testing-library/react";
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
