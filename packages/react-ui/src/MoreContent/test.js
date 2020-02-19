import React from "react";
import { render } from "@testing-library/react";
import { MoreContent } from ".";

describe("<Grid />", () => {
  it("renders with an More icon", () => {
    const { container } = render(
      <MoreContent title="Would you like to know more ?">
        Here’s some more
      </MoreContent>
    );
    expect(container).toMatchSnapshot();
  });
});
