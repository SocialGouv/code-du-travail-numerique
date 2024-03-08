import { render } from "@testing-library/react";
import React from "react";
import ForMoreInfo from "../ForMoreInfo";

describe("<ForMoreInfo />", () => {
  it("should render", () => {
    const { queryByText } = render(<ForMoreInfo />);
    expect(
      queryByText(/Pour en savoir plus sur l’indemnité de licenciement/i)
    ).toBeInTheDocument();
  });
});
