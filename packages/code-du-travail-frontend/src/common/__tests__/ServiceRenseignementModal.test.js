import React from "react";
import { render } from "react-testing-library";
import ServiceRenseignementModal from "../ServiceRenseignementModal";

describe("<ServiceRenseignementModal />", () => {
  it("should render a button", () => {
    const { getByText } = render(<ServiceRenseignementModal />);
    const button = getByText(/trouver votre service de renseignement/i);
    expect(button).toBeTruthy();
  });

  it("should render a popup when click on button", () => {
    const { baseElement, getByText, getByLabelText } = render(
      <ServiceRenseignementModal />
    );
    const button = getByText(/Trouver votre service de renseignement/i);
    button.click();
    const input = getByLabelText(/saisissez votre numéro de département/i);
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("should close the modal", async () => {
    const { getByText, queryByLabelText } = render(
      <ServiceRenseignementModal />
    );
    const button = getByText(/Trouver votre service de renseignement/i);
    button.click();
    const el = document.body.querySelector("[data-reach-dialog-overlay]");
    el.click();
    expect(
      queryByLabelText(/saisissez votre numéro de département/i)
    ).toBeNull();
  });
});
