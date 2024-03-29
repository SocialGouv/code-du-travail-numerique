import { render, screen } from "@testing-library/react";
import React from "react";
import Result from "../Result";

describe("<Result />", () => {
  it("should render", () => {
    const { queryByText } = render(
      <Result maxResult="2000" resultMessage="Le résultat est :" />
    );
    expect(queryByText(/2000/i)).toBeInTheDocument();
    expect(
      queryByText(/Ce montant est exonéré d’impôt sur le revenu/)
    ).toBeInTheDocument();
  });
});
