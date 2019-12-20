import React from "react";
import { render } from "@testing-library/react";

import { Time } from "../icons";
import { Tile } from ".";

describe("<Tile />", () => {
  it("renders a tile with text inside", () => {
    const { container } = render(
      <Tile title="Hello !">There is text inside</Tile>
    );
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("button").length).toBe(1);
  });
  it("renders a tile with a custom badge", () => {
    const { container } = render(
      <Tile title="Hello !">There is text inside</Tile>
    );
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("button").length).toBe(1);
  });
  it("renders a tile with an icon", () => {
    const { container } = render(
      <Tile title="Hello !" icon={Time}>
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("button").length).toBe(1);
  });
  it("renders a tile with a stripe", () => {
    const { container } = render(
      <Tile title="Hello !" striped>
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a wide tile with a subtitle", () => {
    const { container } = render(
      <Tile subtitle="This is a theme" title="Hello !">
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("button").length).toBe(1);
  });
});
