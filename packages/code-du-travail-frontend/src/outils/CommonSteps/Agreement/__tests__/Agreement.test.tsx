import { getByText, render } from "@testing-library/react";
import React from "react";
import { AgreementStepTest } from "./components/AgreementStepTest";

describe("<AgreementStep />", () => {
  it("should display message when select 'Je ne souhaite pas renseigner ma CC'", () => {
    const { getAllByRole, queryByText, getByText } = render(
      <AgreementStepTest />
    );

    expect(getAllByRole("radio")).toHaveLength(3);

    expect(
      queryByText(/Vous pouvez passer cette étape et poursuivre la simulation/)
    ).not.toBeInTheDocument();

    getByText(/Je ne souhaite pas renseigner/).click();

    expect(
      queryByText(/Vous pouvez passer cette étape et poursuivre la simulation/)
    ).toBeInTheDocument();
  });
});
