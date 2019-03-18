import React from "react";
import { fireEvent, render } from "react-testing-library";

jest.mock("../IdccSuggester", () => {
  const IdccSuggester = props => {
    return (
      <button
        data-testid="suggest"
        type="button"
        onClick={() => props.onSelect({ title: "foo", url: "bar.url" })}
      />
    );
  };
  return { IdccSuggester };
});

const { ConventionForm } = require("../ConventionForm");

describe("<ConventionForm />", () => {
  it("should render", () => {
    const { container } = render(<ConventionForm onSearch={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("should display idcc item once click on suggestion", async () => {
    const { container, getByTestId } = render(
      <ConventionForm onSearch={() => {}} />
    );
    const suggester = getByTestId(/suggest/i);
    fireEvent.click(suggester);
    expect(container).toMatchSnapshot();
  });
});
