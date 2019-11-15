import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";

import { Suggester } from "../Suggester";

const item = "une suggestion";
const results = [item];

describe("<Suggester />", () => {
  it("should render", () => {
    const { container } = render(
      <Suggester onSelect={() => {}} onSearch={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getAllByRole, getByPlaceholderText } = render(
      <Suggester onSelect={() => {}} onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/faire une recherche/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  /* eslint-disable */

  /*
  it("should allow reformatting the entered value", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { getByDisplayValue, getByPlaceholderText } = render(
      <Suggester
        onSelect={() => {}}
        onSearch={onSearch}
        reformatEnteredValue={v => v.replace(/e/, "O")}
      />
    );
    const input = getByPlaceholderText(/faire une recherche/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitForElement(() => getByDisplayValue("tOst"));
  });

  it("should allow displaying a help message", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { getByPlaceholderText, getByText } = render(
      <Suggester
        onSelect={() => {}}
        onSearch={onSearch}
        renderMessage={(query, suggestions, loading) => (
          <p>
            {!loading && (
              <span>
                {query} returned {suggestions && suggestions.length} results
              </span>
            )}
          </p>
        )}
      />
    );
    const input = getByPlaceholderText(/faire une recherche/i);
    fireEvent.change(input, { target: { value: "test" } });
    await waitForElement(() => getByText("test returned 1 results"));
  });
  */

  /* eslint-enable */

  it("should call onSelect when user clicks some option", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const onSelect = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <Suggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/faire une recherche/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(onSelect).toHaveBeenCalledWith(item, expect.anything());
  });
});
