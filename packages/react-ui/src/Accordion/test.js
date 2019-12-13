import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { Accordion } from ".";

describe("<Accordion />", () => {
  test("should render", () => {
    const items = [{ title: "This is the title", body: "this is the body" }];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  test("should render with custom component as title", () => {
    const Title = ({ children }) => <strong>{children}</strong>;
    Title.propTypes = {
      children: PropTypes.node
    };
    const items = [
      { title: <Title>Jsx Title</Title>, body: "this is the body" }
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
