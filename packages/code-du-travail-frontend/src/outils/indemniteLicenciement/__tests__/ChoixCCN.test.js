import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import { ChoixCC } from "../ChoixCCN";

describe("<ChoixCCN />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = {
      hasCC: false,
      ccName: null,
      ccId: null
    };
    const { container } = render(<ChoixCC value={value} onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });

  it("should update view when update checkbox ", () => {
    const onChange = jest.fn();
    const value = {
      hasCC: false,
      ccName: null,
      ccId: null
    };
    const { container, getByLabelText } = render(
      <ChoixCC value={value} onChange={onChange} />
    );
    const input = getByLabelText(/oui/i);
    fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });
  it("should display cc list ", async () => {
    const onChange = jest.fn();
    const value = {
      hasCC: true,
      ccName: null,
      ccId: null
    };
    const { container, getByPlaceholderText, getAllByRole } = render(
      <ChoixCC value={value} onChange={onChange} />
    );

    const input = getByPlaceholderText(/ex: Chimie/i);
    fireEvent.change(input, { target: { value: "chimie" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", async () => {
    const onChange = jest.fn();
    const value = {
      hasCC: true,
      ccName: null,
      ccId: null
    };
    const { getByPlaceholderText, getByRole } = render(
      <ChoixCC value={value} onChange={onChange} />
    );

    const input = getByPlaceholderText(/ex: Chimie/i);
    fireEvent.change(input, { target: { value: "chimie" } });
    input.focus();
    const option = await waitForElement(() => getByRole("option"));
    option.click();
    expect(onChange).toBeCalledWith({
      hasCC: true,
      ccId: "0044",
      ccName:
        "Convention collective nationale des industries chimiques et connexes"
    });
  });
});
