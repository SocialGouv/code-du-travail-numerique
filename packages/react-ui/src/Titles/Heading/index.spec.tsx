import { render } from "@testing-library/react";
import React from "react";

import { Heading } from ".";

describe("<Heading />", () => {
  it("renders the component", () => {
    const { container } = render(<Heading>Lorem Ipsum</Heading>);
    expect(container).toBeTruthy();
  });
  it("renders the component with an aria level of 2", () => {
    const { getByTestId } = render(
      <Heading id="main" ariaLevel="2">
        Lorem Ipsum
      </Heading>
    );
    const element = getByTestId("heading");
    const ariaLevel = element.getAttribute("aria-level");
    expect(ariaLevel).toBe("2");
  });

  it("renders the component if it is first", () => {
    const { getByTestId } = render(
      <Heading ariaLevel="2" isFirst>
        Lorem Ipsum
      </Heading>
    );
    const element = getByTestId("heading");
    expect(element).toHaveStyle({ margin: "0px 0px 2rem 0px" });
  });

  it("renders the component with a stripe with a shift", () => {
    const { getByTestId } = render(
      <Heading
        ariaLevel="2"
        isFirst
        shift="10rem"
        variant="primary"
        stripe="left"
      >
        Lorem Ipsum
      </Heading>
    );
    const element = getByTestId("heading");
    const stripe = getByTestId("stripe");
    expect(stripe).toBeTruthy();
    expect(element).toHaveStyle({
      "padding-left": "10rem",
    });
  });

  it("renders the component with a stripe with default shift", () => {
    const { getByTestId } = render(
      <Heading ariaLevel="2" isFirst variant="primary" stripe="left">
        Lorem Ipsum
      </Heading>
    );
    const element = getByTestId("heading");
    const stripe = getByTestId("stripe");
    expect(stripe).toBeTruthy();
    expect(element).toHaveStyle({
      "padding-left": "1.6rem",
    });
  });

  it("renders the component with a role", () => {
    const { getByRole } = render(
      <Heading
        ariaLevel="2"
        isFirst
        shift="10rem"
        variant="primary"
        stripe="left"
        role="heading"
      >
        Lorem Ipsum
      </Heading>
    );
    const element = getByRole("heading");
    expect(element).toBeTruthy();
  });

  it("renders the component as a link", () => {
    const { getByRole } = render(<Heading as="button">Lorem Ipsum</Heading>);
    const element = getByRole("button");
    expect(element).toBeTruthy();
  });
});
