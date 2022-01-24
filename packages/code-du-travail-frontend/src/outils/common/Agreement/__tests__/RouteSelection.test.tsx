import { render } from "@testing-library/react";
import React from "react";

import TestForm from "../../../../../test/TestForm";
import { RouteSelection } from "../RouteSelection";

describe("RouteSelection: Skip the agreement selection", () => {
  describe("without data in form", () => {
    it("should render the mandatory question 'Je ne souhaite pas renseigner ma convention collective.'", () => {
      const { getByText } = render(<TestForm Step={RouteSelection} />);
      expect(
        getByText("Je ne souhaite pas renseigner ma convention collective.")
      ).toBeInTheDocument();
      expect(getByText("(obligatoire)")).toBeInTheDocument();
    });

    it("should show an alert when submit without select an option", () => {
      const { getByText } = render(<TestForm Step={RouteSelection} />);
      getByText("Submit").click();
      expect(getByText(/Vous devez répondre à cette question/)).toBeDefined();
    });

    it("should show an alert when select to skip the agreement selection", () => {
      const { getByText } = render(<TestForm Step={RouteSelection} />);
      getByText(
        "Je ne souhaite pas renseigner ma convention collective."
      ).click();

      expect(
        getByText(
          /Vous pouvez passer cette étape et poursuivre la simulation pour connaitre la durée prévue par le code du travail/
        )
      ).toBeInTheDocument();
    });
  });

  describe("with data in form (come back on the step)", () => {
    it("should show an alert when skip the agreement selection selected", () => {
      const { getByText, getByRole } = render(
        <TestForm
          Step={RouteSelection}
          formData={{ ccn: { route: "not-selected" } }}
        />
      );

      expect(
        getByRole("radio", {
          checked: true,
          name: /Je ne souhaite pas renseigner ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByText(
          /Vous pouvez passer cette étape et poursuivre la simulation pour connaitre la durée prévue par le code du travail/
        )
      ).toBeInTheDocument();
    });
  });
});
