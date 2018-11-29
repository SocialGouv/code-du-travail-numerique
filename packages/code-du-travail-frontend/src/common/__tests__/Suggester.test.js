import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

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

  it("should call onSelect", async () => {
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
