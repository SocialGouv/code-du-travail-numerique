import React from "react";
import { render } from "@testing-library/react";
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
