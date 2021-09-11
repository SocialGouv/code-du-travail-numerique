import { render } from "@testing-library/react";
import React from "react";
import { HelpCircle } from "react-feather";

import { DisclosureIcon } from "./index.js";

describe("<Tooltip />", () => {
  it("renders simple tooltip", () => {
    const { container } = render(
      <DisclosureIcon
        iconTitle="Find out what lies beneath"
        icon={<HelpCircle size="20" aria-label="?" />}
      >
        Here I am! I am the buried treasure!
      </DisclosureIcon>
    );
    expect(container).toMatchSnapshot();
  });
});
