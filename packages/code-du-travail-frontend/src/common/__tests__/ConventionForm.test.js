import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import { ConventionForm } from "../ConventionForm";

const results = [
  {
    _source: {
      source: "kali",
      slug: "result-slug",
      title: "item title",
      url: "item.url",
      type: "item-type",
      idcc: "IDCC"
    }
  }
];

describe("<ConvetionForm />", () => {
  it("should render", () => {
    const { container } = render(<ConventionForm onSearch={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getAllByRole, getByPlaceholderText } = render(
      <ConventionForm onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/convention collective ou code NAF/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });
  it("should display idcc item once click on suggestion", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getByRole, getByPlaceholderText } = render(
      <ConventionForm onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/convention collective ou code NAF/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(container).toMatchSnapshot();
  });
});
