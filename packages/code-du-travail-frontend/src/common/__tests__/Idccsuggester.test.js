import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import { IdccSuggester } from "../IdccSuggester";

const item = {
  idcc: "IDCC",
  slug: "result-slug",
  source: "conventions_collectives",
  title: "item title",
  type: "item-type",
  url: "item.url",
};
const results = [{ _source: item }];

describe("<IdccSuggester />", () => {
  it("should render", () => {
    const { container } = render(
      <IdccSuggester onSelect={() => {}} onSearch={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getAllByRole, getByPlaceholderText } = render(
      <IdccSuggester onSelect={() => {}} onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/convention collective/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitFor(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should call onSelect when user clicks some option", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const onSelect = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <IdccSuggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/convention collective/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    const option = await waitFor(() => getByRole("option"));
    option.click();
    expect(onSelect).toHaveBeenCalledWith(item);
  });
});
