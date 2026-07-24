import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { ContactModalView } from "../ContactModalView";

const emitSelectTheme = jest.fn();
const emitTrackNumber = jest.fn();

jest.mock("../tracking", () => ({
  useNeedMoreInfoEvents: () => ({
    emitSelectTheme,
    emitTrackNumber,
    emitModalIsOpened: jest.fn(),
  }),
}));

// La modale DSFR est rendue « fermée » (dialog display:none) : on cible donc les
// éléments avec `hidden: true` pour les requêtes par rôle.
const getSuivant = () =>
  screen.queryByRole("button", { name: "Suivant", hidden: true });

const selectTheme = (label: string) =>
  fireEvent.click(screen.getByLabelText(label));

describe("<ContactModalView />", () => {
  beforeEach(() => {
    emitSelectTheme.mockClear();
    emitTrackNumber.mockClear();
  });

  it("désactive « Suivant » tant qu'aucun thème n'est sélectionné", () => {
    render(<ContactModalView />);
    expect(getSuivant()).toBeDisabled();

    selectTheme("Question de droit du travail dans le secteur privé");
    expect(getSuivant()).not.toBeDisabled();
  });

  it("affiche le numéro de téléphone cliquable pour le secteur privé", () => {
    render(<ContactModalView />);
    selectTheme("Question de droit du travail dans le secteur privé");
    fireEvent.click(getSuivant()!);

    expect(emitSelectTheme).toHaveBeenCalledWith("secteur-prive");

    const phone = screen.getByRole("link", {
      name: /0 806 000 126/,
      hidden: true,
    });
    expect(phone).toHaveAttribute("href", "tel:0806000126");

    fireEvent.click(phone);
    expect(emitTrackNumber).toHaveBeenCalled();

    // Parcours terminé : plus de bouton « Suivant ».
    expect(getSuivant()).not.toBeInTheDocument();
  });

  it("affiche un message d'erreur avec liens en nouvel onglet pour un thème hors périmètre", () => {
    render(<ContactModalView />);
    selectTheme("Secteur public");
    fireEvent.click(getSuivant()!);

    expect(emitSelectTheme).toHaveBeenCalledWith("secteur-public");

    const alert = screen.getByTestId("contact-error-result");
    expect(alert).toHaveTextContent(
      /ne relève pas des services de renseignements en droit du travail/
    );

    const externalLink = within(alert).getByRole("link", {
      name: /service-public\.fr/,
      hidden: true,
    });
    expect(externalLink).toHaveAttribute("target", "_blank");

    // Parcours stoppé : plus de bouton « Suivant ».
    expect(getSuivant()).not.toBeInTheDocument();
  });
});
