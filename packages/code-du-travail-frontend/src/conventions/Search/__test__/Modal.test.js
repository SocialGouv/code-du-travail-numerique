import React from "react";
import { render } from "@testing-library/react";
import ConventionModal from "../Modal";

// Trouvez votre convention collective

describe("<ConventionModal />", () => {
  it("should render", () => {
    const { container } = render(<ConventionModal />);
    expect(container).toMatchSnapshot();
  });

  it("should render a popup when click on button", () => {
    const { baseElement, getByText, getByPlaceholderText } = render(
      <ConventionModal />
    );
    const button = getByText(/votre convention collective/i);
    button.click();
    const input = getByPlaceholderText(
      /Ex: 'Corso Balard' ou '82161143100015' ou '1486'/i
    );
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("should close the modal", async () => {
    const { getByText, queryByPlaceholderText } = render(<ConventionModal />);
    const button = getByText(/votre convention collective/i);
    button.click();
    const el = document.body.querySelector("[data-reach-dialog-overlay]");
    el.click();
    expect(
      queryByPlaceholderText(
        /Ex: 'Corso Balard' ou '82161143100015' ou '1486'/i
      )
    ).toBeNull();
  });
});
