import React from "react";
import {
  fireEvent,
  render,
  waitForElement
} from "@wrapped-testing-library/react";

import { IdccSuggester } from "../IdccSuggester";

const item = {
  source: "conventions_collectives",
  slug: "result-slug",
  title: "item title",
  url: "item.url",
  type: "item-type",
  idcc: "IDCC"
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
    await waitForElement(() => getAllByRole("option"));
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
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(onSelect).toHaveBeenCalledWith(item);
  });
});
