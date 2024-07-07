import { render } from "@testing-library/react";
import React from "react";
import StepList from "../index";

const steps = [
  {
    label: "Introduction",
    name: "intro",
  },
  {
    label: "Convention collective",
    name: "agreement",
  },
  {
    label: "Informations",
    name: "infos",
  },
  {
    label: "Résultat",
    name: "result",
  },
];

describe("StepList", () => {
  describe("Show multiple steps with first active", () => {
    it("should show the count of steps", () => {
      const { getByText } = render(
        <StepList activeIndex={0} steps={steps} width={"28rem"} />
      );
      expect(getByText(/1\/4/)).toBeInTheDocument();
    });

    it("should show all steps", () => {
      const { getByText, getAllByRole } = render(
        <StepList activeIndex={0} steps={steps} width={"28rem"} />
      );
      const li = getAllByRole("listitem");
      expect(li).toHaveLength(steps.length);
      steps.forEach((step) => {
        expect(getByText(new RegExp(step.label))).toBeInTheDocument();
      });
    });

    it("should have the first item active", () => {
      const { getByRole } = render(
        <StepList activeIndex={0} steps={steps} width={"28rem"} />
      );
      const li = getByRole("listitem", { name: "onglet actif" });
      expect(li).toBeInTheDocument();
      expect(li.innerHTML).toContain(steps[0].label);
    });
  });

  describe("Show multiple steps with third step active", () => {
    it("should have the third item active", () => {
      const { getByRole } = render(
        <StepList activeIndex={2} steps={steps} width={"28rem"} />
      );
      const li = getByRole("listitem", { name: "onglet actif" });
      expect(li).toBeInTheDocument();
      expect(li.innerHTML).toContain(steps[2].label);
    });
  });
});
