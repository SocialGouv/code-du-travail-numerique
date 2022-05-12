import { render } from "@testing-library/react";
import React from "react";
import Title from "../index";

describe("Title", () => {
  describe("Show the title of the simulator", () => {
    it("should show the title", () => {
      const { getByText } = render(<Title title="Simulateur titre" />);
      expect(getByText(/Simulateur titre/)).toBeInTheDocument();
    });
    it("should show the duration", () => {
      const { getByText } = render(
        <Title title="Simulateur titre" icon="" duration="5 min" />
      );
      expect(getByText(/5 min/)).toBeInTheDocument();
    });
  });
});
