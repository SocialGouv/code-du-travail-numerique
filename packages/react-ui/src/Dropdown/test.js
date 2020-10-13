import { render } from "@testing-library/react";
import React from "react";

import { Button } from "../Button";
import { Dropdown } from ".";

describe("<Dropdown />", () => {
  it("renders", () => {
    const { container } = render(
      <Dropdown
        opener={(openDropdown) => (
          <Button
            onClick={() => {
              openDropdown();
            }}
          >
            Click me
          </Button>
        )}
      >
        Something that will show on click
      </Dropdown>
    );
    expect(container).toMatchSnapshot();
  });
});
