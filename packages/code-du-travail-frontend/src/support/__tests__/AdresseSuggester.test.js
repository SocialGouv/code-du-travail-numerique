import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import { AdresseSuggester } from "../AdresseSuggester";

const adresse = {
  properties: {
    name: "nom de rue",
    postcode: 42,
    city: "Niourk"
  }
};
const results = [adresse];

describe("<AddressSuggester />", () => {
  it("should render", () => {
    const { container } = render(
      <AdresseSuggester onSelect={() => {}} onSearch={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getAllByRole, getByPlaceholderText } = render(
      <AdresseSuggester onSelect={() => {}} onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/rue du palais/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should call onSelect", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const onSelect = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <AdresseSuggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/rue du palais/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(onSelect).toHaveBeenCalledWith(adresse, expect.anything());
  });
});
