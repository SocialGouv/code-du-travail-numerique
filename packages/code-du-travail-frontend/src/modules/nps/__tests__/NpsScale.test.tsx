import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NpsScale } from "../NpsScale";

describe("NpsScale", () => {
  it("expose un radiogroup de 11 radios (0 à 10) et les deux libellés visuels", () => {
    render(<NpsScale value={null} onSelect={jest.fn()} groupLabelId="q" />);

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    for (let note = 0; note <= 10; note++) {
      expect(
        screen.getByRole("radio", { name: new RegExp(`Note ${note} sur 10`) })
      ).toBeInTheDocument();
    }
    expect(screen.getAllByText("Pas du tout").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Absolument")).toBeInTheDocument();
  });

  it("précise le sens des bornes dans le nom accessible", () => {
    render(<NpsScale value={null} onSelect={jest.fn()} groupLabelId="q" />);
    expect(
      screen.getByRole("radio", { name: `Note 0 sur 10, Pas du tout` })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: `Note 10 sur 10, Absolument` })
    ).toBeInTheDocument();
  });

  it("coche le radio sélectionné (aria-checked) et le rend seul tabbable", () => {
    render(<NpsScale value={7} onSelect={jest.fn()} groupLabelId="q" />);
    const seven = screen.getByRole("radio", { name: /Note 7 sur 10/ });
    const three = screen.getByRole("radio", { name: /Note 3 sur 10/ });
    expect(seven).toHaveAttribute("aria-checked", "true");
    expect(three).toHaveAttribute("aria-checked", "false");
    // Roving tabindex : seul le radio coché est dans l'ordre de tabulation.
    expect(seven).toHaveAttribute("tabindex", "0");
    expect(three).toHaveAttribute("tabindex", "-1");
  });

  it("remonte la note cliquée", async () => {
    const onSelect = jest.fn();
    render(<NpsScale value={null} onSelect={onSelect} groupLabelId="q" />);
    await userEvent.click(
      screen.getByRole("radio", { name: /Note 10 sur 10/ })
    );
    expect(onSelect).toHaveBeenCalledWith(10);
  });

  it("navigue et coche à la flèche droite", async () => {
    const onSelect = jest.fn();
    render(<NpsScale value={5} onSelect={onSelect} groupLabelId="q" />);
    screen.getByRole("radio", { name: /Note 5 sur 10/ }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onSelect).toHaveBeenCalledWith(6);
  });
});
