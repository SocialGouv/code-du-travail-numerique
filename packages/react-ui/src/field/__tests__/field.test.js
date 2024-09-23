import "regenerator-runtime/runtime";

import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { InputCheckbox } from "../Checkbox";
import { Input } from "../Input";
import { InputDate } from "../InputDate";
import { InputRadio } from "../Radio";
import { Select } from "../Select";
import { Textarea } from "../Textarea";

describe("<InputCheckbox />", () => {
  it("should render checkbox field", () => {
    const { container } = render(
      <InputCheckbox label="option" name="checkbox" id="checkbox" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should be able to update controlled checkbox", () => {
    const { container } = render(
      <InputCheckbox label="option" name="checkbox" id="checkbox" />
    );
    const testValue = "true";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toEqual(testValue);
  });
});

describe("<Input />", () => {
  it("should render input field", () => {
    const { container } = render(<Input name="input" />);
    expect(container).toMatchSnapshot();
  });
  it("should call input onChange", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Input name="input" onChange={handleChange} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "foo" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe("<InputDate />", () => {
  it("should render input date field", () => {
    const { container } = render(<InputDate name="input_date" />);
    expect(container).toMatchSnapshot();
  });
  it("should be able to update input date", () => {
    const onChangeObserveMock = jest.fn();
    const { container } = render(
      <InputDate name="input_date" onChange={onChangeObserveMock} />
    );
    const testValue = "2020-01-01";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toEqual(testValue);
    expect(onChangeObserveMock).toHaveBeenCalledWith("01/01/2020");
  });
  it("should crash if empty string", () => {
    const onChangeObserveMock = jest.fn();

    const { container } = render(
      <InputDate name="input_date" onChange={onChangeObserveMock} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: undefined } });
    expect(input.value).toEqual("");
    expect(onChangeObserveMock).toHaveBeenCalledTimes(0);
  });
  it("should not fail if format is invalid", () => {
    const { container } = render(<InputDate name="input_date" />);
    const testValue = "wrong";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toEqual("");
  });
  it("should set default value if it is valid", () => {
    const { container } = render(
      <InputDate name="input_date" value={"01/01/2024"} />
    );
    const input = container.querySelector("input");
    expect(input.value).toEqual("2024-01-01");
  });
  it("should not set default value if it is invalid", () => {
    const { container } = render(
      <InputDate name="input_date" value={"wrong"} />
    );
    const input = container.querySelector("input");
    expect(input.value).toEqual("");
  });
});

describe("<InputRadio />", () => {
  it("should render input radio field", () => {
    const { container } = render(
      <InputRadio label="option" name="radio" id="radio" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should be able to update controlled input radio", () => {
    const { container } = render(
      <InputRadio label="option" name="radio" id="radio" />
    );
    const testValue = "true";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toEqual(testValue);
  });
});

describe("<Select />", () => {
  it("should render select field", () => {
    const { container } = render(
      <Select>
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    );
    expect(container).toMatchSnapshot();
  });
  it("should call onChange", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Select onChange={handleChange}>
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    );
    const select = container.querySelector("select");
    fireEvent.change(select, { target: { value: "foo" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe("<Textarea />", () => {
  it("should render textarea", () => {
    const { container } = render(<Textarea name="textarea" />);
    expect(container).toMatchSnapshot();
  });
  it("should call textarea onChange", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Textarea name="input" onChange={handleChange} />
    );
    const textarea = container.querySelector("textarea");
    fireEvent.change(textarea, { target: { value: "foo" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
