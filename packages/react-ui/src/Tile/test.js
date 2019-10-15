import React from "react";
import { render } from "@testing-library/react";
import { List } from "react-feather";
import { Tile } from ".";

describe("<Tile />", () => {
  it("renders a button tile", () => {
    const { container } = render(<Tile>Hello !</Tile>);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("button").length).toBe(1);
  });
  it("renders a link tile", () => {
    const { container } = render(<Tile href="#">Hello !</Tile>);
    expect(container.getElementsByTagName("a").length).toBe(1);
    expect(container.getElementsByTagName("button").length).toBe(0);
  });
  it("renders with a div fake button inside", () => {
    const { container } = render(
      <Tile href="#" button="bouton">
        Hello !
      </Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders with an icon", () => {
    const { container } = render(<Tile icon={List}>Hello !</Tile>);
    expect(container).toMatchSnapshot();
  });
});
