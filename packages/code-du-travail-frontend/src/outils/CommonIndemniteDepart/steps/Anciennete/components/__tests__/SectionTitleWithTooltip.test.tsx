import { render } from "@testing-library/react";
import React from "react";
import SectionTitleWithTooltip from "../SectionTitleWithTooltip";

describe("<SectionTitleWithTooltip />", () => {
  it("should render", () => {
    expect(
      render(
        <SectionTitleWithTooltip
          name="Section with tooltip"
          tooltip={{
            content: <p>Ceci est un tooltip</p>,
          }}
        />
      )
    ).toBeTruthy();
  })
})
