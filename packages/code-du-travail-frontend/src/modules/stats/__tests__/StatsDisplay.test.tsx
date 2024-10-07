import { render } from "@testing-library/react";
import React from "react";
import { StatsDisplay } from "../StatsDisplay";

describe("<StatsDisplay />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <StatsDisplay metric={100} title="Contenus référencés" />,
    );
    expect(container).toMatchSnapshot();
  });
});
