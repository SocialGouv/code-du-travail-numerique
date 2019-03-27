import React from "react";
import { render } from "react-testing-library";
import List from "../List";

// eslint-disable-next-line react/jsx-key
const items = ["un truc", <p>Un autre truc</p>];

describe("<List />", () => {
  test("should render", () => {
    const { container } = render(<List items={items} />);
    expect(container).toMatchSnapshot();
  });
});
