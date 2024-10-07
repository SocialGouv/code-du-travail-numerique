import { render } from "@testing-library/react";
import React from "react";
import { Stats } from "..";

describe("<Stats />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <Stats
        nbDocuments={100}
        nbPageViews={200}
        nbSearches={300}
        nbVisits={400}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
