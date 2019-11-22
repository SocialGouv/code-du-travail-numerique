import React from "react";
import { render } from "@testing-library/react";
import { PageTitle, Title, Heading } from ".";

describe("<PageTitle />", () => {
  test("should render a H1 page title ", () => {
    const { container } = render(
      <PageTitle desc="Hello">Lorem Ipsum</PageTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
describe("<Title />", () => {
  test("should render a H2 title ", () => {
    const { container } = render(<Title desc="Hello">Lorem Ipsum</Title>);
    expect(container).toMatchSnapshot();
  });
});
describe("<Heading />", () => {
  test("should render a H3 heading ", () => {
    const { container } = render(<Heading desc="Hello">Lorem Ipsum</Heading>);
    expect(container).toMatchSnapshot();
  });
});
