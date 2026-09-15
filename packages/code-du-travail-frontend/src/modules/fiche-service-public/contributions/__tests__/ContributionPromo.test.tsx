import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import {
  ContributionPromo,
  REQUIRED_ENTERPRISE_ERROR,
} from "../ContributionPromo";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const LABEL = "Nom de l’entreprise ou n° SIRET (obligatoire)";

describe("<ContributionPromo />", () => {
  beforeEach(() => pushMock.mockClear());

  it("affiche le bloc avec un formulaire fonctionnel sans JavaScript", () => {
    const { container } = render(
      <ContributionPromo
        contributionSlug="heures-supplementaires"
        headingLevel={1}
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Une réponse plus précise, saisissez votre entreprise !",
      })
    ).toBeInTheDocument();
    const input = screen.getByLabelText(LABEL);
    expect(input).toHaveAttribute("name", "entreprise");
    expect(input).toBeRequired();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(container.querySelector("form")).toHaveAttribute(
      "action",
      "/contribution/heures-supplementaires"
    );
    expect(screen.getByRole("button", { name: "Découvrir" })).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it("navigue vers la contribution avec l'entreprise saisie", () => {
    render(<ContributionPromo contributionSlug="heures-supplementaires" />);

    fireEvent.change(screen.getByLabelText(LABEL), {
      target: { value: " Café de la mairie " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Découvrir" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/contribution/heures-supplementaires?entreprise=Caf%C3%A9+de+la+mairie"
    );
    expect(
      screen.queryByText(REQUIRED_ENTERPRISE_ERROR)
    ).not.toBeInTheDocument();
  });

  it("bloque le formulaire avec un message d'erreur accessible si rien n'est saisi", () => {
    render(<ContributionPromo contributionSlug="heures-supplementaires" />);
    const input = screen.getByLabelText(LABEL);

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: "Découvrir" }));

    expect(pushMock).not.toHaveBeenCalled();
    const message = screen.getByText(REQUIRED_ENTERPRISE_ERROR);
    expect(message).toHaveClass("fr-error-text");
    // Le message est relié au champ (annoncé à la prise de focus) et le champ
    // est marqué invalide ; le focus est ramené sur le champ.
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain(message.id);
    expect(input).toHaveFocus();
    // Le message est aussi dans une zone aria-live pour les lecteurs d'écran.
    expect(message.closest("[aria-live]")).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });

  it("efface l'erreur dès que l'usager saisit une entreprise", () => {
    render(<ContributionPromo contributionSlug="heures-supplementaires" />);
    const input = screen.getByLabelText(LABEL);

    fireEvent.click(screen.getByRole("button", { name: "Découvrir" }));
    expect(screen.getByText(REQUIRED_ENTERPRISE_ERROR)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "C" } });

    expect(
      screen.queryByText(REQUIRED_ENTERPRISE_ERROR)
    ).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
  });
});
