import { Button } from "@socialgouv/cdtn-ui";
import { render } from "@testing-library/react";
import React from "react";

import { ServiceRenseignementModal } from "../ServiceRenseignementModal";

describe("<ServiceRenseignementModal />", () => {
  it("renders the given element", () => {
    const { getByText } = render(
      <ServiceRenseignementModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </ServiceRenseignementModal>
    );
    const button = getByText(/texte dans le bouton/i);
    expect(button).toBeTruthy();
  });

  it("renders a popup when click on button", () => {
    const { baseElement, getByText, getByLabelText } = render(
      <ServiceRenseignementModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </ServiceRenseignementModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const input = getByLabelText(/saisissez votre numéro de département/i);
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("closes the modal", async () => {
    const { getByText, getByTitle, queryByLabelText } = render(
      <ServiceRenseignementModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </ServiceRenseignementModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const el = getByTitle("fermer la modale");
    el.click();
    expect(
      queryByLabelText(/saisissez votre numéro de département/i)
    ).toBeNull();
  });
});
