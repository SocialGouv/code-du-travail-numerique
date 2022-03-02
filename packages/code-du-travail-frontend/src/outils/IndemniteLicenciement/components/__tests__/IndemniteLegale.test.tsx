import { render, screen } from "@testing-library/react";
import React from "react";

import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    render(<IndemniteLegale result={"5000"} unit={"€"} />);
    expect(
      screen.getByText("Le code du travail prévoit un montant minimum de :")
    ).toHaveTextContent("5000 € brut.");
  });
});
