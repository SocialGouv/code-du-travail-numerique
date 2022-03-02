import { render, screen } from "@testing-library/react";
import React from "react";

import SansIndemniteLicenciement from "../SansIndemniteLicenciement";

describe("<SansIndemniteLicenciement />", () => {
  it("should render the container", () => {
    render(<SansIndemniteLicenciement idcc={"1518"} />);
    expect(screen.getByText(/calcul/i)).toHaveTextContent(
      "Pour cette branche, le calcul de l’indemnité de licenciement se base sur l’indemnité légale de licenciement."
    );
  });

  it("should render children", () => {
    render(
      <SansIndemniteLicenciement idcc={"1518"}>
        <p data-testid="text">Hello</p>
      </SansIndemniteLicenciement>
    );
    expect(screen.getByTestId("text")).toHaveTextContent("Hello");
  });
});
