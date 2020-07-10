import { Button } from "@socialgouv/cdtn-ui";
import { render } from "@testing-library/react";
import React from "react";

import { AccessibilityModal } from "../AccessibilityModal";

describe("<AccessibilityModal />", () => {
  it("renders the given element", () => {
    const { getByText } = render(
      <AccessibilityModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </AccessibilityModal>
    );
    const button = getByText(/texte dans le bouton/i);
    expect(button).toBeTruthy();
  });

  it("renders a popup when click on button", () => {
    const { baseElement, getByText } = render(
      <AccessibilityModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </AccessibilityModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const checkbox = getByText(/noir et blanc/i);
    expect(checkbox).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("closes the modal", async () => {
    const { getByText, getByTitle, queryByLabelText } = render(
      <AccessibilityModal>
        {(openModal) => (
          <Button onClick={openModal}>texte dans le bouton</Button>
        )}
      </AccessibilityModal>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    const el = getByTitle("fermer la modale");
    el.click();
    expect(queryByLabelText(/noir et blanc/i)).toBeNull();
  });
});
