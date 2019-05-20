import React from "react";
import { render } from "react-testing-library";
import { BigLink } from "../BigLink";

describe("<BigLink />", () => {
  it("should render with courrier icon", () => {
    const { container } = render(
      <BigLink
        data={{
          _source: {
            slug: "tagada",
            title: "buh",
            source: "fiches_service_public",
            path: "/path/to/document"
          }
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
