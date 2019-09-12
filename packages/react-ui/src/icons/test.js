import React from "react";
import { render } from "../test-utils";
import * as icons from ".";

describe("<Button />", () => {
  console.log(typeof icons);
  test.each(Object.values(icons))("it renders an icon %s", Icon => {
    const { container } = render(<Icon />);
    expect(container).toMatchSnapshot();
  });
});
