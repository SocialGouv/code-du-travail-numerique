import { render } from "@testing-library/react";
import React from "react";

import { ConventionModal } from "../SearchModal";

// Trouvez votre convention collective

describe("<ConventionModal />", () => {
  it("should render", () => {
    const { container } = render(
      <ConventionModal>
        {(openModal) => (
          <button data-testid="bt" onClick={openModal}>
            voir les conventions
          </button>
        )}
      </ConventionModal>
    );
    expect(container).toMatchSnapshot();
  });

  /*
  it("should render a popup when click on button", () => {
    const { baseElement, getByTestId, getByPlaceholderText } = render(
      <ConventionModal>
        {(openModal) => (
          <button data-testid="bt" onClick={openModal}>
            voir les conventions
          </button>
        )}
      </ConventionModal>
    );
    const button = getByTestId("bt");
    button.click();
    const input = getByPlaceholderText(
      /Nom de la convention collective, de l’entreprise ou son SIRET/i
    );
    expect(input).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("should close the modal", async () => {
    const { getByTitle, getByTestId, queryByPlaceholderText } = render(
      <ConventionModal>
        {(openModal) => (
          <button data-testid="bt" onClick={openModal}>
            chercher votre convention
          </button>
        )}
      </ConventionModal>
    );
    const button = getByTestId("bt");
    button.click();
    const el = getByTitle("fermer la modale");
    expect(el).toBeTruthy();
    el.click();
    expect(
      queryByPlaceholderText(
        /Nom de la convention collective, de l’entreprise ou son SIRET/i
      )
    ).toBeNull();
  });
  */
});
