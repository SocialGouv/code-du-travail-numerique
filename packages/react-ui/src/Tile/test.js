import { render, screen } from "@testing-library/react";
import React from "react";

import { Time } from "../icons/index.js";
import { Tile } from "./index.js";

describe("<Tile />", () => {
  it("renders a tile with text inside", () => {
    const { container } = render(
      <Tile title="Hello !">There is text inside</Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a tile with a custom badge", () => {
    const { container } = render(
      <Tile custom title="Hello !">
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a tile with an icon", () => {
    const { container } = render(
      <Tile title="Hello !" icon={Time}>
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a tile with a stripe", () => {
    const { container } = render(
      <Tile title="Hello !" striped>
        There is text inside
      </Tile>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a tile with title with titleTagType", () => {
    render(
      <Tile title="Hello !" titleTagType="h2">
        There is text inside
      </Tile>
    );
    const title = screen.getByRole("heading", { level: 2 });
    expect(title.textContent).toEqual("Hello !");
  });
});
