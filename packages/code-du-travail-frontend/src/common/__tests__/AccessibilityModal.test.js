import React from "react";
import { render, wait } from "@testing-library/react";
import { Button } from "@socialgouv/react-ui";
import {
  BLACK_AND_WHITE_STORAGE_KEY,
  ThemeProvider,
} from "../../layout/ThemeProvider";
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

  it("has a checked checkbox if the localstorage has correct value set to true", async () => {
    localStorage.setItem(BLACK_AND_WHITE_STORAGE_KEY, JSON.stringify(true));
    const { getByText } = render(
      <ThemeProvider>
        <AccessibilityModal>
          {(openModal) => (
            <Button onClick={openModal}>texte dans le bouton</Button>
          )}
        </AccessibilityModal>
      </ThemeProvider>
    );
    const button = getByText(/texte dans le bouton/i);
    button.click();
    await wait(() => {
      const checkboxLabel = getByText(/noir et blanc/i);
      const input = checkboxLabel.querySelector("input");
      expect(input.hasAttribute("checked")).toBeTruthy();
    });
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
