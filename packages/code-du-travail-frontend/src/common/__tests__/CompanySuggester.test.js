import React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import { CompanySuggester, reformatSiret } from "../CompanySuggester";

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

describe("reformatSiret", () => {
  it("does nothing for less than 3 numbers", () => {
    expect(reformatSiret("34")).toEqual("34");
  });

  it("add one space with 3-6 numbers", () => {
    expect(reformatSiret("34344")).toEqual("343 44");
  });

  it("adds 2 spaces with 6-9 numbers", () => {
    expect(reformatSiret("34344499")).toEqual("343 444 99");
  });

  it("adds 3 spaces with 9+ numbers", () => {
    expect(reformatSiret("34344499940")).toEqual("343 444 999 40");
  });

  it("limits to 14 chars", () => {
    expect(reformatSiret("49348322990909444")).toEqual("493 483 229 90909");
  });

  it("doesn't explode with non-numerical values", () => {
    expect(reformatSiret("abcdefgh")).toEqual("abcdefgh");
  });
});
