import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";

export class UserAction {
  click(element: HTMLElement): UserAction {
    fireEvent.click(element);
    return this;
  }

  changeInputList(element: HTMLElement, value: string): UserAction {
    userEvent.selectOptions(element, value);
    return this;
  }

  setInput(element: HTMLElement, value: string): UserAction {
    const isDate = value.match(/\d{0,2}\/\d{0,2}\/\d{0,4}/g);
    if (isDate) {
      const [days, month, year] = value.split("/");
      value = `${year}-${month}-${days}`;
    }
    element.focus();
    fireEvent.change(element, { target: { value } });
    return this;
  }

  setInputs(elements: readonly HTMLElement[], values: string[]): UserAction {
    values.forEach((value, i) => {
      this.setInput(elements[i], value);
    });
    return this;
  }
}
