import { render } from "@testing-library/react";
import React from "react";

import Stats from "../pages/stats";

const data = {
  feedback: {
    negative: 2,
    positive: 3,
  },
  nbDocuments: 16,
  nbPageViews: 10,
  nbSearches: 4,
  nbVisits: 20,
};

describe("<Stats />", () => {
  it("should render", () => {
    const { container } = render(<Stats data={data} />);
    expect(container).toMatchSnapshot();
  });
});
