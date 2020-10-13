import { render } from "@testing-library/react";
import React from "react";

import { Button } from "../Button";
import { Dropdown } from ".";

describe("<Dropdown />", () => {
  it("renders the button", () => {
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
  it("renders the dropdown when clicking the button", () => {
    const buttonLabel = "Click me";
    const { getByText, container } = render(
      <Dropdown
        opener={(openDropdown) => (
          <Button
            onClick={() => {
              openDropdown();
            }}
          >
            {buttonLabel}
          </Button>
        )}
      >
        Something that will show on click
      </Dropdown>
    );
    const openButton = getByText(buttonLabel);
    openButton.click();
    expect(container).toMatchSnapshot();
  });
});
