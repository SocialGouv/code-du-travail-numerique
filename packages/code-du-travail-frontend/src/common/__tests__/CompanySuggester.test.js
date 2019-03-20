import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import { CompanySuggester } from "../CompanySuggester";

const item = {
  name: "RENAULT-32444-VILLARD",
  siret: "49348322990909"
};
const results = [item];

describe("<CompanySuggester />", () => {
  it("should render", () => {
    const { container } = render(
      <CompanySuggester onSelect={() => {}} onSearch={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const { container, getAllByRole, getByPlaceholderText } = render(
      <CompanySuggester onSelect={() => {}} onSearch={onSearch} />
    );
    const input = getByPlaceholderText(/Numéro de SIRET à 14 chiffres/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should call onSelect when user clicks some option", async () => {
    const onSearch = jest.fn().mockResolvedValue(results);
    const onSelect = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <CompanySuggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/Numéro de SIRET à 14 chiffres/i);
    fireEvent.change(input, { target: { value: "test" } });
    input.focus();
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(onSelect).toHaveBeenCalledWith(item);
  });

  it("should reformat the entered values but not the searched ones", async () => {
    const onSearch = jest.fn().mockResolvedValue([]);
    const onSelect = jest.fn();
    const { getByPlaceholderText, getByDisplayValue } = render(
      <CompanySuggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/Numéro de SIRET à 14 chiffres/i);
    fireEvent.change(input, { target: { value: "34049528394945" } });
    await waitForElement(() => getByDisplayValue("340 495 283 94945"));
    expect(onSearch).toHaveBeenCalledWith("34049528394945");
  });

  it("should display an empty message when necessary", async () => {
    const onSearch = jest.fn().mockResolvedValue([]);
    const onSelect = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <CompanySuggester onSearch={onSearch} onSelect={onSelect} />
    );
    const input = getByPlaceholderText(/Numéro de SIRET à 14 chiffres/i);
    fireEvent.change(input, { target: { value: "34049528394945" } });
    input.focus();
    await waitForElement(() =>
      getByText("Aucune entreprise trouvée pour le SIRET 340 495 283 94945")
    );
  });
});
