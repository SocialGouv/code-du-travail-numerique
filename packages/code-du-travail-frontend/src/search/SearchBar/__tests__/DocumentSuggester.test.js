import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { DocumentSuggester } from "../DocumentSuggester";

const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

function renderDocumentSuggester({
  onSearch = jest.fn(),
  onSelect = jest.fn(),
  onClear = jest.fn(),
  onChange = jest.fn(),
  query = "foo",
  placeholder = "document suggester placeholder",
  suggestions = [],
}) {
  return render(
    <DocumentSuggester
      onChange={onChange}
      onSearch={onSearch}
      onClear={onClear}
      onSelect={onSelect}
      query={query}
      placeholder={placeholder}
      suggestions={suggestions}
    />
  );
}

describe("<DocumentSuggester />", () => {
  it("should render", () => {
    const { container } = renderDocumentSuggester({});
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", () => {
    const { container, getByPlaceholderText } = renderDocumentSuggester({
      placeholder: "search foo",
      suggestions,
    });
    const input = getByPlaceholderText(/search foo/i);
    input.focus();
    expect(container).toMatchSnapshot();
  });

  it("should call onChange when input change", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = renderDocumentSuggester({
      onChange,
      placeholder: "search foo",
    });

    const input = getByPlaceholderText(/search foo/i);
    const mockEvent = { target: { value: "test" } };
    fireEvent.change(input, mockEvent);
    expect(onChange).toHaveBeenCalled();
  });
  it("should call onSearch after input has changed", () => {
    const onSearch = jest.fn();

    const { getByPlaceholderText } = renderDocumentSuggester({
      onSearch,
      placeholder: "search foo",
    });

    const input = getByPlaceholderText(/search foo/i);
    const mockEvent = { target: { value: "test" } };
    fireEvent.change(input, mockEvent);
    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({ value: "test" })
    );
  });

  it("should call onSelect when user clicks some option", () => {
    const onSelect = jest.fn();
    const { getAllByRole, getByPlaceholderText } = renderDocumentSuggester({
      onSelect,
      placeholder: "the place to be",
      suggestions,
    });
    const input = getByPlaceholderText(/the place to be/i);
    input.focus();
    const [option] = getAllByRole("option");
    option.click();
    expect(onSelect).toHaveBeenCalledWith(suggestions[0], expect.anything());
  });
});
