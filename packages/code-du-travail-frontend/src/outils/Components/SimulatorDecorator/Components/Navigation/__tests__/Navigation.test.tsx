import { render } from "@testing-library/react";
import React from "react";
import Navigation from "../index";

describe("Navigation", () => {
  describe("On the first screen of the simulator", () => {
    it("should only render the button to start", () => {
      const { getByText, getAllByRole } = render(
        <Navigation showNext={true} />
      );
      const buttons = getAllByRole("button");
      expect(buttons).toHaveLength(1);
      expect(getByText(/Commencer/)).toBeInTheDocument();
    });
  });

  describe("On a step of the simulator", () => {
    it("should only render the previous and next button", () => {
      const { getByText, getAllByRole } = render(
        <Navigation showNext={true} onPrevious={() => {}} />
      );
      const buttons = getAllByRole("button");
      expect(buttons).toHaveLength(2);
      expect(getByText(/Précédent/)).toBeInTheDocument();
      expect(getByText(/Suivant/)).toBeInTheDocument();
    });
  });

  describe("On the last step of the simulator", () => {
    it("should only render the previous and print button", () => {
      const { getByText, getAllByRole } = render(
        <Navigation showNext={false} onPrevious={() => {}} onPrint={() => {}} />
      );
      const buttons = getAllByRole("button");
      expect(buttons).toHaveLength(2);
      expect(getByText(/Précédent/)).toBeInTheDocument();
      expect(getByText(/Imprimer le résultat/)).toBeInTheDocument();
    });
  });
});
