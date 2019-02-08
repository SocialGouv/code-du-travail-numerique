import React from "react";
import { render } from "react-testing-library";
import Section from "../Section";

describe("<Section />", () => {
  test("should render default Section", () => {
    const { container } = render(<Section>One Aside title</Section>);
    expect(container).toMatchSnapshot();
  });
  test("should render light Section", () => {
    const { container } = render(<Section light>One Aside title</Section>);
    expect(container).toMatchSnapshot();
  });
  test("should render dark Section", () => {
    const { container } = render(<Section dark>One Aside title</Section>);
    expect(container).toMatchSnapshot();
  });
});
