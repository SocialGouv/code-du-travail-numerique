import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

jest.mock("../CompanySuggester", () => {
  const CompanySuggester = props => {
    return (
      <button
        data-testid="suggest"
        type="button"
        onClick={() => props.onSelect({ name: "RENAULT-3200-VILLARD" })}
      />
    );
  };
  return { CompanySuggester };
});

const { CompanyForm } = require("../CompanyForm");

const getCompany = siret =>
  Promise.resolve({
    siret,
    name: "RENAULT-3200-VILLARD",
    idccList: [
      { num: "200", titre: "Convention collective nationale de la coiffure" },
      {
        num: "86",
        titre: "Convention collective nationale des boulangers associés"
      }
    ]
  });

describe("<CompanyForm />", () => {
  it("should render", () => {
    const { container } = render(
      <CompanyForm onSearch={jest.fn()} getCompany={getCompany} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should display the company and its IDCCs once you click on the suggestion", async () => {
    const { container, getByText, getByTestId } = render(
      <CompanyForm onSearch={jest.fn()} getCompany={getCompany} />
    );
    const suggester = getByTestId(/suggest/i);
    fireEvent.click(suggester);
    await waitForElement(() =>
      getByText(/IDCC 200 - Convention collective nationale de la coiffure/i)
    );
    await waitForElement(() =>
      getByText(
        /IDCC 86 - Convention collective nationale des boulangers associés/i
      )
    );
    expect(container).toMatchSnapshot();
  });
});
