import React from "react";
import { render } from "@testing-library/react";
import { PageTitle } from ".";

describe("<PageTitle />", () => {
  it("renders a H1 page title ", () => {
    const { container } = render(<PageTitle>Lorem Ipsum</PageTitle>);
    expect(container).toMatchSnapshot();
  });
  it("renders a leftStripped shifted H1 page title ", () => {
    const { container } = render(
      <PageTitle leftStripped shif="10rem">
        Lorem Ipsum
      </PageTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
