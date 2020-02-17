import React from "react";
import { render } from "@testing-library/react";
import { Button } from "@socialgouv/react-ui";
import { ContactModal } from "../ContactModal";

describe("<ContactModal />", () => {
  it("renders the given element", () => {
    const { getByText } = render(
      <ContactModal>
        {openModal => <Button onClick={openModal}>texte dans le bouton</Button>}
      </ContactModal>
    );
    const button = getByText(/texte dans le bouton/i);
    expect(button).toBeTruthy();
  });

  it("renders a popup when click on button", () => {
    const { baseElement, getByText, getByLabelText } = render(
      <ContactModal>
        {openModal => <Button onClick={openModal}>texte dans le bouton</Button>}
      </ContactModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const input = getByLabelText(/Contact/i);
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("closes the modal", async () => {
    const { getByText, getByTitle, queryByLabelText } = render(
      <ContactModal>
        {openModal => <Button onClick={openModal}>texte dans le bouton</Button>}
      </ContactModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const el = getByTitle("fermer la modale");
    el.click();
    expect(queryByLabelText(/Contact/i)).toBeNull();
  });
});
