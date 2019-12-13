import React from "react";
import { render } from "@testing-library/react";
import { Input } from "./Input";
import { InputCheckbox } from "./Checkbox";
import { InputDate } from "./InputDate";
import { InputRadio } from "./Radio";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

describe("<Input />", () => {
  it("should render input field", () => {
    const { container } = render(<Input name="input" />);
    expect(container).toMatchSnapshot();
  });
});

describe("<InputCheckbox />", () => {
  it("should render checkbox field", () => {
    const { container } = render(
      <InputCheckbox label="option" name="checkbox" id="checkbox" />
    );
    expect(container).toMatchSnapshot();
  });
});

describe("<InputDate />", () => {
  it("should render input date field", () => {
    const { container } = render(<InputDate name="input_date" />);
    expect(container).toMatchSnapshot();
  });
});

describe("<InputRadio />", () => {
  it("should render input radio field", () => {
    const { container } = render(
      <InputRadio label="option" name="radio" id="radio" />
    );
    expect(container).toMatchSnapshot();
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
});

describe("<Textarea />", () => {
  it("should render textarea", () => {
    const { container } = render(<Textarea name="textarea" />);
    expect(container).toMatchSnapshot();
  });
});
