import React from "react";
import { render } from "react-testing-library";
import ConventionModal from "../ConventionModal";

jest.mock("../convention.service", () => ({
  searchIdcc: jest.fn()
}));

// Trouvez votre convention collective

describe("<ConventionModal />", () => {
  it("should render a button", () => {
    const { container } = render(<ConventionModal />);
    expect(container).toMatchSnapshot();
  });

  it("should render a popup when click on button", () => {
    const { baseElement, getByRole, getByPlaceholderText } = render(
      <ConventionModal />
    );
    const button = getByRole("button", /trouvez votre convention collective/i);
    button.click();
    const input = getByPlaceholderText(/Convention collective/i);
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("should close the modal", async () => {
    const { getByRole, queryByPlaceholderText } = render(<ConventionModal />);
    const button = getByRole("button", /trouvez votre convention collective/i);
    button.click();
    const el = document.body.querySelector("[data-reach-dialog-overlay]");
    el.click();
    expect(
      queryByPlaceholderText(/Convention collective ou code NAF/i)
    ).toBeNull();
  });
});
