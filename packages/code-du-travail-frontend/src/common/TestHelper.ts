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
    element.focus();
    fireEvent.change(element, { target: { value } });
    return this;
  }
}
