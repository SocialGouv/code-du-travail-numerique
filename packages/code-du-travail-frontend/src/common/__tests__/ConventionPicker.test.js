import React from "react";
import { render, fireEvent, wait, getByRole } from "react-testing-library";
import ConventionPicker from "../ConventionPicker";

describe("<ConvetionPicker />", () => {
  it("should render", () => {
    const { container } = render(<ConventionPicker />);
    expect(container).toMatchSnapshot();
  });
  it("should render suggestions", async () => {
    const { container, getByPlaceholderText } = render(<ConventionPicker />);

    const input = getByPlaceholderText("Convention collective ou code NAF");
    fireEvent.change(input, { target: { value: "chimie" } });
    fireEvent.focus(input);
    await wait(() => {
      const option = getByRole(container, "option");
      expect(option).toBeTruthy();
      expect(option.textContent.trim()).toContain("Industries chimiques");
      expect(container).toMatchSnapshot();
    });
  });
});
