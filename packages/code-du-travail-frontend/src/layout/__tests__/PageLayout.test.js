import React from "react";
import { render } from "react-testing-library";
import { PageLayout } from "../PageLayout";

describe("<PageLayout />", () => {
  it("should render", () => {
    const { container } = render(
      <PageLayout>
        <span>content</span>
      </PageLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
